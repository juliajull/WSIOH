function GetPlace() {	

	var _locationSpan;
	var _nameSpan;
	var _yesSpan;
	var _noSpan;
	var _lat;
	var _long;
	var _apiurl;
	var _venueName;
	var _venueAmount;
	var _venueID;
	var _nameTry = 0;

	function init() {
		_locationSpan = document.querySelector('.location');
		_nameSpan = document.querySelector('.venue-name');
		_noSpan = document.querySelector('.no');
		_yesSpan = document.querySelector('.yes');	

		addListeners();

		getPosition();
		startLoader();

	
	}

	function addListeners() {
		_noSpan.addEventListener('click', nextSuggestion, false);
		_yesSpan.addEventListener('click', function() {
			getChoice(_venueID);
		}, false);
	}

	function startLoader() {

	}

	function stopLoader() {
		_nameSpan.style.background = 'transparent';
		_nameSpan.style.width = 'auto';
		_nameSpan.style.height = 'auto';
	}


	function getPosition() {
		//Check if browser supports W3C Geolocation API
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
		} else {
			errorFunction();
		}

		function successFunction(position) {
			
			_lat = position.coords.latitude;
			_long = position.coords.longitude;

			_apiurl = 'https://api.foursquare.com/v2/venues/search?client_id=XKYPRAYKO5NKXEQX1WQ4D3HX2SPMZNRA303SWCCOP45LN40R&client_secret=DOLUOTZKA4WKTASBXPZX5IHO0YHB5NV1GULNMTUIWJQIEEXT&v=20130815%20&ll=' + _lat + ',' + _long + '&limit=10';
			getVenues();
			
		}	

	}

	function errorFunction() {
		var errorSpan = document.querySelector('.error-first');

		_locationSpan.style.display = 'none';
		errorSpan.style.display = 'block';

		_noSpan.style.display = 'none';
		_yesSpan.style.display = 'none';		
	}		

	function getVenues() {

		$.ajax({
		  type: "GET",
		  dataType: "jsonp",
		  url: _apiurl,
		  success: function(data) {
		  	stopLoader();

		  	if (!data.response.venues[_nameTry]) {
		  		errorFunction();
		  	} else {
		  		_venueAmount = data.response.venues.length;
			  	_venueName = data.response.venues[_nameTry].name;
			  	_venueID = data.response.venues[_nameTry].id;
			  	suggestName();		  		
		  	}

		  }
		});

		
	}	


	function suggestName() {

		_nameSpan.innerHTML = _venueName;

		_nameSpan.style.display = 'block';
		_noSpan.style.display = 'block';
		_yesSpan.style.display = 'block';

	}

	function nextSuggestion() {
		_nameTry = _nameTry + 1;

		if (_nameTry == _venueAmount) {
			errorFunction();
		} else {
			getVenues();
		}


	}


	init();


}
