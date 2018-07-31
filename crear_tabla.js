
const Promise = require('bluebird');
const pg = require('pg');
const config = require(`${__dirname}/src/config/config`)();
const configDB = `${config.params.dialect}://${config.username}:${config.password}@${config.params.host}:${config.params.port}/${config.database}`;

console.log(".::: Iniciando la creacion de tabla(s) :::.");

const pgCliente = new pg.Client(configDB);

// Inicia la conexion con la base de datos.
pgCliente.connect();

// Ejecuta la consulta, la cual crea la tabla monitor.
ejecutarConsulta(`
CREATE TABLE monitor
  (
    id_monitor serial NOT NULL,
    fid_usuario integer NOT NULL,
    fid_documento integer NOT NULL,
    fecha_visita date NOT NULL,
    ip text NOT NULL,
    mac text,
    contador integer NOT NULL,
    relacionado boolean DEFAULT false,
    cite boolean DEFAULT false,
    _usuario_creacion integer NOT NULL,
    _usuario_modificacion integer,
    _fecha_creacion timestamp with time zone NOT NULL,
    _fecha_modificacion timestamp with time zone NOT NULL,
    CONSTRAINT monitor_pkey PRIMARY KEY (id_monitor)
  )`)
.then(pRespuesta => {
    console.log("Creacion finalizada");
    pgCliente.end();
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
