
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
	});
	

});
