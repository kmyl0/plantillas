import sequelizeHandlers from "sequelize-handlers";
import sequelizeFormly from "sequelize-formly";

module.exports = app => {
  const conf_notificacion = app.src.db.models.conf_notificacion;

/**
  @apiVersion 1.0.0
  @apiGroup notificacion conf_notificacion
  @apiName Post conf_notificacion
  @api {post} /api/v1/notificacion/conf_notificacion Crear conf_notificacion

  @apiDescription Post para conf_notificacion

  @apiParam (Peticion) {Texto} campo Descripción del campo
  @apiParam (Peticion) {Numerico} _usuario_creacion Identificador del usuario que esta creando

  @apiParamExample {json} Ejemplo para enviar:
  {
    "campo": "xxx",
    "_usuario_creacion": "1"
  }

  @apiSuccess (Respuesta) {Numerico} id_conf_notificacion Identificador de conf_notificacion
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de conf_notificacion
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de conf_notificacion

  @apiSuccessExample {json} Respuesta del Ejemplo:
  HTTP/1.1 200 OK
  {
    "tipoMensaje":"EXITO",
    "mensaje":"La operación se realizó correctamente.",
    "datos":{
      "id_conf_notificacion": "1",
      "campo": "xxx",
      "_usuario_creacion": "1",
      "_fecha_creacion": " << fecha y hora actual >> ",
      "_fecha_modificacion": " << fecha y hora actual >> "
    }
  }

  @apiSampleRequest off
*/
  // app.post('/api/v1/notificacion/conf_notificacion', sequelizeHandlers.create(conf_notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion conf_notificacion
  @apiName Get conf_notificacion/:id
  @api {get} /api/v1/notificacion/conf_notificacion/:id Obtiene un/a conf_notificacion

  @apiDescription Get conf_notificacion, obtiene un/a conf_notificacion

  @apiParam (Parametro) {Numerico} id Identificador de conf_notificacion que se quiere obtener

  @apiSuccess (Respuesta) {Numerico} id_conf_notificacion Identificador de conf_notificacion
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de conf_notificacion
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de conf_notificacion

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "id_conf_notificacion": "1",
      "campo": "xxx",
      "_usuario_creacion": "1",
      "_fecha_creacion": " << fecha y hora >> ",
      "_fecha_modificacion": " << fecha y hora >> "
    }

  }
*/
  // app.get('/api/v1/notificacion/conf_notificacion/:id', sequelizeHandlers.get(conf_notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion conf_notificacion
  @apiName Get conf_notificacion
  @api {get} /api/v1/notificacion/conf_notificacion/ Obtiene la lista completa de conf_notificacion

  @apiDescription Get conf_notificacion

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "total": 21,
      "resultado":[
        {
          "id_conf_notificacion": "1",
          "campo": "xxx",
          "_usuario_creacion": "1",
          "_fecha_creacion": " << fecha y hora >> ",
          "_fecha_modificacion": " << fecha y hora >> "
        },
        {
          "id_conf_notificacion": "2",
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
  @apiGroup notificacion conf_notificacion
  @apiName Get conf_notificacion/?order=&limit=&page=&filter=
  @api {get} /api/v1/notificacion/conf_notificacion/?order=&limit=&page=&filter= Obtiene la lista paginada de conf_notificacion

  @apiDescription Get conf_notificacion

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
            "id_conf_notificacion": 1,
            "codigo": "CI",
            "descripcion": "Carnet de identidad",
            "estado": "ACTIVO",
            "_usuario_creacion": 5,
            "_usuario_modificacion": null,
            "_fecha_creacion": "2016-08-29T13:59:22.788Z",
            "_fecha_modificacion": "2016-08-29T13:59:22.788Z"
          },
          {
            "id_conf_notificacion": 2,
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
  app.get('/api/v1/notificacion/conf_notificacion', sequelizeHandlers.query(conf_notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion conf_notificacion
  @apiName Delete conf_notificacion
  @api {delete} /api/v1/notificacion/conf_notificacion/:id Elimina un/a conf_notificacion

  @apiDescription Delete conf_notificacion

  @apiParam (Parametro) {Numerico} id Identificador de conf_notificacion que se quiere eliminar

  @apiSuccessExample {json} Respuesta:
      HTTP/1.1 200 OK
    {

    }
*/
  // app.delete('/api/v1/notificacion/conf_notificacion/:id', sequelizeHandlers.remove(conf_notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion conf_notificacion
  @apiName Put conf_notificacion
  @api {put} /api/v1/notificacion/conf_notificacion/:id Actualiza un/a conf_notificacion

  @apiDescription Put conf_notificacion

  @apiParam (Parametro) {Numerico} id Identificador de conf_notificacion que se quiere actualizar

  @apiParam (Peticion) {Texto} campo Decripción del campo

  @apiParamExample {json} Ejemplo para enviar:
  {
    "campo": "yyy",
  }

  @apiSuccess (Respuesta) {Numerico} id_conf_notificacion Identificador de conf_notificacion
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creacion de conf_notificacion
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificacion de conf_notificacion

  @apiSuccessExample {json} Respuesta del Ejemplo:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos":{
      "id_conf_notificacion": "1",
      "campo": "yyy",
      "_usuario_creacion": "1",
      "_fecha_creacion": " << fecha y hora >>",
      "_fecha_modificacion": " << fecha y hora actual >> "
    }

  }

  @apiSampleRequest off
*/
  app.put('/api/v1/notificacion/conf_notificacion/:id', sequelizeHandlers.update(conf_notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion conf_notificacion
  @apiName Options conf_notificacion
  @api {options} /api/v1/notificacion/conf_notificacion Extrae formly de conf_notificacion

  @apiDescription Options de conf_notificacion

  @apiSuccess (Respuesta) {Texto} key Llave para el campo
  @apiSuccess (Respuesta) {Texto} type Tipo de etiqueta este puede ser input, select, datepicker, etc
  @apiSuccess (Respuesta) {Objeto} templateOptions Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  [
    {
      "key": "id_conf_notificacion",
      "type": "input",
      "templateOptions": {
        "type": "number",
        "label": "Id conf_notificacion",
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
  app.options('/api/v1/notificacion/conf_notificacion', sequelizeFormly.formly(conf_notificacion, app.src.db.models));
};
