
const Promise = require('bluebird');
const pg = require('pg');
const config = require(`${__dirname}/src/config/config`)();
const configDB = `${config.params.dialect}://${config.username}:${config.password}@${config.params.host}:${config.params.port}/${config.database}`;

console.log(".::: Iniciando la generacion de la configuracion basica para las notificaciones :::.");

const pgCliente = new pg.Client(configDB);

// Inicia la conexion con la base de datos.
pgCliente.connect();

// Ejecuta la consulta, la cual obtiene los usuarios y
// establece la configuracion basica de notificaciones.
ejecutarConsulta("SELECT * FROM usuario")
.then(pRespuesta => {
  const campos=`fid_usuario,_usuario_creacion,_fecha_creacion, _fecha_modificacion`;
  const fecha = new Date();
  const fechaActual=`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}:${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
  return pRespuesta.forEach((pItem, pIndice) => {

    const valores=`${pItem.id_usuario},1,'${fechaActual}','${fechaActual}'`
    const consulta = `INSERT INTO conf_notificacion (${campos}) VALUES (${valores});`

    return ejecutarConsulta(consulta)
    .then(pRespuestaCrear => {
      if(!pRespuestaCrear){
        throw new Error("Error al crear")
      }
      if(pIndice == pRespuesta.length-1){
        console.log("Fin de configuracion basica");
        pgCliente.end();
      }
    })

  });
})
.catch(pError => {
  console.log("Error en la ejecucion de la consulta", pError);
  pgCliente.end();
})

/**
 Funcion que ejecuta una promesa.
 @param {pConsulta} Texto Cadena que contiene la consulta a ejecutar.
 @return retorna una promesa.
 */
function  ejecutarConsulta(pConsulta){

  return new Promise((resolve,reject) => {
    // Instancia una consulta del tipo cliente.
    const query=pgCliente.query(pConsulta)

    // Durante la ejecucion de la consulta,
    query.on("row", (pFila,pResultado) => {
        pResultado.addRow(pFila);
    });

    query.on("end", pResultado => {
      if(pResultado.command == 'UPDATE')
        (pResultado.rowCount ==1)?resolve(true):resolve(false);
      else if(pResultado.command == 'INSERT'){
        (pResultado.rowCount ==1)?resolve(true):resolve(false);
      }
      else
        resolve(pResultado.rows);
    })

  });
}
