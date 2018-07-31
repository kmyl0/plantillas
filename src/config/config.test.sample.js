import logger from "../lib/logger.js";
//import c from "babel-core"

console.log("configuracion de test activada");
//Archivo de configuracion para conexion a la base de datos
module.exports = {
    database: "[miDB]", // "plantillas_db"
    username: "[miUsuario]", // "postgres"
    password: "[miSuperPassword]", // "123abc"
    ruta_externos:"./public/[miRuta]", // ".public/externos"
    host:'miHostBackend', // test.local.agetic.gob.bo/plantillas-api
    front:'miHostFrontend', // test.local.agetic.gob.bo/plantillas/#/
    tiempo_token:60, // Tiempo en minutos, tiempo de vida del token.
    validacion:{
      // Validacion de peticiones GET, restringe el acceso solo a los
      // documentos con los cuales tiene relacion el usuario
      documento_get:false
    },
    // Configuracion de parametros que usa el sistema. Una vez configurados no
    // se deben cambiar, a excepcion del director y direccion.
    sistema:{
      // remover el [], dejar solamente el numero identificador.
      director:[identificadorDirector],
      direccion:[identificadorDireccionUnidad],
      // Cantidad de digitos que posee el cite.
      cite_ceros:5,
      // Descripcion guia del cite, [miCiteGuia]/IT/0001/2017
      cite_principal:'[miCiteGuia]'
    },
    // Configuracion de correo para un cliente postfix.
    correo: {
      port: ["miPuerto"], // 25
      host: "[miHostPostfix]", // localhost
      remitente: "[miSistema]", // Sistema de ...
      origen: "[miCorreoSistema]", // example@abc.de
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
          url: 'ldaps://ldap.example.abc:123',
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
