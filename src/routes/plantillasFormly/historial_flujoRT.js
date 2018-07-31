import sequelizeHandlers from "sequelize-handlers";
import sequelizeFormly from "sequelize-formly";

module.exports = app => {

  const documento = app.src.db.models.documento;
  const unidad = app.src.db.models.unidad;
  const usuario = app.src.db.models.usuario;
  const correlativo = app.src.db.models.correlativo;
  const historial_flujo = app.src.db.models.historial_flujo;
  const util = require('../../lib/util')

  app.get('/api/v1/historialFlujo/:id/ultimo', (req, res) => {
    const idDocumento = req.params.id;
    let tipoError = 'ERROR';

    historial_flujo.findAll({
      where: {
        id_documento: idDocumento,
        estado: 'ACTIVO',
      },
      order: '_fecha_creacion DESC',
    })
    .then((hist) => {
        if(hist && hist[0]){
            return usuario.findById(hist[0]._usuario_creacion)
        }else {
            tipoError = 'ADVERTENCIA';
            throw new Error('El documento no tiene historial');
        }
    })
    .then((usu) => {
        res.send(util.formatearMensaje("EXITO", "Historial de flujo de un documento", {
            nombres: usu.dataValues.nombres,
            apellidos: usu.dataValues.apellidos,
        }));
    })
    .catch(error =>
      res.status(412).send(util.formatearMensaje(tipoError, error))
    );
  })

  app.get('/api/v1/historialFlujo/:id', (req, res) => {
    const idDocumento = req.params.id;
    const resultado = {detalle: idDocumento};
    let xdoc, xdocs;
    let tipoError = 'ERROR';
    documento.findById(idDocumento)
    .then( doc => {
        xdoc = doc;
        return historial_flujo.findAll({
          where: {
            id_documento: idDocumento,
            estado: 'ACTIVO',
          },
          order: '_fecha_creacion DESC',
        });
    })
    .then((doc) => {

      if (doc != null && doc.length > 0) {
        const promesas = [];
        doc.forEach((pItem, pIndice) => {
          if(['CERRADO','DERIVADO','CREADO'].indexOf(pItem.accion)!=-1){
              pItem.dataValues.cite = xdoc.nombre;
          }
          pItem.dataValues.tipo_doc = xdoc.nombre_plantilla;
          promesas.push(new Promise((resolve, reject) =>
          usuario.findById(pItem._usuario_creacion)
            .then(pUsuario => {
              pItem.dataValues.nombres = `${pUsuario.nombres} ${pUsuario.apellidos}`;
              pItem.dataValues.usuario = pUsuario.usuario;
              resolve(pItem);
            })
            .catch(e => reject(e))
          ));
        })
        return Promise.all(promesas);
      }

    })
    .then(doc => {
        if(doc){
            xdocs = doc;
            if( doc[0].accion=='RECHAZADO' )
            return usuario.findById(xdoc._usuario_creacion);
            return usuario.findById(xdoc.via_actual);
        }else {
            tipoError = 'ADVERTENCIA';
            throw new Error('El documento no tiene historial');
        }
    })
    .then(usu => {
        if( ['CERRADO','CREADO'].indexOf(xdocs[0].accion)==-1 ){
            xdocs.unshift({
                _fecha_creacion: xdocs[0]._fecha_creacion,
                _fecha_modificacion: xdocs[0]._fecha_creacion,
                accion: "REVISANDO",
                estado: "ACTIVO",
                id_documento: 314,
                id_historial_flujo: -1,
                nombres: `${usu.nombres} ${usu.apellidos}`,
                observacion: "",
                usuario: usu.usuario,
            });
        }
        res.send(util.formatearMensaje("EXITO", "Historial de flujo de un documento", xdocs))
    })
    .catch(error =>
      res.status(412).send(util.formatearMensaje(tipoError, error))
    );
  });

  app.get('/api/v1/historialFlujo/:id/proceso', (req, res) => {
    // TODO: es mas conveniente enviar en el id, el grupo.??
    const historial =[];
    let tipoError ='ERROR'
    let docs;
    let adocs;
    // Obtiene todos los documentos del grupo solicitado.
    documento.findById(req.params.id)
    .then(pResultadoDocumento => {
      if(pResultadoDocumento && pResultadoDocumento.dataValues.grupo!==null){
        return documento.findAll({
          attributes:['id_documento', 'nombre', 'nombre_plantilla', '_usuario_creacion', 'via_actual'],
          where:{
            grupo:pResultadoDocumento.dataValues.grupo,
            // estado:{$ne:'ELIMINADO'},
          },
          order: '_fecha_creacion DESC',
        })
      }
      else{
        tipoError = 'ADVERTENCIA';
        throw new Error('No existe el documento solicitado.');
      }
    })
    .then(pResultado => {
      docs = [];
      adocs = {};
      pResultado.forEach( doc => {
        // console.log(doc.dataValues);
        adocs[doc.dataValues.id_documento] = doc.dataValues;
        docs.push(doc.dataValues.id_documento)
      })

      if(pResultado.length>0){
        return historial_flujo.findAll({
          where:{
            id_documento:{ $or:{
            //   $in:JSON.parse(JSON.stringify(pResultado)),
              $in:docs,
            }},
          },
          order:'_fecha_creacion DESC',
        })
      }
      else{
        tipoError = 'ADVERTENCIA';
        throw new Error('No existe el proceso solicitado.');
      }

    })
    .then(pResultado => {

      if(pResultado.length>0){
        const historicos = pResultado.map(pItem => {
          if(['CERRADO','DERIVADO','CREADO'].indexOf(pItem.accion)!=-1){
            pItem.dataValues.cite = adocs[pItem.dataValues.id_documento].nombre;
          }
          pItem.dataValues.tipo_doc = adocs[pItem.dataValues.id_documento].nombre_plantilla;
          return usuario.findById(pItem.dataValues._usuario_creacion)
          .then(pUsuario => {
            pItem.dataValues.nombres = `${pUsuario.nombres} ${pUsuario.apellidos}`;
            pItem.dataValues.usuario = pUsuario.usuario;
          })
          .then(() => Promise.resolve(pItem))
          .catch(pError => Promise.reject(pError))
        })

        return Promise.all(historicos);
      }
      else{
        tipoError = 'ADVERTENCIA';
        throw new Error('El documento no tiene historial');
      }
    })
    .then(pResultado => {
        if(pResultado){
            docs = pResultado;
            // docs.forEach( d => { console.log(d.dataValues);})
            if( docs[0].accion=='RECHAZADO' || docs[0].accion=='ELIMINADO')
                return usuario.findById(adocs[docs[0].id_documento]._usuario_creacion);
            return usuario.findById(adocs[docs[0].id_documento].via_actual);
        }else {
            tipoError = 'ADVERTENCIA';
            throw new Error('El documento no tiene historial');
        }
    })
    .then(usu => {
        if( ['CERRADO','CREADO'].indexOf(docs[0].accion)==-1 ){
            docs.unshift({
                _fecha_creacion: docs[0]._fecha_creacion,
                _fecha_modificacion: docs[0]._fecha_creacion,
                accion: "REVISANDO",
                estado: "ACTIVO",
                id_documento: 314,
                id_historial_flujo: -1,
                nombres: `${usu.nombres} ${usu.apellidos}`,
                observacion: "",
                usuario: usu.usuario,
            });
        }
      // console.log("Revisando el historial final", historial.length);
      res.send(util.formatearMensaje("EXITO", "Historial de flujo de un proceso", docs))
    })
    .catch(pError => {
      res.status(412).send(util.formatearMensaje(tipoError, pError))
    })
  });

  app.options('/api/v1/historialFlujo/documento', sequelizeFormly.formly(documento, app.src.db.models));
};
