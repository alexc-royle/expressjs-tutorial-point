module.exports = (function() {
	'use strict';
	var logger = function(req, res, next) {
		console.log('A new request received at ' + Date.now());
		next();
	}
	return logger;
})();