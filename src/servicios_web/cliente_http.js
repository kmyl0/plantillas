'use strict';

var Client = require('node-rest-client').Client;
var bluebird = require('bluebird');
var _ = require('lodash');

  // Content-Type aceptado para procesar la respuesta
var CONTENT_TYPE = "application/json";

var headers = {
  "Content-Type": "application/json"
};

var httpArgs = {
  headers: headers,
  requestConfig: {
    timeout: 5000, //request timeout in milliseconds
    noDelay: true, //Enable/disable the Nagle algorithm
    keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
    keepAliveDelay: 5000 //and optionally set the initial delay before the first keepalive probe is sent
  },
  responseConfig: {
    timeout: 5000 //response timeout
  }
  // ,
  // connection:{
  //   secureOptions: constants.SSL_OP_NO_TLSv1_2,
  //   ciphers:'ECDHE-RSA-AES256-SHA:AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  //   honorCipherOrder: true
  // }
};

var client = new Client();

var cliente_http = {

  adicionarRuta: function(nombreMetodo, ruta, metodo) {
    client.registerMethod(nombreMetodo, ruta, metodo);
  },
  obtenerConstruirCabecera: function(pAccessToken) {
    var objHeader = _.clone(httpArgs);
    if(pAccessToken !== null) {
      objHeader.headers["x-access-token"]=pAccessToken;
    }
    return objHeader;
  },
  get: function(pUrl) {
    return cliente_http.getConToken(pUrl, null);
  },
  getConToken: function(pUrl, token) {
    var objHttpArgs = cliente_http.obtenerConstruirCabecera(token);
    var promise = new bluebird.Promise(function(resolve, reject) {
      client.get(pUrl, objHttpArgs, function(data, response) {
        var respObj = cliente_http._procesarRespuesta(data, response);
        if(respObj.success){
          resolve(respObj.resultado);
        } else {
          reject(respObj.resultado);
        }
      }).on('error', function(error) {
        //error.request.options
        console.log(error.stack);
        var errorObj = new Error(error.message);
        reject(errorObj);
      });
    });
    return promise;
  },
  post: function(pUrl, objeto) {
    var objHttpArgs = cliente_http.obtenerConstruirCabecera(null);
    var promise = new bluebird.Promise(function(resolve, reject) {
      objHttpArgs.data = objeto;
      client.post(pUrl, objHttpArgs, function(data, response) {
        var respObj = cliente_http._procesarRespuesta(data, response);
        if(respObj.success){
          resolve(respObj.resultado);
        } else {
          reject(respObj.resultado);
        }
      }).on('error', function(error) {
        console.log(error.stack);
        var errorObj = new Error(error.message);
        reject(errorObj);
      });

    });
    return promise;
  },
  /**
  * Construye la respuesta
  **/
  _procesarRespuesta: function(data, response) {
    try {
      if(response.headers["content-type"].indexOf(CONTENT_TYPE) !== -1) {
        if(data && (_.isString(data) || _.isObject(data) || data instanceof Buffer)){
          var jsnData = data;
          if(data instanceof Buffer || _.isString(data)) {
            jsnData = JSON.parse(data);
          }
          if(response.statusCode === 401 && jsnData.codigo_error && jsnData.codigo_error === "TOKEN_EXPIRADO"){
            var error = new Error("Token expirado");
            error.codigo_error = "TOKEN_EXPIRADO";
            return {success: false, resultado: error};
          }
          if (response.statusCode === 200 || response.statusCode === 201 ) {
            return {success: true, resultado: jsnData};
          }
        } else {
          throw new Error("Error, la respuesta está vacía o tiene tipo desconocido");
        }
      } else {
        throw new Error("Error con código[" + response.statusCode + "] en el servicio.");
      }
    } catch(error){
        // BJA-COMMENT: Verificar si hay que continuar devolviendo la misma respuesta
        console.error(error.message);
        console.log(error.stack);
        return { success: false, resultado: error };
    }
  },
  construirQuery: function(objParams) {
    var query = '?' + _.map(objParams, function(val, key){
      return key + "=" + val;
    }).join('&');
    return query;
  }
}

module.exports = cliente_http;
