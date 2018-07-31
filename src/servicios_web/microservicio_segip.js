process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
var config = require('konfig')();
// para base64
var base64 = require('base-64');
var utf8 = require('utf8');
var Client = require('node-rest-client').Client;
var client = new Client();

var servicios = {
  obtenerPersona: function (req, res) {
    if (!req.query.ci) {
      res.status(412).json({msg: "El parámetro Documento de Identidad es requerido."});
    } else if (!req.query.fecha_nacimiento) {
      res.status(412).json({msg: "El parámetro Fecha de Nacimiento es requerido (formato = dd/mm/yyyy)."});
    } else {

      console.log("ci: " + req.query.ci);
      console.log("fecha_nacimiento: " + req.query.fecha_nacimiento);

      //argumentos para consultar al microservicio
      var url = config.app.microservicio_segip.host_port;
      var endpoint_base = config.app.microservicio_segip.endpoint_base;
      var endpoint_tokens = config.app.microservicio_segip.endpoint_tokens;
      var endpoint_personas = "personas?ci=";
      var endpoint_fecha = "&fecha_nacimiento=";
      var usuario = config.app.microservicio_segip.usuario;
      var contresena = config.app.microservicio_segip.contrasena;
      // header
      var args1 = {
          headers: { "Content-Type": "application/json" },
          // data: { "usuario": usuario, "contrasena": utf8.decode(base64.decode(contresena)) }
          data: { "usuario": usuario, "contrasena": utf8.decode(contresena) }
      };
      client.post(url + endpoint_base + endpoint_tokens, args1, function(data, response) {
        if(data.token){
          var token = data.token;
          var args = {
              headers: { "x-access-token": token }
          };
          client.get(url + endpoint_base + endpoint_personas + req.query.ci + endpoint_fecha + req.query.fecha_nacimiento, args, function(data, response) {
            console.log(data);
            // retornando respuesta
            res.json(data);
          }).on('error', function(err) {
              console.log('No se pudo recuperar datos del microservicio del segip', err.request.options);
              res.status(404).json({ mensaje: "No se pudo recuperar datos del microservicio del segip." });
          });
        }else {
          res.json(data);
        }
      }).on('error', function(err) {
          console.log('No se pudo obtener el token del microservicio del segip', err.request.options);
          res.status(404).json({ mensaje: "No se pudo obtener el token del microservicio del segip." });
      });
      //fin del servicio
    }
  },
};

module.exports = servicios;
