
/**
 * Test dependencies.
 */

var assert = require('assert');
var pkg = require('..');
var crypto = require('crypto');


//console.log(crypto.update('foo@bar.com').digest('base64'));
describe("basic", function() {

	var invite, address;
	beforeEach(function() {
		invite = pkg('bredele');
		address = 'foo@bar.com';
	});
	
	describe("md5", function() {

		it('should generate a uniq base64 key', function() {
			var hash = crypto.createHmac("md5", "bredele");
			var key = invite(address);
			assert.equal(key, hash.update(address).digest('base64'));
		});

		it('should encode base64 key with an optional project', function() {
			var hash = crypto.createHmac('md5', 'project');
			var key = invite(address, 'project');
			assert.equal(key, hash.update(address).digest('base64'));
		});

	});

	describe('emitter', function() {

		it('should listen when invite has been created', function(done) {
			pkg.once('invite', function() {
				done();
			});
			invite(address);
		});

		it('should emit all the invite information', function(done) {
			var key = crypto.createHmac('md5', 'beep');
			pkg.once('invite', function(user, project, client, hash) {
				if(user !== 'bredele') done('wrong user');
				if(project !== 'beep') done('wrong project');
				if(client !== address) done('wrong email address');
				if(hash !== key.update(address).digest('base64')) done('wrong hash');
				done();
			});
			invite(address, 'beep');
		});

	});
	

});
