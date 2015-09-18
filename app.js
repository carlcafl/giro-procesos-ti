var express = require('express');
var Mailgun = require('mailgun-js');
var app = express();

//Your api key, from Mailgun’s Control Panel
var api_key = 'key-3f370e0cdfd6085cfc503fb19184dbb3';

//Your domain, from the Mailgun Control Panel
var domain = 'sandbox751b4754081240219e5694ee2e97d046.mailgun.org';

//Your sending email address
var from_who = 'ccarmona@gmail.com';

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//Send a message to the specified email address when you navigate to /submit/someaddr@email.com
//The index redirects here
app.get('/submit/:mail', function(req,res) {

 //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
 var mailgun = new Mailgun({apiKey: api_key, domain: domain});

 var data = {
 //Specify email data
   from: from_who,
 //The email to contact
   to: req.params.mail,
 //Subject and text data  
   subject: 'Hello from Mailgun',
   html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
 }

 //Invokes the method to send emails given the above data with the helper library
 mailgun.messages().send(data, function (err, body) {
     //If there is an error, render the error page
     if (err) {
         //res.render('error', { error : err});
         console.log("got an error: ", err);
     }
     //Else we can greet    and leave
     else {
         //Here "submitted.jade" is the view file for this landing page 
         //We pass the variable "email" from the url parameter in an object rendered by Jade
         //res.render('submitted', { email : req.params.mail });
         console.log(body);
     }
 });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
