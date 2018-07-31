import sequelizeHandlers from "sequelize-handlers";
import sequelizeFormly from "sequelize-formly";

module.exports = app => {
  const plantilla_formly = app.src.db.models.plantilla_formly;
  const documento = app.src.db.models.documento;
  const util = app.src.lib.util;
  const rutaExternos = app.src.config.config.host;

/**
  @apiVersion 1.0.0
  @apiGroup plantillas_formly
  @apiName Post plantillas_formly
  @api {post} /api/v1/plantillasFormly/plantillas_formly Crear plantillas_formly

  @apiDescription Post para plantillas_formly

  @apiParam (Peticion) {Texto} nombre Nombre de la plantilla_formly
  @apiParam (Peticion) {Texto} abreviacion Abreviacion de la plantilla_formly
  @apiParam (Peticion) {Texto} plantilla Plantilla_formly
  @apiParam (Peticion) {Numerico} _usuario_creacion Identificador del usuario que esta creando

  @apiParamExample {json} Ejemplo para enviar:
  {
  	"nombre":"plantilla_test",
  	"abreviacion":"plant",
  	"plantilla":"[]",
  	"_usuario_creacion":1
  }

  @apiSuccess (Respuesta) {Numerico} id_plantillas_formly Identificador de plantillas_formly
  @apiSuccess (Respuesta) {Texto} nombre Nombre de plantilla_formly
  @apiSuccess (Respuesta) {Texto} abreviacion Abreviacion de plantillas_formly
  @apiSuccess (Respuesta) {Texto} plantilla Plantillas_formly
  @apiSuccess (Respuesta) {Texto} plantilla_valor Valor de plantillas_formly
  @apiSuccess (Respuesta) {Texto} estado Estado de plantillas_formly
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de plantillas_formly
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de plantillas_formly

  @apiSuccessExample {json} Respuesta del Ejemplo:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "id_plantilla_formly": 21,
      "nombre": "plantilla_test",
      "abreviacion": "plant",
      "plantilla": "[]",
      "plantilla_valor": null,
      "estado": "ACTIVO",
      "_usuario_creacion": 1,
      "_usuario_modificacion": null
      "_fecha_modificacion": "2016-12-19T20:55:31.372Z",
      "_fecha_creacion": "2016-12-19T20:55:31.372Z",
    }
  }

  @apiSampleRequest off
*/
app.post('/api/v1/plantillasFormly/plantilla_formly',  sequelizeHandlers.create(plantilla_formly));

app.post('/api/v1/plantillasFormly/generarDocumento', (req, res) => {
  const respuesta = {};
  req.body.host=rutaExternos;
  const datos = JSON.parse(JSON.stringify(req.body));
  util.generarDocumento(req.body)
  .then(pRespuesta => {
    respuesta.nombre = pRespuesta.nombre;
    return util.generarHtml(datos)
  })
  .then(pRespuesta => {
    respuesta.html = pRespuesta.html;
    res.status(200).send(util.formatearMensaje('EXITO', "Exitosa generación de la vísta previa.", respuesta))
  })
  .catch(pError => {
    console.log("Eco desde el catch", pError);
    res.status(412).send(util.formatearMensaje('ERROR', pError))
  })

});

/**
  @apiVersion 1.0.0
  @apiGroup plantillas_formly
  @apiName Get plantillas_formly/:id
  @api {get} /api/v1/plantillasFormly/plantillas_formly/:id Obtiene un/a plantillas_formly

  @apiDescription Get plantillas_formly, obtiene un/a plantillas_formly

  @apiParam (Parametro) {Numerico} id Identificador de plantillas_formly que se quiere obtener

  @apiSuccess (Respuesta) {Numerico} id_plantillas_formly Identificador de plantillas_formly
  @apiSuccess (Respuesta) {Texto} nombre Nombre de plantilla_formly
  @apiSuccess (Respuesta) {Texto} abreviacion Abreviacion de plantillas_formly
  @apiSuccess (Respuesta) {Texto} plantilla Plantillas_formly
  @apiSuccess (Respuesta) {Texto} plantilla_valor Valor de plantillas_formly
  @apiSuccess (Respuesta) {Texto} estado Estado de plantillas_formly
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de plantillas_formly
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de plantillas_formly

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "id_plantilla_formly": 21,
      "nombre": "plantilla_test",
      "abreviacion": "plant",
      "plantilla": "[]",
      "plantilla_valor": null,
      "estado": "ACTIVO",
      "_usuario_creacion": 1,
      "_usuario_modificacion": null,
      "_fecha_creacion": "2016-12-19T20:55:31.372Z",
      "_fecha_modificacion": "2016-12-19T20:55:31.372Z"
    }
  }
*/
  app.get('/api/v1/plantillasFormly/plantilla_formly/:id', sequelizeHandlers.get(plantilla_formly));

  app.get('/api/v1/plantillasFormly/plantilla_formly/abreviacion/:abr', (req, res) => {
    const respuesta = {};
    plantilla_formly.findAndCountAll({
      attributes: ['id_plantilla_formly','abreviacion'],
      where: {
          abreviacion: `${req.params.abr}`,
      },
    })
    .then( data => {
        respuesta.row = data;
        return plantilla_formly.findAndCountAll({
          attributes: ['id_plantilla_formly','abreviacion'],
          where: {
              abreviacion: { $like: `${req.params.abr}-%`},
          },
        })
    })
    .then( data => {
        respuesta.rows = data;
        res.send(util.formatearMensaje("EXITO", "El documento se aprobó correctamente", respuesta));
    })
    .catch( e => {
        res.status(412).send(util.formatearMensaje("ERROR", e));
    })
  });

/**
  @apiVersion 1.0.0
  @apiGroup plantillas_formly
  @apiName Get plantillas_formly
  @api {get} /api/v1/plantillasFormly/plantillas_formly/ Obtiene la lista completa de plantillas_formly

  @apiDescription Get plantillas_formly

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "total": 21,
      "resultado":[
        {
         "id_plantilla_formly": 1,
         "nombre": "Contrato Administrativo para la Prestación de Bienes y Servicios",
         "abreviacion": "CAPBS",
         "plantilla": "[]",
         "plantilla_valor": null,
         "estado": "ACTIVO",
         "_usuario_creacion": 1,
         "_usuario_modificacion": 1,
         "_fecha_creacion": "2016-12-15T21:03:42.486Z",
         "_fecha_modificacion": "2016-12-15T21:05:12.504Z"
        }, ...
    ]

  }

*/

/**
  @apiVersion 1.0.0
  @apiGroup plantillas_formly
  @apiName Get plantillas_formly/?order=&limit=&page=&filter=
  @api {get} /api/v1/plantillasFormly/plantillas_formly/?order=&limit=&page=&filter= Obtiene la lista paginada de plantillas_formly

  @apiDescription Get plantillas_formly

  @apiParam (Query) {Texto} order Campo por el cual se ordenará el resultado
  @apiParam (Query) {Numerico} limit Cantidad de resultados a obtener
  @apiParam (Query) {Numerico} page Número de página de resultados
  @apiParam (Query) {Texto} filter Texto a buscar en los registros

  @apiSuccess (Respuesta) {Texto} tipoMensaje Tipo del mensaje de respuesta.
  @apiSuccess (Respuesta) {Texto} mensaje Mensaje de respuesta.
  @apiSuccess (Respuesta) {Objeto} datos Objeto de con los datos de respuesta
  @apiSuccess (Respuesta) {Numerico} total Numero de objetos categoria
  @apiSuccess (Respuesta) {Array} resultado Array de objetos categoria


  @apiSuccessExample {json} Respuesta:
    HTTP/1.1 200 OK
    {
      "tipoMensaje": "EXITO",
      "mensaje": "La operación se realizó correctamente.",
      "datos": {
        "total": 21,
        "resultado":[
        {
         "id_plantilla_formly": 1,
         "nombre": "Contrato Administrativo para la Prestación de Bienes y Servicios",
         "abreviacion": "CAPBS",
         "plantilla": "[]",
         "plantilla_valor": null,
         "estado": "ACTIVO",
         "_usuario_creacion": 1,
         "_usuario_modificacion": 1,
         "_fecha_creacion": "2016-12-15T21:03:42.486Z",
         "_fecha_modificacion": "2016-12-15T21:05:12.504Z"
        }, ...
        ]
    }

*/
  app.get('/api/v1/plantillasFormly/plantilla_formly', sequelizeHandlers.query(plantilla_formly));

/**
  @apiVersion 1.0.0
  @apiGroup plantillas_formly
  @apiName Delete plantillas_formly
  @api {delete} /api/v1/plantillasFormly/plantillas_formly/:id Elimina un/a plantillas_formly

  @apiDescription Delete plantillas_formly

  @apiParam (Parametro) {Numerico} id Identificador de plantillas_formly que se quiere eliminar

  @apiSuccessExample {json} Respuesta:
      HTTP/1.1 200 OK
    {

    }
*/
  app.delete('/api/v1/plantillasFormly/plantilla_formly/:id', (req, res) => {

    const roles = req.body.audit_usuario.roles;
    
    plantilla_formly.findOne({
      where:{id_plantilla_formly:req.params.id},
    })
    .then(pPlantilla => {
      let cont=0;
      for(let i = 0; i<roles.length;i++){
        if(roles[i].rol.nombre=="CONFIGURADOR") cont++;
      }
      if(cont == 0) throw  new Error("Usted no tiene la autorizacion.");
      else return pPlantilla;

    })
    .then(pPlantilla => documento.findAll({
        attributes:['abreviacion'],
        where:{
          abreviacion:pPlantilla.abreviacion,
          estado:{$ne:'ELIMINADO'},
        },
      })
      .then(pDocumentos => {
        if(pDocumentos.length>0) throw new Error("No se puede eliminar la plantilla, porque ya existen documentos con la misma.")
        else return pPlantilla.destroy();
      })
    )
    .then(() => {
      res.send(util.formatearMensaje("EXITO", "La eliminación fue exitosa"));
    })
    .catch(pError => {
      res.status(412).send(util.formatearMensaje("ERROR", pError))
    })
  });

/**
  @apiVersion 1.0.0
  @apiGroup plantillas_formly
  @apiName Put plantillas_formly
  @api {put} /api/v1/plantillasFormly/plantillas_formly/:id Actualiza un/a plantillas_formly

  @apiDescription Put plantillas_formly

  @apiParam (Parametro) {Numerico} id Identificador de plantillas_formly que se quiere actualizar

  @apiParam (Peticion) {Texto} abreviacion Abreciación de plantillas_formly

  @apiParamExample {json} Ejemplo para enviar:
  {
	  "abreviacion":"QA"
  }

  @apiSuccess (Respuesta) {Numerico} id_plantillas_formly Identificador de plantillas_formly
  @apiSuccess (Respuesta) {Texto} nombre Nombre de plantillas_formly
  @apiSuccess (Respuesta) {Texto} abreviacion Abreviacion de plantillas_formly
  @apiSuccess (Respuesta) {Texto} plantilla Plantillas_formly
  @apiSuccess (Respuesta) {Texto} plantilla_valor Valor de plantillas_formly
  @apiSuccess (Respuesta) {Texto} estado Estado de plantillas_formly
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de plantillas_formly
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de plantillas_formly

  @apiSuccessExample {json} Respuesta del Ejemplo:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "id_plantilla_formly": 21,
      "nombre": "plantilla_test",
      "abreviacion": "QA",
      "plantilla": "[]",
      "plantilla_valor": null,
      "estado": "ACTIVO",
      "_usuario_creacion": 1,
      "_usuario_modificacion": null,
      "_fecha_creacion": "2016-12-19T20:55:31.372Z",
      "_fecha_modificacion": "2016-12-19T21:02:38.049Z"
    }
  }

  @apiSampleRequest off
*/
  app.put('/api/v1/plantillasFormly/plantilla_formly/:id' , (req,res) => {
    const roles = req.body.audit_usuario.roles;
    let cont = 0;
    for(let i = 0; i< roles.length;i++){
      if(roles[i].rol.nombre=="CONFIGURADOR")cont++;
    }
    plantilla_formly.findOne({
      where:{id_plantilla_formly:req.params.id},
    })
    .then(pPlantilla => {
      if(pPlantilla){
        if(cont == 0) throw  new Error("Usted no tiene la autorizacion.");
        else return pPlantilla.update(req.body);
      }
      else throw new Error("La plantilla no esta disponible.");
    })
    .then(pPlantilla => {
      res.send(util.formatearMensaje("EXITO", "Actualizacion exitosa", pPlantilla));

    })
    .catch(pError => {
      res.status(412).send(util.formatearMensaje("ERROR", pError));
    })
  });

/**
  @apiVersion 1.0.0
  @apiGroup plantillas_formly
  @apiName Options plantillas_formly
  @api {options} /api/v1/plantillasFormly/plantillas_formly Extrae formly de plantillas_formly

  @apiDescription Options de plantillas_formly

  @apiSuccess (Respuesta) {Texto} key Llave para el campo
  @apiSuccess (Respuesta) {Texto} type Tipo de etiqueta este puede ser input, select, datepicker, etc
  @apiSuccess (Respuesta) {Objeto} templateOptions Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  [
    {
      "key": "id_plantillas_formly",
      "type": "input",
      "templateOptions": {
        "type": "number",
        "label": "Id plantillas_formly",
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
app.options('/api/v1/plantillasFormly/plantilla_formly', sequelizeFormly.formly(plantilla_formly, app.src.db.models));

};
