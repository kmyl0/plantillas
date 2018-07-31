import sequelizeHandlers from "sequelize-handlers";
import sequelizeFormly from "sequelize-formly";

module.exports = app => {
  const notificacion = app.src.db.models.notificacion;

/**
  @apiVersion 1.0.0
  @apiGroup notificacion notificacion
  @apiName Post notificacion
  @api {post} /api/v1/notificacion/notificacion Crear notificacion

  @apiDescription Post para notificacion

  @apiParam (Peticion) {Texto} campo Descripción del campo
  @apiParam (Peticion) {Numerico} _usuario_creacion Identificador del usuario que esta creando

  @apiParamExample {json} Ejemplo para enviar:
  {
    "campo": "xxx",
    "_usuario_creacion": "1"
  }

  @apiSuccess (Respuesta) {Numerico} id_notificacion Identificador de notificacion
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de notificacion
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de notificacion

  @apiSuccessExample {json} Respuesta del Ejemplo:
  HTTP/1.1 200 OK
  {
    "tipoMensaje":"EXITO",
    "mensaje":"La operación se realizó correctamente.",
    "datos":{
      "id_notificacion": "1",
      "campo": "xxx",
      "_usuario_creacion": "1",
      "_fecha_creacion": " << fecha y hora actual >> ",
      "_fecha_modificacion": " << fecha y hora actual >> "
    }
  }

  @apiSampleRequest off
*/
  // app.post('/api/v1/notificacion/notificacion', sequelizeHandlers.create(notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion notificacion
  @apiName Get notificacion/:id
  @api {get} /api/v1/notificacion/notificacion/:id Obtiene un/a notificacion

  @apiDescription Get notificacion, obtiene un/a notificacion

  @apiParam (Parametro) {Numerico} id Identificador de notificacion que se quiere obtener

  @apiSuccess (Respuesta) {Numerico} id_notificacion Identificador de notificacion
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de notificacion
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de notificacion

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "id_notificacion": "1",
      "campo": "xxx",
      "_usuario_creacion": "1",
      "_fecha_creacion": " << fecha y hora >> ",
      "_fecha_modificacion": " << fecha y hora >> "
    }

  }
*/
  // app.get('/api/v1/notificacion/notificacion/:id', sequelizeHandlers.get(notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion notificacion
  @apiName Get notificacion
  @api {get} /api/v1/notificacion/notificacion/ Obtiene la lista completa de notificacion

  @apiDescription Get notificacion

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos": {
      "total": 21,
      "resultado":[
        {
          "id_notificacion": "1",
          "campo": "xxx",
          "_usuario_creacion": "1",
          "_fecha_creacion": " << fecha y hora >> ",
          "_fecha_modificacion": " << fecha y hora >> "
        },
        {
          "id_notificacion": "2",
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
  @apiGroup notificacion notificacion
  @apiName Get notificacion/?order=&limit=&page=&filter=
  @api {get} /api/v1/notificacion/notificacion/?order=&limit=&page=&filter= Obtiene la lista paginada de notificacion

  @apiDescription Get notificacion

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
            "id_notificacion": 1,
            "codigo": "CI",
            "descripcion": "Carnet de identidad",
            "estado": "ACTIVO",
            "_usuario_creacion": 5,
            "_usuario_modificacion": null,
            "_fecha_creacion": "2016-08-29T13:59:22.788Z",
            "_fecha_modificacion": "2016-08-29T13:59:22.788Z"
          },
          {
            "id_notificacion": 2,
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
  // app.get('/api/v1/notificacion/notificacion', sequelizeHandlers.query(notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion notificacion
  @apiName Delete notificacion
  @api {delete} /api/v1/notificacion/notificacion/:id Elimina un/a notificacion

  @apiDescription Delete notificacion

  @apiParam (Parametro) {Numerico} id Identificador de notificacion que se quiere eliminar

  @apiSuccessExample {json} Respuesta:
      HTTP/1.1 200 OK
    {

    }
*/
  // app.delete('/api/v1/notificacion/notificacion/:id', sequelizeHandlers.remove(notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion notificacion
  @apiName Put notificacion
  @api {put} /api/v1/notificacion/notificacion/:id Actualiza un/a notificacion

  @apiDescription Put notificacion

  @apiParam (Parametro) {Numerico} id Identificador de notificacion que se quiere actualizar

  @apiParam (Peticion) {Texto} campo Decripción del campo

  @apiParamExample {json} Ejemplo para enviar:
  {
    "campo": "yyy",
  }

  @apiSuccess (Respuesta) {Numerico} id_notificacion Identificador de notificacion
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creacion de notificacion
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificacion de notificacion

  @apiSuccessExample {json} Respuesta del Ejemplo:
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "La operación se realizó correctamente.",
    "datos":{
      "id_notificacion": "1",
      "campo": "yyy",
      "_usuario_creacion": "1",
      "_fecha_creacion": " << fecha y hora >>",
      "_fecha_modificacion": " << fecha y hora actual >> "
    }

  }

  @apiSampleRequest off
*/
  // app.put('/api/v1/notificacion/notificacion/:id', sequelizeHandlers.update(notificacion));

/**
  @apiVersion 1.0.0
  @apiGroup notificacion notificacion
  @apiName Options notificacion
  @api {options} /api/v1/notificacion/notificacion Extrae formly de notificacion

  @apiDescription Options de notificacion

  @apiSuccess (Respuesta) {Texto} key Llave para el campo
  @apiSuccess (Respuesta) {Texto} type Tipo de etiqueta este puede ser input, select, datepicker, etc
  @apiSuccess (Respuesta) {Objeto} templateOptions Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  [
    {
      "key": "id_notificacion",
      "type": "input",
      "templateOptions": {
        "type": "number",
        "label": "Id notificacion",
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
  // app.options('/api/v1/notificacion/notificacion', sequelizeFormly.formly(notificacion, app.src.db.models));
};
