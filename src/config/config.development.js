import logger from "../lib/logger.js";
//import c from "babel-core"

console.log("configuracion de desarrollo activada");
//Archivo de configuracion para conexion a la base de datos
module.exports = {
    database: "plantillas_db", // "plantillas_db"
    username: "postgres", // "postgres"
    password: "postgres", // "123abc"
    ruta_externos:"./public/documentos", // ".public/externos"
    host:'localhost:8001', // test.local.agetic.gob.bo/plantillas-api
    front:'localhost:3000/#', // test.local.agetic.gob.bo/plantillas/#/
    tiempo_token:60, // Tiempo en minutos, tiempo de vida del token.
    validacion:{
      // Validacion de peticiones GET, restringe el acceso solo a los
      // documentos con los cuales tiene relacion el usuario
      // documento_get:false
    },
    // Configuracion de parametros que usa el sistema. Una vez configurados no
    // se deben cambiar, a excepcion del director y direccion.
    sistema:{
      usar_ldap:false,
      // remover el [], dejar solamente el numero identificador.
      director:2 ,
      direccion:1,
      // Cantidad de digitos que posee el cite.
      cite_ceros:5,
      // Descripcion guia del cite, [miCiteGuia]/IT/0001/2017
      cite_principal:'CITE'
    },
    // Configuracion de correo para un cliente postfix.
    correo: {
      port: 2255, // 25
      host: "localhost", // localhost
      remitente: "Plantillas", // Sistema de ...
      origen: "admin@localhost.com", // example@abc.de
      secure:false,
      ignoreTLS:false,
      tls:{ rejectUnauthorized:false }
    },
    // Configuracion para el consumo de la API de notificacion.
    notificacion:{
      sms_url:'http://192.168.1.2/miApiSms',
      sms_token:'[miTokenSms]',
      correo_url:'http://192.168.1.2/miApiCorreo',
      correo_token:'[miTokenCorreo]'
    },
    params: {
        dialect: "postgres",
        port: 5432,
        host: "localhost",
        sync: {force: process.env.FORCE || false},
        logging: (sql) => {
            // logger.info(`[${new Date()}] ${sql}`);
        },
        define: { underscored: true},
    },
    ldap:{
      server: {
          url: 'ldaps://localhost:123',
          bindDn: 'uid=usuarioLDAP...',
          bindCredentials: 'pwdLDAP',
          searchBase: 'ou=usuarios...',
          searchFilter: '(uid={{username}})',
      },
    },
    //configuracion con jwt poner una palabra secreta segura
    jwtSecret: "AGETIC-2016",
    jwtSession: { session: false },
    puerto: 8001
};
