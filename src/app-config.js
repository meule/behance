$(function () {

	// Get your Behance API Key here:
	// https://www.behance.net/dev

	var beUsername = 'kvarik',
		beApiKey = 'nvjhxny7U2YIHaCWtitcs6j9He4n4WeT',
		beUserAPI = '//www.behance.net/v2/users/' + beUsername + '?callback=?&api_key=' + beApiKey,
		bePerPage = 12,
		beProjectAPI = '//www.behance.net/v2/users/' + beUsername + '/projects?callback=?&api_key=' + beApiKey + '&per_page=' + bePerPage,
		webLinks=[
			'//friends.mercator.ru',
			'//msk.mercator.ru',
			'//varik.cartodb.com/viz/3b7f33fa-0dec-11e4-b1b8-0e10bcd91c2b/embed_map',
			'//54.72.184.190/crime',
			'//54.72.184.190/religion',
			'//mayor2013.novayagazeta.ru',
			'//public.tableausoftware.com/profile/konstantin.varik.1625.ru#!/vizhome/shared/C7RP825FM',
			'//54.72.184.190/wtrade',
			'',
			'//daybyday.gaidarfund.ru',
			'//hamaka.ru/'
		]


	////////////////////////
	// Behance User data //
	////////////////////////
	function setUserTemplate() {
		// Get handlebars template
		// And compile it (populate data)
		var userData = JSON.parse(sessionStorage.getItem('behanceUser')),
			getTemplate = $('#profile-template').html(),
			template = Handlebars.compile(getTemplate),
			result = template(userData);
		console.log(userData);
		$('#header').html(result);
		$('#header .loading').remove();
	}
	if (sessionStorage.getItem('behanceUser')) {
		setUserTemplate();
	} else {
		// Load JSON-encoded data from the Behance API using a GET HTTP request.
		// Store it in sessionStorage
		$.getJSON(beUserAPI, function (user) {
			sessionStorage.setItem('behanceUser', JSON.stringify(user));
			setUserTemplate();
		});
	}

	/////////////////////////////
	// Behance Portfolio data //
	/////////////////////////////
	function setPortfolioTemplate() {
		// Get handlebars template
		// And compile it (populate data)
		var projectData = JSON.parse(sessionStorage.getItem('behanceProject')),
			getTemplate = $('#portfolio-template').html(),
			template = Handlebars.compile(getTemplate);
		for (var i=0;i<projectData.projects.length;i++)
			if(webLinks[i].length>0) projectData.projects[i].url=webLinks[i];
		var	result = template(projectData);
		console.log(projectData,webLinks);
		$('#portfolio').html(result);
		$('.wrapper').removeClass('loading');
	}
	if (sessionStorage.getItem('behanceProject')) {
		setPortfolioTemplate();
	} else {
		// Load JSON-encoded data from the Behance API using a GET HTTP request.
		// Store it in sessionStorage
		$.getJSON(beProjectAPI, function (project) {
			sessionStorage.setItem('behanceProject', JSON.stringify(project));
			setPortfolioTemplate();
		});
	}

});