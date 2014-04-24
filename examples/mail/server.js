var mail = require('nodemailer').mail;
var invite = require('../..');

var foo = invite('foo');
var date = new Date();
invite.on('created', function(user, project, address, hash) {
  mail({
      from: "Foo Bar ✔ <foo@blurdybloop.com>",
      to: address,
      subject: user + ' invites you to join ' + project,
      text: "Join me at this link http://foo.io/" + user + '/invite?' + hash,
      html: "Join me at this link <a href='http://foo.io/ + " + user + "/invite?"  + hash + "'></a>"
  });
  var end = new Date();
  console.log(end - date);
  date = end;
});

// replace with a valid email address
foo('foo@bar.com', 'beep');
