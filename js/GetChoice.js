function getChoice(venueID) {
	
	var _mealName;

	function init() {
		console.log(venueID)
		getMeal();
	}

	function errorFunction() {
		var errorSpan = document.querySelector('.error-second');
		var firstText = document.querySelector('.text-wrap-first');
		firstText.style.display = 'none';		

		errorSpan.style.display = 'block';
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
		  		_mealName = data.response.venue.phrases[0].phrase;
		  		revealMeal();
		  	}		  	
			
		  }
		});	

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
