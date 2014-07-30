function getChoice(venueID) {
	
	var _mealName;
	var _menuArr = []; 

	function init() {
		getMenu();
	}

	function errorFunction() {
		var errorSpan = document.querySelector('.error-second');
		var firstText = document.querySelector('.text-wrap-first');
		firstText.style.display = 'none';		

		errorSpan.style.display = 'block';
	}

	function getMenu() {

		venueURL = 'https://api.foursquare.com/v2/venues/' + venueID + '/menu' + '?client_id=XKYPRAYKO5NKXEQX1WQ4D3HX2SPMZNRA303SWCCOP45LN40R&client_secret=DOLUOTZKA4WKTASBXPZX5IHO0YHB5NV1GULNMTUIWJQIEEXT&v=20130815';

		$.ajax({
		  type: "GET",
		  dataType: "jsonp",
		  url: venueURL,
		  success: function(data) {

			if (data.response.menu.menus.count > 0) {



				for (var j = 0; j < data.response.menu.menus.items.length; j++) {
				
					for (var i = 0; i < data.response.menu.menus.items[j].entries.items.length; i++) {

						for (var m = 0; m < data.response.menu.menus.items[j].entries.items[i].entries.items.length; m++) {

							var words = data.response.menu.menus.items[j].entries.items[i].entries.items[m].name.toLowerCase().split(" ");


							for (var s = 0; s < words.length; s++) {
								_menuArr.push(words[s]);
							}
							
							
						}

					}

				}

				getMeal();
			} else {
				getMeal();
			}
			
		  }
		});	

	}


	function getMeal() {

		venueURL = 'https://api.foursquare.com/v2/venues/' + venueID + '?client_id=XKYPRAYKO5NKXEQX1WQ4D3HX2SPMZNRA303SWCCOP45LN40R&client_secret=DOLUOTZKA4WKTASBXPZX5IHO0YHB5NV1GULNMTUIWJQIEEXT&v=20130815';

		$.ajax({
		  type: "GET",
		  dataType: "jsonp",
		  url: venueURL,
		  success: function(data) {
		  	if (!data.response.venue.phrases) {
		  		errorFunction();
		  	} else {

		  		if (_menuArr.length > 0 && matchToMenu(data.response.venue.phrases).length > 0) {

		  			_mealName = matchToMenu(data.response.venue.phrases)[0];


		  		} else {

			  		_mealName = data.response.venue.phrases[0].phrase;
			  		
		  		}

		  		revealMeal();
		  	}		  	
			
		  }
		});	

	}


	function matchToMenu(phraseArr) {

		var matchArr = [];

		for (var j = 0; j < phraseArr.length; j++) {

			for (var i = 0; i < phraseArr[j].phrase.split(" ").length; i++) {


				if (_menuArr.indexOf(phraseArr[j].phrase.split(" ")[i].toLowerCase()) > -1) {
				   matchArr.push(phraseArr[j].phrase);

				} 	


			}
		}

		return matchArr;		
	}


	function revealMeal() {
		var firstText = document.querySelector('.text-wrap-first');
		firstText.style.display = 'none';

		var answerSpan = document.querySelector('.answer');
		answerSpan.style.display = 'block';

		var mealSpan = document.querySelector('.meal');

		mealSpan.innerHTML = _mealName;
	}

	init();
}
