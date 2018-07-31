import sequelizeHandlers from "sequelize-handlers";
import sequelizeFormly from "sequelize-formly";
import sequelize from "sequelize";
import _ from "lodash";
const moment = require('moment');
module.exports = app => {
  const monitor = app.src.db.models.monitor;
  const usuario = app.src.db.models.usuario;
  const documento = app.src.db.models.documento;
  const util = require('../../lib/util');

  // app.get('/global/', (req,res) => {
  app.get('/api/v1/monitoreo/global/', (req,res) => {
    // console.log("Iniciando la nueva busqueda", req.query);
    const dm=moment(`${req.query.anio}-${req.query.mes}`,'YYYY-MM').daysInMonth(),
    inicio = moment(`${req.query.anio}-${req.query.mes}-1`, 'YYYY-MM').tz('America/La_Paz').format('YYYY-MM-DD'),
    final = moment(inicio).tz('America/La_Paz').add(dm-1,'days').format('YYYY-MM-DD');
    let
    total = new Array(dm),
    relacionado=new Array(dm),
    noRel=new Array(dm),
    f,
    v,
    tot,
    nombres=[];
    total.fill(0,0);
    relacionado.fill(0,0);
    noRel.fill(0,0);
    for (var i = 1; i <= dm; i++) {
      nombres.push(`${i}-${req.query.mes}-${req.query.anio}`);
    }

    const opcionesMonitor = {
      attributes: [ 'fecha_visita','relacionado',  [sequelize.fn('SUM', sequelize.col('contador')), 'suma'] ],
      where:{
        fecha_visita:{
          $between:[`${inicio}T04:00:00.000Z`,`${final}T04:00:00.000Z`],
        },
      },
      group: ['fecha_visita', 'relacionado'],
      order:'fecha_visita',
    };
    if(req.query.relacion) opcionesMonitor.where.relacionado=req.query.relacion;

    monitor.findAll(opcionesMonitor)
    .then( pLog => {

      pLog.forEach((pItem, pIndice) => {
          const f=moment(pItem.fecha_visita).tz('America/La_Paz').format('DD-MM-YYYY');
          const d = parseInt(moment(f,'DD').tz('America/La_Paz').format('DD')) -1;

          total[d]+=parseInt(pItem.dataValues.suma);
          if(pItem.dataValues.relacionado==true){

            relacionado[d]= parseInt(pItem.dataValues.suma);
          } else {
            noRel[d]= parseInt(pItem.dataValues.suma);
          }
          if( pIndice == pLog.length-1 ) return;
      })


    })
    .then(() => {

      res.status(200).send(util.formatearMensaje('EXITO', 'Obtencion de datos exitoso', { nombres, global:total,relacionado,no_relacionado:noRel, total:dm}))

    })
    .catch(pError => {
        console.log("Error en la busqueda", pError);
        res.status(412).send(util.formatearMensaje('ERROR', pError));
    })
  });

  app.get('/api/v1/monitoreo/usuario/', (req,res) => {
    console.log("Iniciando la nueva busqueda", req.query);
    const dm=moment(`${req.query.anio}-${req.query.mes}`,'YYYY-MM').daysInMonth(),
    inicio = moment(`${req.query.anio}-${req.query.mes}-1`, 'YYYY-MM').tz('America/La_Paz').format('YYYY-MM-DD'),
    final = moment(inicio).tz('America/La_Paz').add(dm-1,'days').format('YYYY-MM-DD'),
    page = (req.query.page-1)*20 || 0;
    console.log("Revisando la fecha inicio",inicio );
    console.log("Revisando la fecha final", final);

    let res1 = [],
        res2 = [],
        res3 = [],
        arr = [],
        ids_usuarios = [],
        tot, v = {};
    let opcionesMonitor = {
      attributes: ['fid_usuario',  [sequelize.fn('SUM', sequelize.col('contador')), 'suma'] ],
      where:{
        fecha_visita:{
          $between:[`${inicio}T04:00:00.000Z`,`${final}T04:00:00.000Z`],
        },
      },
      group: ['fid_usuario'],
      order:'suma DESC',
      limit: 20,
      offset: page,
    };
    if(req.query.relacion) opcionesMonitor.where.relacionado=req.query.relacion;
    monitor.findAndCountAll(opcionesMonitor)
    .then( pResp => {
        tot = pResp.count.length;
        pResp.rows.forEach( it => {
            res1.push(it.dataValues.suma);
            res2.push(0);res3.push(it.dataValues.suma);
            v[it.fid_usuario] = res1.length-1;
            ids_usuarios.push(it.fid_usuario);
            arr.push(new Promise((resolve, reject) =>
                usuario.findById(it.fid_usuario).then( r => resolve(r.usuario))
            ));
        });
        opcionesMonitor = {
          attributes: ['fid_usuario',  [sequelize.fn('SUM', sequelize.col('contador')), 'suma'] ],
          where:{
            fecha_visita:{
              $between:[`${inicio}T04:00:00.000Z`,`${final}T04:00:00.000Z`]
            },
            fid_usuario: { $in: ids_usuarios },
            relacionado: true,
          },
          group: ['fid_usuario'],
        };
        return monitor.findAll(opcionesMonitor);
    })
    .then( pResp => {
        pResp.forEach( it => {
            v.i = v[it.fid_usuario];
            res2[v.i]=it.dataValues.suma;
            res3[v.i]=parseInt(res3[v.i])-parseInt(res2[v.i]);
        });
        return Promise.all(arr);
    })
    .then( pResp => {
        res.status(200).send(util.formatearMensaje('EXITO', 'Obtencion de datos exitoso', { global: res1, relacionado: res2, no_relacionado: res3, nombres: pResp, total: tot}))
    })
    .catch(pError => {
        console.log("Error en la busqueda", pError);
        res.status(412).send(util.formatearMensaje('ERROR', pError));
    })
  });

  app.get('/api/v1/monitoreo/documento/', (req,res) => {
    console.log("Iniciando la nueva busqueda", req.query);
    const dm=moment(`${req.query.anio}-${req.query.mes}`,'YYYY-MM').daysInMonth(),
    inicio = moment(`${req.query.anio}-${req.query.mes}-1`, 'YYYY-MM').tz('America/La_Paz').format('YYYY-MM-DD'),
    final = moment(inicio).tz('America/La_Paz').add(dm-1,'days').format('YYYY-MM-DD'),
    page = (req.query.page-1)*20 || 0;
    console.log("Revisando la fecha inicio",inicio );
    console.log("Revisando la fecha final", final);

    let res1 = [],
        res2 = [],
        res3 = [],
        arr = [],
        ids_usuarios = [],
        tot, v = {};
    let opcionesMonitor = {
      attributes: ['fid_documento',  [sequelize.fn('SUM', sequelize.col('contador')), 'suma'] ],
      where:{
        fecha_visita:{
          $between:[`${inicio}T04:00:00.000Z`,`${final}T04:00:00.000Z`],
        }
      },
      group: ['fid_documento'],
      order:'suma DESC',
      limit: 20,
      offset: page,
    };
    monitor.findAndCountAll(opcionesMonitor)
    .then( pResp => {
        tot = pResp.count.length;
        pResp.rows.forEach( it => {
            res1.push(it.dataValues.suma);
            res2.push(0);res3.push(it.dataValues.suma);
            v[it.fid_documento] = res1.length-1;
            ids_usuarios.push(it.fid_documento);
            arr.push(new Promise((resolve, reject) =>
                documento.findById(it.fid_documento).then( r => resolve( r==null? 's/n': r.nombre))
            ));
        });
        opcionesMonitor = {
          attributes: ['fid_documento',  [sequelize.fn('SUM', sequelize.col('contador')), 'suma'] ],
          where:{
            fecha_visita:{
              $between:[`${inicio}T04:00:00.000Z`,`${final}T04:00:00.000Z`]
            },
            fid_documento: { $in: ids_usuarios },
            relacionado: true,
          },
          group: ['fid_documento'],
        };
        return monitor.findAll(opcionesMonitor);
    })
    .then( pResp => {
        pResp.forEach( it => {
            v.i = v[it.fid_documento];
            res2[v.i]=it.dataValues.suma;
            res3[v.i]=parseInt(res3[v.i])-parseInt(res2[v.i]);
        });
        return Promise.all(arr);
    })
    .then( pResp => {
        res.status(200).send(util.formatearMensaje('EXITO', 'Obtencion de datos exitoso', { global: res1, relacionado: res2, no_relacionado: res3, nombres: pResp, total: tot}))
    })
    .catch(pError => {
        console.log("Error en la busqueda", pError);
        res.status(412).send(util.formatearMensaje('ERROR', pError));
    })
  });


  // app.get('/:id/documento', (req,res) => {
  app.get('/api/v1/monitoreo/:id/documento', (req,res) => {

    let
    resultado = [],
    arr = [],
    tot,
    nombres = [],
    total = [],
    relacionado = [],
    sinRel = [],
    c = 0,
    // page  = (req.query.page-1)*20 || 0;
    page  = (req.query.page-1)*5 || 0;

    const opcionesMonitor = {
      attributes: ['fid_documento', 'relacionado',[sequelize.fn('SUM', sequelize.col('contador')), 'suma'] ],
      where:{
        fid_usuario:req.params.id,
        cite:true,
      },
      group: ['fid_documento', 'relacionado'],
      order : 'suma DESC',
      limit : 5,
      offset : page
    };

    if(req.query.relacion) opcionesMonitor.where.relacionado=req.query.relacion

    monitor.findAndCountAll(opcionesMonitor)
    .then( pLog => {
        c = pLog.count.length;
        pLog.rows.forEach( (it, i) => {
          console.log("revisando los registros obtenidos", it.dataValues);
            resultado.push(it.dataValues.suma);
            arr.push(new Promise((resolve, reject) => {

                documento.findOne({
                  where:{
                    id_documento:it.fid_documento,
                    nombre:{$like:'AGETIC%/%/%'},
                  }
                })
                .then( r => {

                  if(r){
                    const val = parseInt(it.dataValues.suma);
                    total.push(val)
                    nombres.push(r.nombre || 'sin nombre');
                    if(it.relacionado==true){
                      relacionado.push(val);
                      sinRel.push(0)
                    }
                    else {
                      sinRel.push(val);
                      relacionado.push(0)
                    }
                  }
                  else resultado.splice(i,1);
                  resolve('_');
                }
              )
            }))
        })
        return Promise.all(arr)
    })
    .then( pResp => {

        res.status(200).send(util.formatearMensaje('EXITO', 'Obtencion de datos exitoso', { global:total,relacionado,no_relacionado:sinRel,nombres, total:c }))
    })
    .catch(pError => {
        console.log("Error en la busqueda", pError);
        res.status(412).send(util.formatearMensaje('ERROR', pError));
    })
  });

/**
  @apiVersion 1.0.0
  @apiGroup monitoreo monitor
  @apiName Get monitor/:id
  @api {get} /api/v1/monitoreo/monitor/:id Obtiene un/a monitor

  @apiDescription Get monitor, obtiene un/a monitor

  @apiParam (Parametro) {Numerico} id Identificador de monitor que se quiere obtener

  @apiSuccess (Respuesta) {Numerico} id_monitor Identificador de monitor
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de monitor
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de monitor

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "id_monitor": "1",
      "campo": "xxx",
      "_usuario_creacion": "1",
      "_fecha_creacion": " << fecha y hora >> ",
      "_fecha_modificacion": " << fecha y hora >> "
    }

  }
*/
  app.get('/api/v1/monitoreo/monitor/:id', sequelizeHandlers.get(monitor));

/**
  @apiVersion 1.0.0
  @apiGroup monitoreo monitor
  @apiName Get monitor
  @api {get} /api/v1/monitoreo/monitor/ Obtiene la lista completa de monitor

  @apiDescription Get monitor

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "total": 21,
      "parcial":[
        {
          "id_monitor": "1",
          "campo": "xxx",
          "_usuario_creacion": "1",
          "_fecha_creacion": " << fecha y hora >> ",
          "_fecha_modificacion": " << fecha y hora >> "
        },
        {
          "id_monitor": "2",
          "campo": "zzz",
          "_usuario_creacion": "1",
          "_fecha_creacion": " << fecha y hora >> ",
          "_fecha_modificacion": " << fecha y hora >> "
        },
        ...
      ]

  }

*/

/**
  @apiVersion 1.0.0
  @apiGroup monitoreo monitor
  @apiName Get monitor/?order=&limit=&page=&filter=
  @api {get} /api/v1/monitoreo/monitor/?order=&limit=&page=&filter= Obtiene la lista paginada de monitor

  @apiDescription Get monitor

  @apiParam (Query) {Texto} order Campo por el cual se ordenará el parcial
  @apiParam (Query) {Numerico} limit Cantidad de resultados a obtener
  @apiParam (Query) {Numerico} page Número de página de resultados
  @apiParam (Query) {Texto} filter Texto a buscar en los registros

  @apiSuccess (Respuesta) {Texto} tipoMensaje Tipo del mensaje de respuesta.
  @apiSuccess (Respuesta) {Texto} mensaje Mensaje de respuesta.
  @apiSuccess (Respuesta) {Objeto} datos Objeto de con los datos de respuesta
  @apiSuccess (Respuesta) {Numerico} total Numero de objetos categoria
  @apiSuccess (Respuesta) {Array} parcial Array de objetos categoria


  @apiSuccessExample {json} Respuesta:
    HTTP/1.1 200 OK
    {
      "tipoMensaje": "EXITO",
      "mensaje": "La operación se realizó correctamente.",
      "datos": {
        "total": 21,
        "parcial":[
          {
            "id_monitor": 1,
            "codigo": "CI",
            "descripcion": "Carnet de identidad",
            "estado": "ACTIVO",
            "_usuario_creacion": 5,
            "_usuario_modificacion": null,
            "_fecha_creacion": "2016-08-29T13:59:22.788Z",
            "_fecha_modificacion": "2016-08-29T13:59:22.788Z"
          },
          {
            "id_monitor": 2,
            "codigo": "PAS",
            "descripcion": "Pasaporte",
            "estado": "ACTIVO",
            "_usuario_creacion": 5,
            "_usuario_modificacion": null,
            "_fecha_creacion": "2016-08-29T14:02:19.060Z",
            "_fecha_modificacion": "2016-08-29T14:02:19.060Z"
          },
          ...
        ]
    }

*/
  app.get('/api/v1/monitoreo/monitor', sequelizeHandlers.query(monitor));

/**
  @apiVersion 1.0.0
  @apiGroup monitoreo monitor
  @apiName Delete monitor
  @api {delete} /api/v1/monitoreo/monitor/:id Elimina un/a monitor

  @apiDescription Delete monitor

  @apiParam (Parametro) {Numerico} id Identificador de monitor que se quiere eliminar

  @apiSuccessExample {json} Respuesta:
      HTTP/1.1 200 OK
    {

    }
*/
  // app.delete('/api/v1/monitoreo/monitor/:id', sequelizeHandlers.remove(monitor));

/**
  @apiVersion 1.0.0
  @apiGroup monitoreo monitor
  @apiName Put monitor
  @api {put} /api/v1/monitoreo/monitor/:id Actualiza un/a monitor

  @apiDescription Put monitor

  @apiParam (Parametro) {Numerico} id Identificador de monitor que se quiere actualizar

  @apiParam (Peticion) {Texto} campo Decripción del campo

  @apiParamExample {json} Ejemplo para enviar:
  {
    "campo": "yyy",
  }

  @apiSuccess (Respuesta) {Numerico} id_monitor Identificador de monitor
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creacion de monitor
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificacion de monitor

  @apiSuccessExample {json} Respuesta del Ejemplo:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos":{
      "id_monitor": "1",
      "campo": "yyy",
      "_usuario_creacion": "1",
      "_fecha_creacion": " << fecha y hora >>",
      "_fecha_modificacion": " << fecha y hora actual >> "
    }

  }

  @apiSampleRequest off
*/
  // app.put('/api/v1/monitoreo/monitor/:id', sequelizeHandlers.update(monitor));

/**
  @apiVersion 1.0.0
  @apiGroup monitoreo monitor
  @apiName Options monitor
  @api {options} /api/v1/monitoreo/monitor Extrae formly de monitor

  @apiDescription Options de monitor

  @apiSuccess (Respuesta) {Texto} key Llave para el campo
  @apiSuccess (Respuesta) {Texto} type Tipo de etiqueta este puede ser input, select, datepicker, etc
  @apiSuccess (Respuesta) {Objeto} templateOptions Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  [
    {
      "key": "id_monitor",
      "type": "input",
      "templateOptions": {
        "type": "number",
        "label": "Id monitor",
        "required": true
      },
    },
    {
      "key": "campo",
      "type": "input",
      "templateOptions": {
        "type": "text",
        "label": "Campo",
        "required": true
      }
    }
  ]

  @apiSampleRequest off
*/
  app.options('/api/v1/monitoreo/monitor', sequelizeFormly.formly(monitor, app.src.db.models));
};
