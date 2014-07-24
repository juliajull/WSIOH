(function Main() {

	var _instance = {};

	_instance.init = function() {

		GetPlace();
	}
	window.Main = _instance;

})();

window.onload = Main.init;
