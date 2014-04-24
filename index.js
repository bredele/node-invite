
/**
 * Module dependencies.
 * @api private
 */

var crypto = require('crypto');
var redis = require('redis');

/**
 * Expose 'invite'
 */

module.exports = invite;

/**
 * invite constructor.
 * @api public
 */

function invite(user, options) {
	return function(address, project) {
		var key = crypto.createHmac("md5", project || user);
		return key.update(address).digest('base64');
	};
}
