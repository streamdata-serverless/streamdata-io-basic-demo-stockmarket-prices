(function () {

	var module = {
		exports: {}
	};
	var exports = module.exports;

	$(INDEX)

	// expose it to global
	if (window.DateTime) {
		console.warn('window.DateTime already exists');
		console.warn('window.__DateTime created instead');
		window.__DateTime = exports;
	} else {
		window.DateTime = exports;
	}

}());
