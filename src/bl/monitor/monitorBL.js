const Promise = require('bluebird');
const Uuid = require('uuid');
const moment = require('moment');
module.exports = {
  /**
   * Método que realiza la creacion o actualizacion de los registros monitor,
   * cuando un usuario visita un determinado documento
   * @param  {Modelos} pModelo Modelos de la base de datos.
   * @param  {Objeto} pLog     Objeto con informacion sobre la visita en curso.
   * @return {Promesa}
   */
  registrarVisita:(pModelo, pLog) => {
    // TODO: agregar informaion sobre el host??
    // console.log("Revisando el tipo de dato de la ip", typeof pLog.ip);
    // console.log("Revisando la informacion de entrada", pLog);
    // console.log("Revisando la generacion de fechas", moment().tz("America/La_Paz"));
    // console.log("Revisando la generacion de fechas", moment().tz("America/La_Paz").format("YYYY-MM-DD"));

    // Agrega a la informacion de visita la fecha actual.
    pLog['fecha_visita'] = moment().tz("America/La_Paz").format("YYYY-MM-DD");

    // Almacena un clon del vector ip.
    const ip = pLog.ip;

    // Agrega a la informacion de visita el vector de ip's en modo texto.
    pLog['ip'] = JSON.stringify(pLog.ip);

    // Instancia el modelo monitor, responsable de registrar visitas.
    const Monitor = pModelo.monitor;

    // Instancia un nuevo objeto.
    let datos={};

    // Instancia una nueva promesa.
    return new Promise((resolve, reject) => {

      // Realiza la busqueda, con relacion a la visita actual.
      Monitor.findOne({
        where:{
          fid_usuario:pLog.fid_usuario,
          fid_documento:pLog.fid_documento,
        },
      })
      .then(pMon => {
        // Si se encuentra registrada la visita.
        if(pMon){

          // Transforma las ip regitrada en modo texto a vector.
          const ips= JSON.parse(pMon.ip);

          // Inicializa un flag de verificacion de la IP, un contador.
          let flagIP=false;
          let c=0;

          // Itera las IP's obtenidas en la visita actual.
          for(let i=0; i<ip.length;i++){
            // Verifica si una de las ip actual ya estaba registrada.
            if(ips.indexOf(pLog[i])){ c++ }
          }

          if(moment(pMon.fecha_visita).format("YYYY-MM-DD")==pLog.fecha_visita && c>0){
            // Actualiza la informacion de la visita.
            pLog['_usuario_modificacion']=pLog.fid_usuario;
            pLog.contador=pMon.dataValues.contador+1;

            // Actualiza la informacion de la visita
            return pMon.update(pLog).then(() => resolve())
          }else {

            // Actualiza la informacion de la visita a registrar.
            pLog['contador']=1;
            pLog['_usuario_creacion']=pLog.fid_usuario;

            // Registra la visita.
            return Monitor.create(pLog).then(() => resolve())

          }

        }
        // Si no se encuentra registrada la visita.
        else{

          // Actualiza la informacion de la visita a registrar.
          pLog['contador']=1;
          pLog['_usuario_creacion']=pLog.fid_usuario;
          // pLog['fecha_visita']= moment().tz("America/La_Paz").format("YYYY-MM-DD");

          // Registra la visita.
          return Monitor.create(pLog).then(() => resolve())
        }
      })
      .catch(pError => {
        console.log("Error al crear el registro del monitor", pError);
        resolve()
      })
    })
  },
};
