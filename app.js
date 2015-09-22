var express = require('express');
var Mailgun = require('mailgun-js');
var bodyParser = require('body-parser');
var app = express();

var baseUrl = 'https://giro-procesos-ti.herokuapp.com';

// Your api key, from Mailgun’s Control Panel
var api_key = 'key-3f370e0cdfd6085cfc503fb19184dbb3';

// Your domain, from the Mailgun Control Panel
var domain = 'sandbox751b4754081240219e5694ee2e97d046.mailgun.org';

// Your sending email address
var from_who = 'giroprocesosti@gmail.com';

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// Send a message to the specified email address when you navigate to
// /submit/someaddr@email.com
// The index redirects here
app
		.post(
				'/submit/:mail',
				function(req, res) {

					// We pass the api_key and domain to the wrapper, or it
					// won't be able to identify + send emails
					var mailgun = new Mailgun({
						apiKey : api_key,
						domain : domain
					});
					
					var mailContent = '<font face="Verdana">Apreciad@ '
							+ req.body.nombreParticipante + ',<br/><br/>';
					mailContent += 'Muchas gracias por participar en esta etapa del GIRO DE PROCESOS con tu proceso "'
							+ req.body.proceso + '". ';
					mailContent += 'A continuaci&oacute;n encontrar&aacute;s el resultado de tu ejercicio:<br/><br/>';
					mailContent += '<table border="1" cellpadding="0" cellspacing="0" align="center" width="80%" style="font family: verdana">';

					mailContent += '<tr><th><font face="Verdana">Pieza</font></th><th><font face="Verdana">Descripci&oacute;n</font></th></tr>';
					mailContent += '<tr><td><font face="Verdana">Marco ' + req.body.marco
							+ '</font></td><td><font face="Verdana">';
					if (req.body.marco == 'De Hierro') {
						mailContent += 'Tecnolog&iacute;as m&aacute;s pesadas, pero '
								+ 'que pueden desempe&ntilde;arse muy bien en esos caminos irregulares '
								+ 'y que requieren alto procesamiento.';
					} else if (req.body.marco == 'De Aluminio') {
						mailContent += 'En algunas situaciones la accesibilidad y '
								+ 'la flexibilidad, son determinantes para llegar al objetivo. En estos '
								+ 'casos las aplicaciones web podr&iacute;an ser una muy buena '
								+ 'opci&oacute;n.';
					} else if (req.body.marco == 'Plegable') {
						mailContent += 'Cuando la accesibilidad es casi imposible y '
								+ 'la portabilidad para llegar al punto de inter&eacute;s en la '
								+ 'competencia toman relevancia, podemos estar ante un escenario en '
								+ 'donde soluciones m&oacute;viles y sin dependencias a conexiones '
								+ 'ser&iacute;an la alternativa ideal.';
					}
					mailContent += '</font></td></tr>';

					mailContent += '<tr><td><font face="Verdana">Llantas ' + req.body.llantas
							+ '</font></td><td><font face="Verdana">';
					if (req.body.llantas && req.body.llantas.substring(0,6) == 'De Mon') {
						mailContent += 'Para terrenos destapados y con posibles obst&aacute;culos en el camino, podr&iacute;amos usar infraestructura propia para tener m&aacute;s control y evitar derrapar.';
					} else if (req.body.llantas == 'De Ruta') {
						mailContent += 'En caminos m&aacute;s constantes donde la velocidad se vuelve un factor determinante y queremos unos costos operativos m&aacute;s &oacute;ptimos, infraestructuras en la nube nos podr&iacute;an ayudar mucho para llegar a la meta.';
					}
					mailContent += '</font></td></tr>';

					mailContent += '<tr><td><font face="Verdana">' + req.body.cambios + '</font></td><td><font face="Verdana">';
					if (req.body.cambios == 'Sin cambios') {
						mailContent += 'Aplica para los terrenos constantes en '
								+ 'donde no hay lugar a modificaciones, y donde el proceso no requiere '
								+ 'flexibilidad o posibles alternativas de conexi&oacute;n entre diferentes '
								+ 'sistemas de informaci&oacute;n.';
					} else if (req.body.cambios == '18 cambios') {
						mailContent += 'Es muy usado en terrenos con bajadas y '
								+ 'subidas leves, en donde es posible una conexi&oacute;n con otros sistemas '
								+ 'ya conocidos.';
					} else if (req.body.cambios == '21 cambios') {
						mailContent += 'Aunque tiene un mayor costo nos puede '
								+ 'aportar mucho en terrenos irregulares en donde nos interesa manejar '
								+ 'diferentes velocidades, con posibilidad de conectar a diferentes '
								+ 'sistemas no necesariamente conocidos.';
					}
					mailContent += '</font></td></tr>';

					mailContent += '<tr><td><font face="Verdana">Manillar ' + req.body.manillar
							+ '</font></td><td><font face="Verdana">';
					if (req.body.manillar && req.body.manillar.substring(0,1) == 'B') {
						mailContent += 'Disminuye los roces que puedan generar '
								+ 'irritaciones y ofrecen un mayor control de manejo. Representa el '
								+ 'concepto de usabilidad que se debe tener en cuenta para mejorar el '
								+ 'rendimiento (eficacia, eficiencia y facilidad de aprendizaje) del '
								+ 'usuario en la interacci&oacute;n con las aplicaciones.';
					} else if (req.body.manillar == 'Intermedio') {
						mailContent += 'Ofrece mayor comodidad pero puede ocasionar '
								+ 'menor velocidad por la posici&oacute;n mas erguida que debe tener el '
								+ 'ciclista. Representa las aplicaciones que requieren mayor riqueza en '
								+ 'la usabilidad, para que haya mejor utilidad y mayor diversi&oacute;n en su '
								+ 'uso.';
					} else if (req.body.manillar == 'Avanzado') {
						mailContent += 'Tienen mejor dise&ntilde;o para aumentar el flujo '
								+ 'de aire, brindar m&aacute;s confort y '
								+ 'tr&aacute;nsitar mas libremente. Cuando las aplicaciones van dirigidas a clientes externos a los que '
								+ 'queremos cautivar y atraer, se requiere aplicar '
								+ 't&eacute;cnicas de Dise&ntilde;o Centrado en el Usuario, en las que '
								+ 'adem&aacute;s de la usabilidad e interacci&oacute;n, se tienen cuenta factores '
								+ 'como las emociones, sentimientos, transmisi&oacute;n de marca, para '
								+ 'conseguir la m&aacute;xima experiencia y satisfacci&oacute;n del usuario.';
					}
					mailContent += '</font></td></tr>';

					mailContent += '<tr><td><font face="Verdana">Pedales ' + req.body.pedales
							+ '</font></td><td><font face="Verdana">';
					if (req.body.pedales && req.body.pedales.substring(0,3) == 'Est') {
						mailContent += 'Los tradicionales pedales de la bicicleta, '
								+ 'que requieren del esfuerzo continuo de alguien que impulse la '
								+ 'bicicleta para llegar a la meta; representa aplicaciones '
								+ 'transaccionales est&aacute;ndar, que requieren siempre de un usuario que '
								+ 'ejecute el proceso.';
					} else if (req.body.pedales && req.body.pedales.substring(0,2) == 'El') {
						mailContent += 'Estos pedales, al igual que los anteriores, '
								+ 'requieren del esfuerzo de alguien; pero en ciertos terrenos y '
								+ 'condiciones, aumentan la eficiencia de la bicicleta. Representan '
								+ 'procesos con pasos automatizados que no requieren de intervenci&oacute;n '
								+ 'humana.';
					}
					mailContent += '</font></td></tr>';

					mailContent += '<tr><td><font face="Verdana">Casco ' + req.body.casco
							+ '</font></td><td><font face="Verdana">';
					if (req.body.casco == 'Urbano') {
						mailContent += 'Un casco liviano y de uso com&uacute;n, que '
								+ 'te da una seguridad b&aacute;sica. Las aplicaciones requieren de '
								+ 'modelos de seguridad que protejan la informaci&oacute;n. Es un '
								+ 'modelo liviano para necesidades est&aacute;ndar.';
					} else if (req.body.casco == 'De velocidad') {
						mailContent += 'Un casco tambi&eacute;n liviano, pero '
								+ 'especializado para dar m&aacute;s protecci&oacute;n y aerodinamismo. '
								+ 'Es un componente de seguridad intermedio, que a la vez proteje y '
								+ 'apalanca.';
					} else if (req.body.casco == 'De enduro') {
						mailContent += 'Un casco r&iacute;gido y fuerte, que '
								+ 'proteje la cabeza y la mand&iacute;bula, pero es m&aacute;s pesado, '
								+ 'lo que puede limitar la velocidad. Es un modelo fuerte de seguridad, '
								+ 'para necesidades avanzadas, y donde la informaci&oacute;n es muy '
								+ 'delicada y/o confidencial.';
					}
					mailContent += '</font></td></tr>';

					mailContent += '<tr><td><font face="Verdana">Kit de ruta con '
							+ req.body.kitRuta + '</font></td><td><font face="Verdana">';
					if (req.body.kitRuta && req.body.kitRuta.substring(0,6) == 'Cuenta') {
						mailContent += 'Para las necesidades de an&aacute;lisis b&aacute;sico, '
								+ 'este kit nos permite conocer datos de lo sucedido (kil&oacute;metros '
								+ 'recorridos). Hace referencia a sistemas anal&iacute;ticos tradicionales, en '
								+ 'los que se muestra el pasado, para tomar decisiones a futuro.';
					} else if (req.body.kitRuta && req.body.kitRuta.substring(0,5) == 'GPS b') {
						mailContent += 'Kit con localizaci&oacute;n, que permite '
								+ 'monitorear el desempe&ntilde;o en tiempo real; nos permite adaptarnos con '
								+ 'velocidad a los cambios de condiciones. Hace referencia a modelos '
								+ 'anal&iacute;ticos en tiempo real.';
					} else if (req.body.kitRuta && req.body.kitRuta.substring(0,5) == 'GPS c') {
						mailContent += 'Al tener un mapa del recorrido, y ubicaci&oacute;n '
								+ ' tiempo real, permite realizar predicciones de lo que va a '
								+ 'suceder. Hace referencia a la anal&iacute;tica predictiva, que permite '
								+ 'correlacionar variables y predecir situaciones';
					}
					mailContent += '</font></td></tr>';
					mailContent += '</table>';
					mailContent += '<br/><br/>';

					mailContent += '<table border="0" cellpadding="0" cellspacing="0" align="center" style="font family: verdana">';
					mailContent += '	<tr>';
					mailContent += '	<td><font face="Verdana">&nbsp;</font></td>';
					mailContent += '	<td><font face="Verdana">Manillar y sill&iacute;n '
							+ req.body.manillar + '</font></td>';
					mailContent += '	<td><font face="Verdana">&nbsp;</font></td>';
					mailContent += '	<td><font face="Verdana">&nbsp;</font></td>';
					mailContent += '</tr>';
					mailContent += '<tr>';
					mailContent += '	<td colspan="4" rowspan="4"><img';
					mailContent += '		src="' + baseUrl
							+ '/assets/img/bycicle.jpg" height="200" /></font></td>';
					mailContent += '</tr>';
					mailContent += '	<tr>';
					mailContent += '		<td><font face="Verdana">Marco ' + req.body.marco + '</font></td>';
					mailContent += '	</tr>';
					mailContent += '	<tr>';
					mailContent += '		<td><font face="Verdana">&nbsp;</font></td>';
					mailContent += '	</tr>';
					mailContent += '	<tr>';
					mailContent += '		<td><font face="Verdana">Llantas ' + req.body.llantas
							+ '</font></td>';
					mailContent += '	</tr>';
					mailContent += '	<tr>';
					mailContent += '		<td><font face="Verdana">' + req.body.cambios + '</font></td>';
					mailContent += '		<td><font face="Verdana">Pedales ' + req.body.pedales
							+ '</font></td>';
					mailContent += '		<td><font face="Verdana">&nbsp;</font></td>';
					mailContent += '		<td><font face="Verdana">&nbsp;</font></td>';
					mailContent += '		<td><font face="Verdana">&nbsp;</font></td>';
					mailContent += '	</tr>';
					mailContent += '	<tr>';
					mailContent += '		<td colspan="5"><img src="' + baseUrl
							+ '/assets/img/kit.png" height="100" />';
					mailContent += '			<img src="' + baseUrl
							+ '/assets/img/helmet.png" height="100" /></font></td>';
					mailContent += '	</tr>';
					mailContent += '	<tr>';
					mailContent += '		<td colspan="5">' + req.body.kitRuta
							+ ' - ' + req.body.casco + '</font></td>';
					mailContent += '	</tr>';
					mailContent += '</table>';

					mailContent += '<br/>De parte del equipo de TI te agradecemos, y esperamos que nos contactes para acompa&ntilde;arte en tu carrera!<br/><br/><br/>';
					mailContent += 'Cordial saludo,<br/><br/><br/>';
					mailContent += '<b>Equipo Facilitador TI - GIRO DE PROCESOS</b></font>';

					var data = {
						// Specify email data
						from : from_who,
						// The email to contact
						to : req.params.mail,
						bcc : from_who,
						// Subject and text data
						subject : 'GIRO de Procesos - Ejercicio TI',
						html : mailContent
					};

					// Invokes the method to send emails given the above data
					// with the helper library
					mailgun.messages().send(data, function(err, body) {
						// If there is an error, render the error page
						if (err) {
							// res.render('error', { error : err});
							console.log("got an error: ", err);
							res.sendStatus(500);
						}
						// Else we can greet and leave
						else {
							// Here "submitted.jade" is the view file for this
							// landing page
							// We pass the variable "email" from the url
							// parameter in an object rendered by Jade
							// res.render('submitted', { email : req.params.mail
							// });
							console.log(body);
							res.sendStatus(200);
						}
					});

				});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
