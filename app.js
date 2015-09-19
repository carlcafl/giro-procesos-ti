var express = require('express');
var Mailgun = require('mailgun-js');
var bodyParser = require('body-parser');
var app = express();

//Your api key, from Mailgun’s Control Panel
var api_key = 'key-3f370e0cdfd6085cfc503fb19184dbb3';

//Your domain, from the Mailgun Control Panel
var domain = 'sandbox751b4754081240219e5694ee2e97d046.mailgun.org';

//Your sending email address
var from_who = 'ccarmona@gmail.com';

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

//Send a message to the specified email address when you navigate to /submit/someaddr@email.com
//The index redirects here
app.post('/submit/:mail', function(req,res) {

 //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
 var mailgun = new Mailgun({apiKey: api_key, domain: domain});
 
 var mailContent = 'Querido ' + req.body.nombreParticipante + ',<br/>';
 mailContent += 'Muchas gracias por participar en esta etapa del GIRO DE PROCESOS. ';
 mailContent += 'A continuaci&oacute;n encontrar&aacute;s el resultado de tu ejercicio:<br/><br/>';
 mailContent += '- Proceso: ' + req.body.proceso + '<br/>';
 mailContent += '- Marco: ' + req.body.marco + '<br/>';
 mailContent += '- Llantas: ' + req.body.llantas + '<br/>';
 mailContent += '- Cambios: ' + req.body.cambios + '<br/>';
 mailContent += '- Manillar: ' + req.body.manillar + '<br/>';
 mailContent += '- Pedales: ' + req.body.pedales + '<br/>';
 mailContent += '- Casco: ' + req.body.casco + '<br/>';
 mailContent += '- Kit de ruta: ' + req.body.kitRuta + '<br/>';
 mailContent += '<br/>De parte del equipo de TI te agradecemos, y esperamos que nos contactes para acompa&ntilde;arte en tu carrera!<br/><br/><br/>';
 mailContent += 'Cordial saludo,<br/><br/><br/>';
 mailContent += 'Equipo Facilitador TI - GIRO DE PROCESOS';
 
 var data = {
 //Specify email data
   from: from_who,
 //The email to contact
   to: req.params.mail,
   bcc: from_who,
 //Subject and text data  
   subject: 'GIRO de Procesos - Ejercicio TI',
   html: mailContent
 };

 //Invokes the method to send emails given the above data with the helper library
 mailgun.messages().send(data, function (err, body) {
     //If there is an error, render the error page
     if (err) {
         //res.render('error', { error : err});
         console.log("got an error: ", err);
         res.sendStatus(500);
     }
     //Else we can greet    and leave
     else {
         //Here "submitted.jade" is the view file for this landing page 
         //We pass the variable "email" from the url parameter in an object rendered by Jade
         //res.render('submitted', { email : req.params.mail });
         console.log(body);
         res.sendStatus(200);
     }
 });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
