
/**
 * Module dependencies.
 * @api private
 */

var crypto = require('crypto');
var redis = require('redis');
var Emitter = require('component-emitter');

/**
 * Expose 'invite'
 */

module.exports = invite;

// invite is an emitter

Emitter(invite);

/**
 * invite constructor.
 * @api public
 */

function invite(user) {
	return function(address, project) {
		var pwd = project || user;
		var key = crypto.createHmac("md5", pwd);
		var hash = key.update(address).digest('base64');
		invite.emit('invite', user, pwd, address, hash);
		invite.emit('invite ' + user, pwd, address, hash);
		return hash;
	};
}

function create(user, project, address, hash) {
	var field = 'invite:' + user;
	var db = project ? (field + ':' + project) : field;
	var client = redis.createClient();
	client.hset(db, hash, project, function(err, res) {
		console.log(res);
	});
}