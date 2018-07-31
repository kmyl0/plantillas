const options = require('sequelize-formly');
import sequelizeHandlers from 'sequelize-handlers';
const util = require('../../lib/util');
module.exports = app => {

  const Rol = app.src.db.models.rol;
  const UsuarioRol= app.src.db.models.usuario_rol;
  const sequelize = app.src.db.sequelize;

  /**
   * @apiVersion 1.0.0
   * @apiGroup rol
   * @apiName OptionsRoles
   * @api {options} /api/v1/seguridad/rol Options
   *
   * @apiDescription Para devolver el options de Rol
   *
   * @apiParam {Ninguno} Sin Parámetros
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   *   [
   *     {
   *       "key": "id_rol",
   *       "type": "input",
   *       "templateOptions": {
   *         "type": "number",
   *         "label": "Id rol",
   *         "required": true
   *       }
   *     },
   *     {
   *       "key": "nombre",
   *       "type": "input",
   *       "templateOptions": {
   *         "type": "text",
   *         "label": "Rol",
   *         "required": true
   *       }
   *     },
   *     {
   *       "key": "descripcion",
   *       "type": "input",
   *       "templateOptions": {
   *         "type": "text",
   *         "label": "Descripción",
   *         "required": false
   *       }
   *     },
   *     {
   *       "key": "peso",
   *       "type": "input",
   *       "templateOptions": {
   *         "type": "number",
   *         "label": "Peso",
   *         "required": true
   *       }
   *     },
   *     {
   *       "key": "estado",
   *       "type": "input",
   *       "templateOptions": {
   *         "type": "text",
   *         "label": "Estado",
   *         "required": true
   *       }
   *     },
   *     {
   *       "key": "usuario_creacion",
   *       "type": "input",
   *       "templateOptions": {
   *         "type": "text",
   *         "label": "Usuario de creación",
   *         "required": true
   *       }
   *     },
   *     {
   *       "key": "usuario_modificacion",
   *       "type": "input",
   *       "templateOptions": {
   *         "type": "text",
   *         "label": "Usuario de modificación",
   *         "required": false
   *       }
   *     },
   *     {
   *       "key": "fecha_creacion",
   *       "type": "datepicker",
   *       "templateOptions": {
   *         "type": "datetime-local",
   *         "label": "fecha_creacion",
   *         "required": true
   *       }
   *     },
   *     {
   *       "key": "fecha_modificacion",
   *       "type": "datepicker",
   *       "templateOptions": {
   *         "type": "datetime-local",
   *         "label": "fecha_modificacion",
   *         "required": true
   *       }
   *     }
   *   ]
   *
   */
  app.route('/api/v1/seguridad/rol').options(options.formly(Rol, app.src.db.models));

  /**

  @apiVersion 1.0.0
  @apiGroup rol
  @apiName Get rol/:id
	@api {get} /api/v1/seguridad/rol/:id Obtiene un rol

  @apiDescription Get para rol, obtiene la información sobre un rol basado en su id.

  @apiParam (Parametro) {Numerico} id Identificador de rol que se quiere obtener.

  @apiSuccess (Respuesta) {Numerico} id_rol Identificador del rol.
  @apiSuccess (Respuesta) {Texto} nombre Nombre del rol.
  @apiSuccess (Respuesta) {Texto} descripcion Descripcion del rol.
  @apiSuccess (Respuesta) {Numerico} peso Peso del rol.
  @apiSuccess (Respuesta) {Texto} estado Estado por defecto ACTIVO.
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creacion del rol.
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador de usuario creador.
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificacion del rol.
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario que modifica.

	@apiSuccessExample {json} Respuesta :
	    HTTP/1.1 200 OK
      {
      "id_rol": 1,
      "nombre": "ADMIN",
      "descripcion": "Administrador",
      "peso": 0,
      "estado": "ACTIVO",
      "_usuario_creacion": 1,
      "_usuario_modificacion": 2,
      "_fecha_creacion": "2016-09-02T15:09:16.415Z",
      "_fecha_modificacion": "2016-09-02T15:09:16.415Z"
      }
	*/
  app.get('/api/v1/seguridad/rol/:id', sequelizeHandlers.get(Rol));

  /**
  @apiVersion 1.0.0
  @apiGroup rol
  @apiName Get rol
	@api {get} /api/v1/seguridad/rol Obtiene listado de roles

  @apiDescription Get para rol, obtiene todos los datos del modelo rol.

    @apiSuccessExample {Array} Respuesta :
        HTTP/1.1 200 OK
        [
          {
            "id_rol": 1,
            "nombre": "ADMIN",
            "descripcion": "Administrador",
            "peso": 0,
            "estado": "ACTIVO",
            "_usuario_creacion": 1,
            "_usuario_modificacion": 2,
            "_fecha_creacion": "2016-09-02T15:09:16.415Z",
            "_fecha_modificacion": "2016-09-02T15:09:16.415Z"
          },
          ...

        ]
	*/
  /**
  @apiVersion 1.0.0
  @apiGroup rol
  @apiName Get rol/?order=&limit=&page=&filter=
	@api {get} /api/v1/seguridad/rol/?order=&limit=&page=&filter=  Obtiene la lista paginada de roles

  @apiDescription Get para rol, obtiene todos los datos del modelo rol.

  @apiParam (Query) {Texto} order Campo por el cual se ordenara el resultado
  @apiParam (Query) {Numerico} limit Cantidad de resultados a obtener
  @apiParam (Query) {Numerico} page Número de página de resultados
  @apiParam (Query) {Texto} filter Texto a buscar en los registros

    @apiSuccessExample {Array} Respuesta :
        HTTP/1.1 200 OK
      {
          "count":3,
          "results":[
            {
              "id_rol": 2,
              "nombre": "INSPECTOR DE BIENES",
              "descripcion": "Inspector de bienes",
              "peso": 5,
              "estado": "ACTIVO",
              "_usuario_creacion": 1,
              "_usuario_modificacion": 2,
              "_fecha_creacion": "2016-09-02T15:09:16.415Z",
              "_fecha_modificacion": "2016-09-02T15:09:16.415Z"
            },
            ...

          ]
      }
	*/
  app.get('/api/v1/seguridad/rol/', sequelizeHandlers.query(Rol));


  /**
    @apiVersion 1.0.0
    @apiGroup rol
    @apiName Post rol
    @api {post} /api/v1/seguridad/rol Crear rol

    @apiDescription Post para rol

    @apiParam (Peticion) {Texto} nombre Nombre de rol.
    @apiParam (Peticion) {Texto} descripcion Descripcion del rol.
    @apiParam (Peticion) {Numerico} peso Peso del rol.
    @apiParam (Peticion) {Texto} estado Estado del rol.
    @apiParam (Peticion) {Fecha} _fecha_creacion Fecha de creacion del registro.
    @apiParam (Peticion) {Numerico} _usuario_creacion Identificador del usuario que esta creando.

    @apiParamExample {json} Ejemplo para enviar:
    {
        "nombre":"tester",
        "descripcion":"Rol destinado al tester",
        "peso":0,
        "estado":"ACTIVO",
        "_usuario_creacion":1
    }

    @apiSuccess (Respuesta) {Numerico} id_departamento Identificador del rol.
    @apiSuccess (Respuesta) {Texto} codigo Código del rol.
    @apiSuccess (Respuesta) {Texto} descripcion Descripción del rol.
    @apiSuccess (Respuesta) {Texto} estado Estado por defecto ACTIVO.
    @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación del rol.
    @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador de usuario creador.
    @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificacion del rol.
    @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario que modifica.

    @apiSuccessExample Respuesta:
      HTTP/1.1 200 OK
      {
        "id_rol": 6,
        "nombre": "tester",
        "descripcion": "Rol destinado al tester",
        "peso": 0,
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_fecha_modificacion": "2016-09-05T14:19:12.841Z",
        "_fecha_creacion": "2016-09-05T14:19:12.841Z",
        "_usuario_modificacion": null
      }

  */
  app.post('/api/v1/seguridad/rol', sequelizeHandlers.create(Rol));

  /**
  @apiVersion 1.0.0
  @apiGroup rol
  @apiName Put rol
  @api {put} /api/v1/seguridad/rol/:id Actualiza un rol

  @apiDescription Put para rol

  @apiParam (Parametro) {Numerico} id Identificador del rol que se quiere actualizar

  @apiParam (Peticion) {Texto} nombre Nombre del rol
  @apiParam (Peticion) {Texto} descripcion Descripción del rol  
  @apiParam (Peticion) {Numerico} _usuario_modificacion Identificador del usuario que esta modificando

  @apiParamExample {json} Ejemplo para enviar:
  {
    "nombre":"tester_up",
    "descripcion":"Rol destinado al tester updated",
    "_usuario_modificacion": 2
  }

  @apiSuccess (Respuesta) {Numerico} id_rol Identificador del rol.
  @apiSuccess (Respuesta) {Texto} nombre Nombre del rol.
  @apiSuccess (Respuesta) {Texto} descripcion Descripcion del rol.
  @apiSuccess (Respuesta) {Texto} estado Estado por defecto ACTIVO.
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador de usuario creador.
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario que modifica.
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creacion.
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificacion.

  @apiSuccessExample {json} Respuesta del Ejemplo:
      HTTP/1.1 200 OK
      {
        "id_rol": 6,
        "nombre": "tester_up",
        "descripcion": "Rol destinado al tester updated",
        "peso": 0,
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_usuario_modificacion": null,
        "_fecha_creacion": "2016-09-05T14:19:12.841Z",
        "_fecha_modificacion": "2016-09-05T14:36:26.453Z"
      }

  @apiSampleRequest off

  */
  app.put('/api/v1/seguridad/rol/:id', sequelizeHandlers.update(Rol));



  /**
  @apiVersion 1.0.0
  @apiGroup rol
  @apiName Delete rol
  @api {delete} /api/v1/seguridad/rol/:id Eliminar un rol

  @apiDescription Delete para rol

  @apiParam (Parametro) {Numerico} id Identificador de rol que se quiere eliminar.

  @apiSuccessExample {json} Respuesta:
      HTTP/1.1 200 OK
      {
      }
  */

  app.delete('/api/v1/seguridad/rol/:id',(req,res) => {
    const idRol=req.params.id;

    // Busca en "usuario_rol".
    UsuarioRol.findAll({where:{fid_rol:idRol}})
    .then(resultado => {
      console.log("Verificando el resultado de la busqueda", resultado.length);
       // Si la longitud del vector resultante es mayor a 0. Significa que el rol esta siendo usado.
      if(resultado.length>0){
        res.status(405).send(util.formatearMensaje("ERROR","No se puede eliminar el rol, el mismo esta siendo usado actualmente."));
      }

      // Si la longitud del vector resultante es 0. El rol no es usado.
      else{
        // Elimina el Rol.
        Rol.destroy({where:{ id_rol:idRol}})
        .then((resultado) => {
          // Si el resultado de registros eliminados es 0.
          if(resultado==0) resultado=" 0, El rol a eliminar no existe.";
          res.status(200).send(util.formatearMensaje("EXITO", `Registros elimnados ${resultado}`));
        })
        .catch((error) => {
          console.log("Error en la eliminacion", error);
          res.status(412).send(util.formatearMensaje("ERROR",error));
        })

      }
    })
    .catch(error => {
      console.log("Error al buscar las relaciones de roles",error);
      res.status(412).send(util.formatearMensaje("ERROR",error));
    })

  });

}
