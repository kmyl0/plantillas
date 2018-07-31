process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
var config = require('konfig')();
// para base64
var base64 = require('base-64');
var utf8 = require('utf8');
var Client = require('node-rest-client').Client;
var client = new Client();
var Q = require('q');

var servicios = {
  obtenerPersona: function (ci, fecha_nacimiento) {
    var deferred = Q.defer();

      console.log("ci: " + ci);
      console.log("fecha_nacimiento: " + fecha_nacimiento);

      //argumentos para consultar al servicio
      var url = config.app.servicio_segip.host_port;
      var endpoint_base = config.app.servicio_segip.endpoint_base;
      var endpoint_tokens = config.app.servicio_segip.endpoint_tokens;
      var endpoint_personas = "segip/personas/";
      var endpoint_fecha = "?fecha_nacimiento=";
      var usuario = config.app.servicio_segip.usuario;
      var contresena = config.app.servicio_segip.contrasena;
      // header
      var args1 = {
          headers: { "Content-Type": "application/json" },
          data: { "usuario": usuario, "contrasena": utf8.decode(base64.decode(contresena)) }
      };
      // console.log(url + endpoint_base + endpoint_tokens);
      client.post(url + endpoint_base + endpoint_tokens, args1, function(data, response) {
        if(data.token){
          var token = data.token;
          var args = {
              headers: { "x-access-token": token }
          };
          client.get(url + endpoint_base + endpoint_personas + ci + endpoint_fecha + fecha_nacimiento, args, function(data, response) {
            // console.log(data);
            if (!data.success) {
                // res.status(404).json({ mensaje: "No existen resultados para su consulta" });
                deferred.reject(new Error("No existen resultados para su consulta."));
            } else {
                // res.json(data.persona);
                deferred.resolve(data.persona);
            }
          }).on('error', function(err) {
              // res.status(404).json({ mensaje: "No se pudo recuperar datos desde segip." });
              deferred.reject(new Error("No se pudo recuperar datos desde segip."));
          });
        }else {
          // res.status(404).json({ mensaje: "No se pudo recuperar el token desde segip." });
          deferred.reject(new Error("No se pudo recuperar el token desde segip."));
        }
      }).on('error', function(err) {
          // res.status(404).json({ mensaje: "No se pudo obtener el token desde segip." });
          deferred.reject(new Error("No se pudo obtener el token desde segip."));
      });
      //fin del servicio

    return deferred.promise;
  },
};

module.exports = servicios;
