
/**
 * Module dependencies.
 * @api private
 */

var crypto = require('crypto');
// NOTE: should expose it in order to configure it
var client = require('redis').createClient();
var Emitter = require('component-emitter');

/**
 * Expose 'invite'
 */

module.exports = invite;

// invite is an emitter

Emitter(invite);

/**
 * Invite user with mail address.
 *
 * Invite doesn't check the validity of the user 
 * mail address.
 *
 * Examples:
 *
 *   var invite = require('invite')('bredele');
 *   invite('foo@bar.com', 'myproject');
 *   invite('beep@boop.com');
 *
 * @param {String} user
 * @return {Function}
 * @api public
 */

function invite(user) {
  return function(address, project) {
    var key = crypto.createHmac("md5", project || user);
    var hash = key.update(address).digest('base64');
    invite.emit('invite', user, project, address, hash);
    invite.emit('invite ' + user, project, address, hash);
    create(user, project, address, hash);
    return hash;
  };
}

/**
 * Create hfield in redis database with 
 * the following syntax `invite:$USER`
 *
 * When a project is specified, invite creates
 * a hfield `invite:$USER:$PROJECT`. 
 * 
 * @param  {String} user    
 * @param  {String} project 
 * @param  {String} address 
 * @param  {String} hash    
 * @api private
 */

function create(user, project, address, hash) {
  var field = 'invite:' + user;
  var db = project ? (field + ':' + project) : field;
  client.hset(db, hash, address, function(err, res) {
    if(err) return;
    invite.emit('created', user, project, address, hash);
    invite.emit('created ' + user, project, address, hash);
  });
}