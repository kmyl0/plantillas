define({ "api": [
  {
    "version": "1.0.0",
    "group": "Roles_Menus",
    "name": "Get_rol_menu",
    "type": "get",
    "url": "/api/v1/seguridad/rol/:idRol/menu",
    "title": "Obtiene los roles_menus para un rol.",
    "description": "<p>Get para rol-menu, obtiene los menus asignados a un determinado rol.</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "idRol",
            "description": "<p>Identificador del rol sobre el cual se quiere obtener los menus.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_rol_menu",
            "description": "<p>Identificador del rol-menu.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "fid_rol",
            "description": "<p>Identificador del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "fid_menu",
            "description": "<p>Identificador del menu.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado por defecto ACTIVO.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que modifica.</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación..</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta :",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id_rol_menu\": 1,\n    \"fid_rol\": 1,\n    \"fid_menu\": 2,\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": 1,\n    \"_fecha_creacion\": \"2016-12-19T18:51:02.935Z\",\n    \"_fecha_modificacion\": \"2016-12-19T18:51:02.935Z\"\n  },\n  {\n    \"id_rol_menu\": 2,\n    \"fid_rol\": 1,\n    \"fid_menu\": 3,\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": 1,\n    \"_fecha_creacion\": \"2016-12-19T18:51:02.935Z\",\n    \"_fecha_modificacion\": \"2016-12-19T18:51:02.935Z\"\n  }, .....\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/rol_menuRT.js",
    "groupTitle": "Roles_Menus"
  },
  {
    "version": "1.0.0",
    "group": "Roles_Menus",
    "name": "Post_rol_menu",
    "type": "post",
    "url": "/api/v1/seguridad/rol/0/menu",
    "title": "Crea los roles_menus para un rol.",
    "description": "<p>Post para rol-menu.</p>",
    "parameter": {
      "fields": {
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Objeto",
            "optional": false,
            "field": "rol",
            "description": "<p>Objeto con informacion sobre el rol a crear.</p>"
          },
          {
            "group": "Peticion",
            "type": "Vector",
            "optional": false,
            "field": "menus",
            "description": "<p>Vector con informacion de los menus asignados para el rol a crear.</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>descripcion del rol a crear.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "peso",
            "description": "<p>Peso del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"rol\":{\n    \"nombre\" : Test,\n    \"descripcion\" : Rol asignado para el equipo de QA,\n    \"peso\" : 5,\n    \"estado\" : ACTIVO,\n    \"_usuario_creacion\" : 1\n  },\n  \"menus\" : [2,4,5,6,8,9,10]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta :",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/rol_menuRT.js",
    "groupTitle": "Roles_Menus"
  },
  {
    "version": "1.0.0",
    "group": "Roles_Menus",
    "name": "Put_rol_menu",
    "type": "put",
    "url": "/api/v1/seguridad/rol/:idRol/menu",
    "title": "Actualiza los roles_menus para un rol.",
    "description": "<p>Put para rol-menu.</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "idRol",
            "description": "<p>Identificador del rol sobre el cual se quiere obtener los menus.</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Objeto",
            "optional": false,
            "field": "rol",
            "description": "<p>Objeto con informacion sobre el rol que se quiere actualizar.</p>"
          },
          {
            "group": "Peticion",
            "type": "Objeto",
            "optional": false,
            "field": "menus",
            "description": "<p>Objeto con informacion sobre los menus a mantener e inactivar.</p>"
          },
          {
            "group": "Peticion",
            "type": "Vector",
            "optional": false,
            "field": "menus_nuevos",
            "description": "<p>Vector con informacion de los nuevos menus asignados para el rol a crear.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "id_rol",
            "description": "<p>Identificador del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>descripcion del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "peso",
            "description": "<p>Peso del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>informacion del estado del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que modifica.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "fid_rol_menu",
            "description": "<p>Identificador del rol-menu.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "fid_rol",
            "description": "<p>Identificador del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "fid_menu",
            "description": "<p>Identificador del menu.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"rol\" : {\n    \"id_rol\" : 7,\n    \"nombre\" : \"QA\",\n    \"descripcion\" : \"Rol asignado para el equipo de QA\",\n    \"peso\" : 5,\n    \"estado\" : \"ACTIVO\",\n    \"_usuario_modificacion\" : 1\n  },\n  \"menus\" : [\n    {\n      \"id_rol_menu\" : 36,\n      \"fid_rol\" : 7,\n      \"fid_menu\" : 2,\n      \"estado\" : \"ACTIVO\",\n      \"_usuario_creacion\" : 1,\n      \"_usuario_modificacion\" : 1\n    },\n    {\n      \"id_rol_menu\" : 37,\n      \"fid_rol\" : 7,\n      \"fid_menu\" : 4,\n      \"estado\" : \"INACTIVO\",\n      \"_usuario_creacion\" : 1,\n      \"_usuario_modificacion\" : 1\n    }\n  ],\n  \"menus_nuevos\" : [8,9]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta :",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/rol_menuRT.js",
    "groupTitle": "Roles_Menus"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/autenticar",
    "title": "Retorna un token, con cierto cifrado para la autenticación de peticiones.",
    "group": "Seguridad",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "retorna",
            "description": "<p>un jwt</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "\nHTTP/1.1 200 OK\n\n{  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjoxLCJ1c3VhcmlvIjoiYWRtaW4ifQ.XaaEKFFndFq_LhizdJU-3lLIBRVUxra-LceHb6R57sc\"  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/jwtokenRT.js",
    "groupTitle": "Seguridad",
    "name": "PostAutenticar"
  },
  {
    "version": "1.0.0",
    "group": "auth_user",
    "name": "Delete_auth_user",
    "type": "delete",
    "url": "/api/v1/seguridad/auth_user/:id",
    "title": "Elimina un/a auth_user",
    "description": "<p>Delete auth_user</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de auth_user que se quiere eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "  HTTP/1.1 200 OK\n{\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/auth_userRT.js",
    "groupTitle": "auth_user"
  },
  {
    "version": "1.0.0",
    "group": "auth_user",
    "name": "Get_auth_user",
    "type": "get",
    "url": "/api/v1/seguridad/auth_user/",
    "title": "Obtiene la lista completa de auth_user",
    "description": "<p>Get auth_user</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"total\": 21,\n    \"resultado\":[\n      {\n        \"id\": 1,\n        \"password\": \"\",\n        \"last_login\": null,\n        \"is_superuser\": false,\n        \"username\": \"cgii\",\n        \"first_name\": \"cgii\",\n        \"last_name\": \"cgii\",\n        \"email\": \"cgii@agetic.gob.bo\",\n        \"is_staff\": false,\n        \"is_active\": true,\n        \"date_joined\": \"2016-10-25T19:10:56.010Z\",\n        \"cargo\": null,\n        \"ci\": null,\n        \"habilitado_marcar\": false,\n        \"cas\": null,\n        \"fecha_asignacion\": null,\n        \"nro_item\": null,\n        \"unidad_dependencia\": null\n      },\n      {\n        \"id\": 2,\n        \"password\": \"\",\n        \"last_login\": null,\n        \"is_superuser\": false,\n        \"username\": \"ctic\",\n        \"first_name\": \"ctic\",\n        \"last_name\": \"ctic\",\n        \"email\": \"ctic@agetic.gob.bo\",\n        \"is_staff\": false,\n        \"is_active\": true,\n        \"date_joined\": \"2016-10-25T19:10:56.032Z\",\n        \"cargo\": \"Consejo de Técnologias de Información y Comunicacion\",\n        \"ci\": null,\n        \"habilitado_marcar\": false,\n        \"cas\": null,\n        \"fecha_asignacion\": null,\n        \"nro_item\": null,\n        \"unidad_dependencia\": null\n      }, ...\n    ]\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/auth_userRT.js",
    "groupTitle": "auth_user"
  },
  {
    "version": "1.0.0",
    "group": "auth_user",
    "name": "Get_auth_user__id",
    "type": "get",
    "url": "/api/v1/seguridad/auth_user/:id",
    "title": "Obtiene un/a auth_user",
    "description": "<p>Get auth_user, obtiene un/a auth_user</p>",
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de auth_user</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña de auth_user</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "is_superuser",
            "description": "<p>Indica si es superusuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "first_name",
            "description": "<p>Nombres</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "last_name",
            "description": "<p>Apellidos</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "email",
            "description": "<p>Correo electronico</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "is_staff",
            "description": "<p>Indica si pertenece al staff</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "is_active",
            "description": "<p>Indica si esta activo</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "date_joined",
            "description": "<p>Fecha de ingreso</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "habilitado_marcar",
            "description": "<p>Indica si esta habilitado para marcación</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "last_login",
            "description": "<p>Ultima conexion</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "cargo",
            "description": "<p>Cargo actual</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "ci",
            "description": "<p>Número de documento de identidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "cas",
            "description": "<p>Años de antigúedad</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "fecha_asignacion",
            "description": "<p>Fecha de asignación</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "nro_item",
            "description": "<p>Número de ítem</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "unidad_dependencia",
            "description": "<p>Unidad a la que pertenece</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_auth_user\": \"1\",\n    \"campo\": \"xxx\",\n    \"_usuario_creacion\": \"1\",\n    \"_fecha_creacion\": \" << fecha y hora >> \",\n    \"_fecha_modificacion\": \" << fecha y hora >> \"\n  }\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/auth_userRT.js",
    "groupTitle": "auth_user"
  },
  {
    "version": "1.0.0",
    "group": "auth_user",
    "name": "Get_auth_user__order__limit__page__filter_",
    "type": "get",
    "url": "/api/v1/seguridad/auth_user/?order=&limit=&page=&filter=",
    "title": "Obtiene la lista paginada de auth_user",
    "description": "<p>Get auth_user</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "order",
            "description": "<p>Campo por el cual se ordenará el resultado</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de resultados a obtener</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "page",
            "description": "<p>Número de página de resultados</p>"
          },
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "filter",
            "description": "<p>Texto a buscar en los registros</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "tipoMensaje",
            "description": "<p>Tipo del mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "datos",
            "description": "<p>Objeto de con los datos de respuesta</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "total",
            "description": "<p>Numero de objetos categoria</p>"
          },
          {
            "group": "Respuesta",
            "type": "Array",
            "optional": false,
            "field": "resultado",
            "description": "<p>Array de objetos categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"total\": 21,\n    \"resultado\":[\n      {\n        \"id\": 1,\n        \"password\": \"\",\n        \"last_login\": null,\n        \"is_superuser\": false,\n        \"username\": \"cgii\",\n        \"first_name\": \"cgii\",\n        \"last_name\": \"cgii\",\n        \"email\": \"cgii@agetic.gob.bo\",\n        \"is_staff\": false,\n        \"is_active\": true,\n        \"date_joined\": \"2016-10-25T19:10:56.010Z\",\n        \"cargo\": null,\n        \"ci\": null,\n        \"habilitado_marcar\": false,\n        \"cas\": null,\n        \"fecha_asignacion\": null,\n        \"nro_item\": null,\n        \"unidad_dependencia\": null\n      },\n      {\n        \"id\": 2,\n        \"password\": \"\",\n        \"last_login\": null,\n        \"is_superuser\": false,\n        \"username\": \"ctic\",\n        \"first_name\": \"ctic\",\n        \"last_name\": \"ctic\",\n        \"email\": \"ctic@agetic.gob.bo\",\n        \"is_staff\": false,\n        \"is_active\": true,\n        \"date_joined\": \"2016-10-25T19:10:56.032Z\",\n        \"cargo\": \"Consejo de Técnologias de Información y Comunicacion\",\n        \"ci\": null,\n        \"habilitado_marcar\": false,\n        \"cas\": null,\n        \"fecha_asignacion\": null,\n        \"nro_item\": null,\n        \"unidad_dependencia\": null\n      }, ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/auth_userRT.js",
    "groupTitle": "auth_user"
  },
  {
    "version": "1.0.0",
    "group": "auth_user",
    "name": "Options_auth_user",
    "type": "options",
    "url": "/api/v1/seguridad/auth_user",
    "title": "Extrae formly de auth_user",
    "description": "<p>Options de auth_user</p>",
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "key",
            "description": "<p>Llave para el campo</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de etiqueta este puede ser input, select, datepicker, etc</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "templateOptions",
            "description": "<p>Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"key\": \"id_auth_user\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"number\",\n      \"label\": \"Id auth_user\",\n      \"required\": true\n    },\n  },\n  {\n    \"key\": \"campo\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"Campo\",\n      \"required\": true\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/auth_userRT.js",
    "groupTitle": "auth_user"
  },
  {
    "version": "1.0.0",
    "group": "auth_user",
    "name": "Post_auth_user",
    "type": "post",
    "url": "/api/v1/seguridad/auth_user",
    "title": "Crear auth_user",
    "description": "<p>Post para auth_user</p>",
    "parameter": {
      "fields": {
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "campo",
            "description": "<p>Descripción del campo</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario que esta creando</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n\t\"password\":\"''\",\n\t\"is_superuser\":false,\n\t\"username\":\"ctest\",\n\t\"first_name\":\"create\",\n\t\"last_name\":\"test\",\n\t\"email\":\"ctest@agetic.gob.bo\",\n\t\"is_staff\":false,\n\t\"is_active\":true,\n\t\"date_joined\":\"2016-12-22\",\n\t\"habilitado_marcar\":true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de auth_user</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña de auth_user</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "is_superuser",
            "description": "<p>Indica si es superusuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "first_name",
            "description": "<p>Nombres</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "last_name",
            "description": "<p>Apellidos</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "email",
            "description": "<p>Correo electronico</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "is_staff",
            "description": "<p>Indica si pertenece al staff</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "is_active",
            "description": "<p>Indica si esta activo</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "date_joined",
            "description": "<p>Fecha de ingreso</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "habilitado_marcar",
            "description": "<p>Indica si esta habilitado para marcación</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "last_login",
            "description": "<p>Ultima conexion</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "cargo",
            "description": "<p>Cargo actual</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "ci",
            "description": "<p>Número de documento de identidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "cas",
            "description": "<p>Años de antigúedad</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "fecha_asignacion",
            "description": "<p>Fecha de asignación</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "nro_item",
            "description": "<p>Número de ítem</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "unidad_dependencia",
            "description": "<p>Unidad a la que pertenece</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id\": 300,\n    \"password\": \"''\",\n    \"is_superuser\": false,\n    \"username\": \"ctest\",\n    \"first_name\": \"create\",\n    \"last_name\": \"test\",\n    \"email\": \"ctest@agetic.gob.bo\",\n    \"is_staff\": false,\n    \"is_active\": true,\n    \"date_joined\": \"2016-12-22T00:00:00.000Z\",\n    \"habilitado_marcar\": true,\n    \"last_login\": null,\n    \"cargo\": null,\n    \"ci\": null,\n    \"cas\": null,\n    \"fecha_asignacion\": null,\n    \"nro_item\": null,\n    \"unidad_dependencia\": null\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/auth_userRT.js",
    "groupTitle": "auth_user"
  },
  {
    "version": "1.0.0",
    "group": "auth_user",
    "name": "Put_auth_user",
    "type": "put",
    "url": "/api/v1/seguridad/auth_user/:id",
    "title": "Actualiza un/a auth_user",
    "description": "<p>Put auth_user</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de auth_user que se quiere actualizar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "first_name",
            "description": "<p>Nombres</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n\t\"first_name\":\"create\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de auth_user</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña de auth_user</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "is_superuser",
            "description": "<p>Indica si es superusuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "first_name",
            "description": "<p>Nombres</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "last_name",
            "description": "<p>Apellidos</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "email",
            "description": "<p>Correo electronico</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "is_staff",
            "description": "<p>Indica si pertenece al staff</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "is_active",
            "description": "<p>Indica si esta activo</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "date_joined",
            "description": "<p>Fecha de ingreso</p>"
          },
          {
            "group": "Respuesta",
            "type": "Boleano",
            "optional": false,
            "field": "habilitado_marcar",
            "description": "<p>Indica si esta habilitado para marcación</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "last_login",
            "description": "<p>Ultima conexion</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "cargo",
            "description": "<p>Cargo actual</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "ci",
            "description": "<p>Número de documento de identidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "cas",
            "description": "<p>Años de antigúedad</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "fecha_asignacion",
            "description": "<p>Fecha de asignación</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "nro_item",
            "description": "<p>Número de ítem</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "unidad_dependencia",
            "description": "<p>Unidad a la que pertenece</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id\": 200,\n    \"password\": \"''\",\n    \"last_login\": null,\n    \"is_superuser\": false,\n    \"username\": \"ctest\",\n    \"first_name\": \"create\",\n    \"last_name\": \"test\",\n    \"email\": \"ctest@agetic.gob.bo\",\n    \"is_staff\": false,\n    \"is_active\": true,\n    \"date_joined\": \"2016-12-22T00:00:00.000Z\",\n    \"cargo\": null,\n    \"ci\": null,\n    \"habilitado_marcar\": true,\n    \"cas\": null,\n    \"fecha_asignacion\": null,\n    \"nro_item\": null,\n    \"unidad_dependencia\": null\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/auth_userRT.js",
    "groupTitle": "auth_user"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Delete_documento",
    "type": "delete",
    "url": "/api/v1/plantillasFormly/documento/:id",
    "title": "Elimina un/a documento",
    "description": "<p>Delete documento</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de documento que se quiere eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "  HTTP/1.1 200 OK\n{\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Get_documento",
    "type": "get",
    "url": "/api/v1/plantillasFormly/documento/",
    "title": "Obtiene la lista completa de documento",
    "description": "<p>Get documento</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": " HTTP/1.1 200 OK\n {\n \"tipoMensaje\": \"EXITO\",\n \"mensaje\": \"La operación se realizó correctamente.\",\n \"datos\": {\n   \"total\": 2,\n   \"resultado\": [\n     {\n       \"id_documento\": 1,\n       \"nombre\": \"INSTRUCTIVO\",\n       \"plantilla\": \"[{\\\"type\\\":\\\"textoh2\\\",\\\"key\\\":\\\"textoh2\\\",\\\"className\\\":\\\"ap-text-center\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"INSTRUCTIVO\\\"}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"CITE:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"A:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"REF:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"datepicker\\\",\\\"key\\\":\\\"inputDatePicker\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"FECHA:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"textarea\\\",\\\"key\\\":\\\"inputTextArea\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"Contenido:\\\",\\\"rows\\\":6,\\\"grow\\\":false,\\\"required\\\":true}}]\",\n       \"plantilla_valor\": \"{\\\"input-0\\\":\\\"AGETIC/UAF/002/2016\\\",\\\"input-1\\\":\\\"Todo el personal de la AGETIC\\\",\\\"input-2\\\":\\\"SOLICITUD DE VIATICOS\\\",\\\"datepicker-0\\\":\\\"2016-12-01T04:00:00.000Z\\\",\\\"textarea-0\\\":\\\"Se comunica al personal de la Agencia de Gobierno Electrónico y Tecnologías de Información y Comunicación que sea declarado en Comisión de Viaje debe realizar los requerimientos de pasajes y viáticos por separado para facilitar el pago:\\\\n\\\\nPara pasajes: Señalar los nombres completos de los pasajeros, la cedula de identidad, el lugar, la fecha de ida y de retorno debidamente justificado. Adjuntar la reserva del pasaje con el precio referencial \\\\n\\\\nEjemplo: Soila Ana Vaca Rodríguez, C.I. 9999999 L.P. y Juan Carlos Perico Pericon C.I. 8888888 L.P. viajaran a Tarija el 9/02/2015 y regresaran 10/02/2015 para la instalación de la red en el SIN. \\\\n\\\\nPara viáticos: Llenar el formulario correspondiente adjuntando el Memorandum y la certificación presupuestaria . Para el calculo de pago de viatico se considera un importe bruto de Bs. 371.- por día  sujetos a retencion del 13% RC IVA (Excepto el Director General Ejecutivo)\\\\n\\\\nEs cuanto informo para fines consiguientes\\\\n\\\\n\\\\nLa Paz, 1 de diciembre de 2016\\\"}\",\n       \"estado\": \"ACTIVO\",\n       \"_usuario_creacion\": 1,\n       \"_usuario_modificacion\": 1,\n       \"_fecha_creacion\": \"2016-12-01T19:09:18.329Z\",\n       \"_fecha_modificacion\": \"2016-12-01T19:34:14.745Z\"\n     },\n     {\n       \"id_documento\": 2,\n       \"nombre\": \"CIRCULAR\",\n       \"plantilla\": \"[{\\\"type\\\":\\\"textoh1\\\",\\\"key\\\":\\\"textoh1\\\",\\\"className\\\":\\\"ap-text-center\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"CIRCULAR\\\"}},{\\\"type\\\":\\\"textoh3\\\",\\\"key\\\":\\\"textoh3\\\",\\\"className\\\":\\\"ap-text-center\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"AGETIC/UAF N°083/2016\\\"}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"DE:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"A:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"REF:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"datepicker\\\",\\\"key\\\":\\\"inputDatePicker\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"FECHA:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"parrafo\\\",\\\"key\\\":\\\"textParrafo\\\",\\\"className\\\":\\\"ap-text-justify\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"Dando cumplimiento a lo establecido en el Decreto Supremo N° 21531 de fecha 29 de junio de 1995 y la reglamentación relativa al Régimen Complementario al Impuesto al Valor Agregado (RC-IVA), así como la remisión del formulario 110 RC-IVA dependientes, todos los servidores públicos deben tomar en cuenta:\\\"}},{\\\"type\\\":\\\"parrafo\\\",\\\"key\\\":\\\"textParrafo\\\",\\\"className\\\":\\\"ap-text-justify\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"1. El formulario RC-IVA 110 debidamente llenado tanto para el pago de sueldos como para refrigerios deben ser presentados desde el 01 hasta el día 15 de cada mes o el siguiente día hábil en caso de ser fin de semana o feriado. \\\\n2. La elaboración de los formularios debe realizarse en el programa Facilito, el cual está instalado en todos los computadores.\\\"}},{\\\"type\\\":\\\"parrafo\\\",\\\"key\\\":\\\"textParrafo\\\",\\\"className\\\":\\\"ap-text-justify\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"La Unidad Administrativa Financiera mediante Recursos Humanos se pone a disposición de todos los funcionarios que tengan dudad o requieran mayor información a la presente circular.\\\"}},{\\\"type\\\":\\\"parrafo\\\",\\\"key\\\":\\\"textParrafo\\\",\\\"className\\\":\\\"ap-text-left\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"Atentamente,\\\"}}]\",\n       \"plantilla_valor\": \"{\\\"datepicker-0\\\":\\\"2016-12-01T04:00:00.000Z\\\",\\\"input-0\\\":\\\"Carmen Fedra Valverde\\\",\\\"input-1\\\":\\\"Todo el personal de planta de la Agencia de Gobierno Electronico y Tecnologías de Información y Comunicación\\\",\\\"input-2\\\":\\\"FORMULARIOS RC-IVA\\\"}\",\n       \"estado\": \"ACTIVO\",\n       \"_usuario_creacion\": 1,\n       \"_usuario_modificacion\": null,\n       \"_fecha_creacion\": \"2016-12-01T19:36:18.489Z\",\n       \"_fecha_modificacion\": \"2016-12-01T19:36:18.489Z\"\n     }\n   ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Get_documento__id",
    "type": "get",
    "url": "/api/v1/plantillasFormly/documento/:id",
    "title": "Obtiene un/a documento",
    "description": "<p>Get documento, obtiene un/a documento</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de documento que se quiere obtener</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_documento",
            "description": "<p>Identificador de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantilla del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valores de la plantilla</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del registro</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de documento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"tipoMensaje\": \"EXITO\",\n    \"mensaje\": \"La operación se realizó correctamente.\",\n    \"datos\": {\n      \"id_documento\": 1,\n      \"nombre\": \"INSTRUCTIVO\",\n      \"plantilla\": \"[{\\\"type\\\":\\\"textoh2\\\",\\\"key\\\":\\\"textoh2\\\",\\\"className\\\":\\\"ap-text-center\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"INSTRUCTIVO\\\"}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"CITE:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"A:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"REF:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"datepicker\\\",\\\"key\\\":\\\"inputDatePicker\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"FECHA:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"textarea\\\",\\\"key\\\":\\\"inputTextArea\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"Contenido:\\\",\\\"rows\\\":6,\\\"grow\\\":false,\\\"required\\\":true}}]\",\n      \"plantilla_valor\": \"{\\\"input-0\\\":\\\"AGETIC/UAF/002/2016\\\",\\\"input-1\\\":\\\"Todo el personal de la AGETIC\\\",\\\"input-2\\\":\\\"SOLICITUD DE VIATICOS\\\",\\\"datepicker-0\\\":\\\"2016-12-01T04:00:00.000Z\\\",\\\"textarea-0\\\":\\\"Se comunica al personal de la Agencia de Gobierno Electrónico y Tecnologías de Información y Comunicación que sea declarado en Comisión de Viaje debe realizar los requerimientos de pasajes y viáticos por separado para facilitar el pago:\\\\n\\\\nPara pasajes: Señalar los nombres completos de los pasajeros, la cedula de identidad, el lugar, la fecha de ida y de retorno debidamente justificado. Adjuntar la reserva del pasaje con el precio referencial \\\\n\\\\nEjemplo: Soila Ana Vaca Rodríguez, C.I. 9999999 L.P. y Juan Carlos Perico Pericon C.I. 8888888 L.P. viajaran a Tarija el 9/02/2015 y regresaran 10/02/2015 para la instalación de la red en el SIN. \\\\n\\\\nPara viáticos: Llenar el formulario correspondiente adjuntando el Memorandum y la certificación presupuestaria . Para el calculo de pago de viatico se considera un importe bruto de Bs. 371.- por día  sujetos a retencion del 13% RC IVA (Excepto el Director General Ejecutivo)\\\\n\\\\nEs cuanto informo para fines consiguientes\\\\n\\\\n\\\\nLa Paz, 1 de diciembre de 2016\\\"}\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-01T19:09:18.329Z\",\n      \"_fecha_modificacion\": \"2016-12-01T19:34:14.745Z\"\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Get_documento__order__limit__page__filter_",
    "type": "get",
    "url": "/api/v1/plantillasFormly/documento/?order=&limit=&page=&filter=",
    "title": "Obtiene la lista paginada de documento",
    "description": "<p>Get documento</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "order",
            "description": "<p>Campo por el cual se ordenará el resultado</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de resultados a obtener</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "page",
            "description": "<p>Número de página de resultados</p>"
          },
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "filter",
            "description": "<p>Texto a buscar en los registros</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "tipoMensaje",
            "description": "<p>Tipo del mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "datos",
            "description": "<p>Objeto de con los datos de respuesta</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "total",
            "description": "<p>Numero de objetos categoria</p>"
          },
          {
            "group": "Respuesta",
            "type": "Array",
            "optional": false,
            "field": "resultado",
            "description": "<p>Array de objetos categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "    HTTP/1.1 200 OK\n {\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"total\": 2,\n    \"resultado\": [\n      {\n        \"id_documento\": 1,\n        \"nombre\": \"INSTRUCTIVO\",\n        \"plantilla\": \"[{\\\"type\\\":\\\"textoh2\\\",\\\"key\\\":\\\"textoh2\\\",\\\"className\\\":\\\"ap-text-center\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"INSTRUCTIVO\\\"}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"CITE:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"A:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"REF:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"datepicker\\\",\\\"key\\\":\\\"inputDatePicker\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"FECHA:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"textarea\\\",\\\"key\\\":\\\"inputTextArea\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"Contenido:\\\",\\\"rows\\\":6,\\\"grow\\\":false,\\\"required\\\":true}}]\",\n        \"plantilla_valor\": \"{\\\"input-0\\\":\\\"AGETIC/UAF/002/2016\\\",\\\"input-1\\\":\\\"Todo el personal de la AGETIC\\\",\\\"input-2\\\":\\\"SOLICITUD DE VIATICOS\\\",\\\"datepicker-0\\\":\\\"2016-12-01T04:00:00.000Z\\\",\\\"textarea-0\\\":\\\"Se comunica al personal de la Agencia de Gobierno Electrónico y Tecnologías de Información y Comunicación que sea declarado en Comisión de Viaje debe realizar los requerimientos de pasajes y viáticos por separado para facilitar el pago:\\\\n\\\\nPara pasajes: Señalar los nombres completos de los pasajeros, la cedula de identidad, el lugar, la fecha de ida y de retorno debidamente justificado. Adjuntar la reserva del pasaje con el precio referencial \\\\n\\\\nEjemplo: Soila Ana Vaca Rodríguez, C.I. 9999999 L.P. y Juan Carlos Perico Pericon C.I. 8888888 L.P. viajaran a Tarija el 9/02/2015 y regresaran 10/02/2015 para la instalación de la red en el SIN. \\\\n\\\\nPara viáticos: Llenar el formulario correspondiente adjuntando el Memorandum y la certificación presupuestaria . Para el calculo de pago de viatico se considera un importe bruto de Bs. 371.- por día  sujetos a retencion del 13% RC IVA (Excepto el Director General Ejecutivo)\\\\n\\\\nEs cuanto informo para fines consiguientes\\\\n\\\\n\\\\nLa Paz, 1 de diciembre de 2016\\\"}\",\n        \"estado\": \"ACTIVO\",\n        \"_usuario_creacion\": 1,\n        \"_usuario_modificacion\": 1,\n        \"_fecha_creacion\": \"2016-12-01T19:09:18.329Z\",\n        \"_fecha_modificacion\": \"2016-12-01T19:34:14.745Z\"\n      },\n      {\n        \"id_documento\": 2,\n        \"nombre\": \"CIRCULAR\",\n        \"plantilla\": \"[{\\\"type\\\":\\\"textoh1\\\",\\\"key\\\":\\\"textoh1\\\",\\\"className\\\":\\\"ap-text-center\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"CIRCULAR\\\"}},{\\\"type\\\":\\\"textoh3\\\",\\\"key\\\":\\\"textoh3\\\",\\\"className\\\":\\\"ap-text-center\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"AGETIC/UAF N°083/2016\\\"}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"DE:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"A:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"input\\\",\\\"key\\\":\\\"inputText\\\",\\\"templateOptions\\\":{\\\"type\\\":\\\"text\\\",\\\"label\\\":\\\"REF:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"datepicker\\\",\\\"key\\\":\\\"inputDatePicker\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"FECHA:\\\",\\\"disabled\\\":false,\\\"required\\\":true}},{\\\"type\\\":\\\"parrafo\\\",\\\"key\\\":\\\"textParrafo\\\",\\\"className\\\":\\\"ap-text-justify\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"Dando cumplimiento a lo establecido en el Decreto Supremo N° 21531 de fecha 29 de junio de 1995 y la reglamentación relativa al Régimen Complementario al Impuesto al Valor Agregado (RC-IVA), así como la remisión del formulario 110 RC-IVA dependientes, todos los servidores públicos deben tomar en cuenta:\\\"}},{\\\"type\\\":\\\"parrafo\\\",\\\"key\\\":\\\"textParrafo\\\",\\\"className\\\":\\\"ap-text-justify\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"1. El formulario RC-IVA 110 debidamente llenado tanto para el pago de sueldos como para refrigerios deben ser presentados desde el 01 hasta el día 15 de cada mes o el siguiente día hábil en caso de ser fin de semana o feriado. \\\\n2. La elaboración de los formularios debe realizarse en el programa Facilito, el cual está instalado en todos los computadores.\\\"}},{\\\"type\\\":\\\"parrafo\\\",\\\"key\\\":\\\"textParrafo\\\",\\\"className\\\":\\\"ap-text-justify\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"La Unidad Administrativa Financiera mediante Recursos Humanos se pone a disposición de todos los funcionarios que tengan dudad o requieran mayor información a la presente circular.\\\"}},{\\\"type\\\":\\\"parrafo\\\",\\\"key\\\":\\\"textParrafo\\\",\\\"className\\\":\\\"ap-text-left\\\",\\\"templateOptions\\\":{\\\"label\\\":\\\"Atentamente,\\\"}}]\",\n        \"plantilla_valor\": \"{\\\"datepicker-0\\\":\\\"2016-12-01T04:00:00.000Z\\\",\\\"input-0\\\":\\\"Carmen Fedra Valverde\\\",\\\"input-1\\\":\\\"Todo el personal de planta de la Agencia de Gobierno Electronico y Tecnologías de Información y Comunicación\\\",\\\"input-2\\\":\\\"FORMULARIOS RC-IVA\\\"}\",\n        \"estado\": \"ACTIVO\",\n        \"_usuario_creacion\": 1,\n        \"_usuario_modificacion\": null,\n        \"_fecha_creacion\": \"2016-12-01T19:36:18.489Z\",\n        \"_fecha_modificacion\": \"2016-12-01T19:36:18.489Z\"\n      }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Options_documento",
    "type": "options",
    "url": "/api/v1/plantillasFormly/documento",
    "title": "Extrae formly de documento",
    "description": "<p>Options de documento</p>",
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "key",
            "description": "<p>Llave para el campo</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de etiqueta este puede ser input, select, datepicker, etc</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "templateOptions",
            "description": "<p>Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n  [\n    {\n      \"key\": \"id_documento\",\n      \"type\": \"input\",\n      \"templateOptions\": {\n        \"type\": \"number\",\n        \"label\": \"ID\",\n        \"required\": true\n      }\n    },\n    {\n      \"key\": \"nombre\",\n      \"type\": \"input\",\n      \"templateOptions\": {\n        \"type\": \"text\",\n        \"label\": \"Nombre\",\n        \"required\": true\n      }\n    },\n    {\n      \"key\": \"plantilla\",\n      \"type\": \"textarea\",\n      \"templateOptions\": {\n        \"type\": \"\",\n        \"label\": \"Plantilla\",\n        \"required\": true\n      }\n    },\n    {\n      \"key\": \"plantilla_valor\",\n      \"type\": \"textarea\",\n      \"templateOptions\": {\n        \"type\": \"\",\n        \"label\": \"Valores\",\n        \"required\": true\n      }\n    },\n    {\n      \"key\": \"estado\",\n      \"type\": \"select\",\n      \"templateOptions\": {\n        \"type\": \"\",\n        \"label\": \"Estado\",\n        \"required\": false,\n        \"options\": [\n          {\n            \"name\": \"ACTIVO\",\n            \"value\": \"ACTIVO\"\n          },\n          {\n            \"name\": \"INACTIVO\",\n            \"value\": \"INACTIVO\"\n          }\n        ]\n      }\n    },\n    {\n      \"key\": \"_usuario_creacion\",\n      \"type\": \"input\",\n      \"templateOptions\": {\n        \"type\": \"number\",\n        \"label\": \"Usuario de creación\",\n        \"required\": true\n      }\n    },\n    {\n      \"key\": \"_usuario_modificacion\",\n      \"type\": \"input\",\n      \"templateOptions\": {\n        \"type\": \"number\",\n        \"label\": \"Usuario de modificación\",\n        \"required\": false\n      }\n    },\n    {\n      \"key\": \"_fecha_creacion\",\n      \"type\": \"datepicker\",\n      \"templateOptions\": {\n        \"type\": \"datetime-local\",\n        \"label\": \"_fecha_creacion\",\n        \"required\": true\n      }\n    },\n    {\n      \"key\": \"_fecha_modificacion\",\n      \"type\": \"datepicker\",\n      \"templateOptions\": {\n        \"type\": \"datetime-local\",\n        \"label\": \"_fecha_modificacion\",\n        \"required\": true\n      }\n    }\n  ]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Post_documento",
    "type": "post",
    "url": "/api/v1/plantillasFormly/documento",
    "title": "Crear documento",
    "description": "<p>Post para documento</p>",
    "parameter": {
      "fields": {
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del documento</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantilla del documento</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valores de la plantilla</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario que esta creando</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"nombre\": \"INSTRUCTIVO\",\n  \"plantilla\": \"[]\",\n  \"plantilla_valor\": \"{}\",\n  \"_usuario_creacion\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_documento",
            "description": "<p>Identificador de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantilla del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valores de la plantilla</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del registro</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de documento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"tipoMensaje\": \"EXITO\",\n    \"mensaje\": \"La operación se realizó correctamente.\",\n    \"datos\": {\n      \"id_documento\": 3,\n      \"nombre\": \"INSTRUCTIVO\",\n      \"plantilla\": \"[]\",\n      \"plantilla_valor\": \"{}\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_fecha_modificacion\": \"2016-12-02T20:16:10.276Z\",\n      \"_fecha_creacion\": \"2016-12-02T20:16:10.276Z\",\n      \"_usuario_modificacion\": null\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Put_documento",
    "type": "put",
    "url": "/api/v1/plantillasFormly/documento/:id",
    "title": "Actualiza un/a documento",
    "description": "<p>Put documento</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de documento que se quiere actualizar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del documento</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantilla del documento</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valores de la plantilla</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que esta modificando</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"nombre\": \"INSTRUCTIVO\",\n  \"plantilla\": \"[]\",\n  \"plantilla_valor\": \"{}\",\n  \"_usuario_modificacion\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_documento",
            "description": "<p>Identificador de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantilla del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valores de la plantilla</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del registro</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de documento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"tipoMensaje\": \"EXITO\",\n    \"mensaje\": \"La operación se realizó correctamente.\",\n    \"datos\": {\n      \"id_documento\": 3,\n      \"nombre\": \"INSTRUCTIVO\",\n      \"plantilla\": \"[]\",\n      \"plantilla_valor\": \"{}\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-02T20:16:10.276Z\",\n      \"_fecha_modificacion\": \"2016-12-02T20:27:47.955Z\"\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Put_documento_para_aprobacion",
    "type": "put",
    "url": "/api/v1/plantillasFormly/documento/:id/aprobar",
    "title": "Envio de documento para su aprobacion",
    "description": "<p>Put documento</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de documento que se quiere aprobar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "usuario",
            "description": "<p>Identificador del usuario que aprueba.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"usuario\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\" : EXITO,\n  \"mensaje\" : El documento se aprobó correctamente\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Put_documento_para_envio",
    "type": "put",
    "url": "/api/v1/plantillasFormly/documento/:id/enviar",
    "title": "Envio de documento",
    "description": "<p>Put documento</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de documento que se quiere enviar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del documento</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre_plantilla",
            "description": "<p>Nombre de la plantilla del documento</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviación de documento.</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantilla del documento</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valores de la plantilla</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que esta modificando</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador del documento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"nombre\": \"Contrato Administrativo para la Prestación de Servicios de Consultoria - AGETIC AGETIC\",\n  \"nombre_plantilla\": \"Contrato Administrativo para la Prestación de Servicios de Consultoria - AGETIC AGETIC\",\n  \"abreviacion\": \"CAPSC\",\n  \"plantilla\":[],\n  \"plantilla_valor\": {},\n  \"_usuario_modificacion\": 1,\n  \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_documento",
            "description": "<p>Identificador de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantilla del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valores de la plantilla</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre_plantilla",
            "description": "<p>Nombre de la plantilla</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviación del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "de",
            "description": "<p>Remitente del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "para",
            "description": "<p>Destinatario del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "via",
            "description": "<p>Destinatario intermedios del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "via_actual",
            "description": "<p>Destinatario actual del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "referencia",
            "description": "<p>Referencia del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Fecha",
            "optional": false,
            "field": "fecha",
            "description": "<p>Fecha del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "observaciones",
            "description": "<p>Observaciones al documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de documento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_documento\": 2,\n    \"nombre\": \"Contrato Administrativo - AGETIC AGETIC\",\n    \"plantilla\": [],\n    \"plantilla_valor\": {},\n    \"nombre_plantilla\": \"Contrato Administrativo - AGETIC AGETIC\",\n    \"abreviacion\": \"CAPSC\",\n    \"de\": null,\n    \"para\": null,\n    \"via\": null,\n    \"via_actual\": null,\n    \"referencia\": null,\n    \"fecha\": null,\n    \"observaciones\": null,\n    \"estado\": \"NUEVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": 1,\n    \"_fecha_creacion\": \"2016-12-19T19:57:12.619Z\",\n    \"_fecha_modificacion\": \"2016-12-19T19:57:33.034Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "documento",
    "name": "Put_documento_para_rechazo",
    "type": "put",
    "url": "/api/v1/plantillasFormly/documento/:id/rechazar",
    "title": "Rechazo de un documento",
    "description": "<p>Put documento</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de documento que se quiere rechazar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "usuario",
            "description": "<p>Identificador del usuario que rechaza</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "observaciones",
            "description": "<p>Observaciones al documento</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "observado_por",
            "description": "<p>Información de quien rechaza el documento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"usuario\" : 1,\n  \"observaciones\" : Este informe no contiene informacion alguna,\n  \"observado_por\" : AGETIC AGETIC\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_documento",
            "description": "<p>Identificador de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantilla del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valores de la plantilla</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre_plantilla",
            "description": "<p>Nombre de la plantilla</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviación del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "de",
            "description": "<p>Remitente del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "para",
            "description": "<p>Destinatario del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "via",
            "description": "<p>Destinatario intermedios del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "via_actual",
            "description": "<p>Destinatario actual del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "referencia",
            "description": "<p>Referencia del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Fecha",
            "optional": false,
            "field": "fecha",
            "description": "<p>Fecha del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "observaciones",
            "description": "<p>Observaciones al documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de documento</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de documento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"tipoMensaje\": \"EXITO\",\n    \"mensaje\": \"El documento se rechazó\",\n    \"datos\": {\n        \"id_documento\": 4,\n        \"nombre\": \"Informe de Consultoria - AGETIC AGETIC\",\n        \"plantilla\": [],\n        \"plantilla_valor\": {},\n        \"nombre_plantilla\": \"Informe de Consultoria\",\n        \"abreviacion\": \"IC\",\n        \"de\": \"[1]\",\n        \"para\": \"[24]\",\n        \"via\": \"[89]\",\n        \"via_actual\": 89,\n        \"referencia\": \"aaaa\",\n        \"fecha\": null,\n        \"observaciones\": \"Observado por:  AGETIC AGETIC - Observaciones: Este informe no contiene informacion alguna\",\n        \"estado\": \"RECHAZADO\",\n        \"_usuario_creacion\": 1,\n        \"_usuario_modificacion\": 1,\n        \"_fecha_creacion\": \"2016-12-19T20:18:08.156Z\",\n        \"_fecha_modificacion\": \"2016-12-19T20:18:38.424Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/documentoRT.js",
    "groupTitle": "documento"
  },
  {
    "version": "1.0.0",
    "group": "menu",
    "name": "Delete_menu",
    "type": "delete",
    "url": "/api/v1/seguridad/menu/:id",
    "title": "Elimina menu",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador del menu</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/menuRT.js",
    "groupTitle": "menu"
  },
  {
    "version": "1.0.0",
    "group": "menu",
    "name": "Get_menu",
    "type": "get",
    "url": "/api/v1/seguridad/unidad/",
    "title": "Obtiene la lista completa de menu",
    "description": "<p>Get menu</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n\"tipoMensaje\": \"EXITO\",\n\"mensaje\": \"La operación se realizó correctamente.\",\n\"datos\": {\n    \"total\": 12,\n    \"resultado\": [\n    {\n    \"id_menu\": 1,\n    \"fid_menu_padre\": null,\n    \"nombre\": \"CONFIGURACIÓN\",\n    \"descripcion\": \"Configuracion\",\n    \"orden\": 1,\n    \"ruta\": \"\",\n    \"icono\": \"build\",\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": 1,\n    \"_fecha_creacion\": \"2016-12-19T22:50:11.174Z\",\n    \"_fecha_modificacion\": \"2016-12-19T22:50:11.174Z\"\n    },\n    {\n      \"id_menu\": 2,\n      \"fid_menu_padre\": 1,\n      \"nombre\": \"PLANTILLAS\",\n      \"descripcion\": \"Bandeja de plantillas de documentos\",\n      \"orden\": 1,\n      \"ruta\": \"plantillas\",\n      \"icono\": \"settings\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-19T22:50:11.174Z\",\n      \"_fecha_modificacion\": \"2016-12-19T22:50:11.174Z\"\n    }, ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/menuRT.js",
    "groupTitle": "menu"
  },
  {
    "version": "1.0.0",
    "group": "menu",
    "name": "Get_menu",
    "type": "get",
    "url": "/api/v1/seguridad/menu/:id",
    "title": "Obtiene la información de menu",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador del menu</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_menu",
            "description": "<p>Identificador del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "fid_menu_padre",
            "description": "<p>Identificador del menu padre</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "orden",
            "description": "<p>Orden del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "ruta",
            "description": "<p>Ruta del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "icono",
            "description": "<p>Icono del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario de creación</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario de modificación</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>fecha de creación</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>fecha de modificación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_menu\": 13,\n    \"fid_menu_padre\": null,\n    \"nombre\": \"MENU TEST2\",\n    \"descripcion\": \"Menu de prueba\",\n    \"orden\": null,\n    \"ruta\": null,\n    \"icono\": null,\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": null,\n    \"_fecha_creacion\": \"2016-12-19T23:02:06.994Z\",\n    \"_fecha_modificacion\": \"2016-12-19T23:02:06.994Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/menuRT.js",
    "groupTitle": "menu"
  },
  {
    "version": "1.0.0",
    "group": "menu",
    "name": "Get_unidad__order__limit__page__filter_",
    "type": "get",
    "url": "/api/v1/seguridad/unidad/?order=&limit=&page=&filter=",
    "title": "Obtiene la lista paginada de menu",
    "description": "<p>Get menu</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "order",
            "description": "<p>Campo por el cual se ordenará el resultado</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de resultados a obtener</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "page",
            "description": "<p>Número de página de resultados</p>"
          },
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "filter",
            "description": "<p>Texto a buscar en los registros</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "tipoMensaje",
            "description": "<p>Tipo del mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "datos",
            "description": "<p>Objeto de con los datos de respuesta</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "total",
            "description": "<p>Numero de objetos categoria</p>"
          },
          {
            "group": "Respuesta",
            "type": "Array",
            "optional": false,
            "field": "resultado",
            "description": "<p>Array de objetos categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "  HTTP/1.1 200 OK\n  {\n\"tipoMensaje\": \"EXITO\",\n\"mensaje\": \"La operación se realizó correctamente.\",\n\"datos\": {\n  \"total\": 12,\n  \"resultado\": [\n    {\n    \"id_menu\": 1,\n    \"fid_menu_padre\": null,\n    \"nombre\": \"CONFIGURACIÓN\",\n    \"descripcion\": \"Configuracion\",\n    \"orden\": 1,\n    \"ruta\": \"\",\n    \"icono\": \"build\",\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": 1,\n    \"_fecha_creacion\": \"2016-12-19T22:50:11.174Z\",\n    \"_fecha_modificacion\": \"2016-12-19T22:50:11.174Z\"\n    },\n    {\n      \"id_menu\": 2,\n      \"fid_menu_padre\": 1,\n      \"nombre\": \"PLANTILLAS\",\n      \"descripcion\": \"Bandeja de plantillas de documentos\",\n      \"orden\": 1,\n      \"ruta\": \"plantillas\",\n      \"icono\": \"settings\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-19T22:50:11.174Z\",\n      \"_fecha_modificacion\": \"2016-12-19T22:50:11.174Z\"\n    }, ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/menuRT.js",
    "groupTitle": "menu"
  },
  {
    "version": "1.0.0",
    "group": "menu",
    "name": "Options_menu",
    "type": "options",
    "url": "/seguridad/menu",
    "title": "Extrae formly de menu",
    "description": "<p>Options de menu</p>",
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "key",
            "description": "<p>Llave para el campo</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de etiqueta este puede ser input, select, datepicker, etc</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "templateOptions",
            "description": "<p>Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"key\": \"id_unidad\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"number\",\n      \"label\": \"Id unidad\",\n      \"required\": true\n    },\n  },\n  {\n    \"key\": \"campo\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"nombre\",\n      \"required\": true\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/menuRT.js",
    "groupTitle": "menu"
  },
  {
    "version": "1.0.0",
    "group": "menu",
    "name": "Post_menu",
    "type": "post",
    "url": "/api/v1/seguridad/menu",
    "title": "Crear menu",
    "parameter": {
      "fields": {
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del menu</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripción del menu</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario que crea.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"nombre\":\"menu TEST2\",\n  \"descripcion\":\"Menu de prueba\",\n  \"_usuario_creacion\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_menu",
            "description": "<p>Identificador del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "fid_menu_padre",
            "description": "<p>Identificador del menu padre</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "orden",
            "description": "<p>Orden del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "ruta",
            "description": "<p>Ruta del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "icono",
            "description": "<p>Icono del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario de creación</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario de modificación</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>fecha de creación</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>fecha de modificación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id_menu\": 13,\n  \"fid_menu_padre\": null,\n  \"nombre\": \"MENU TEST2\",\n  \"descripcion\": \"Menu de prueba\",\n  \"orden\": null,\n  \"ruta\": null,\n  \"icono\": null,\n  \"estado\": \"ACTIVO\",\n  \"_usuario_creacion\": 1,\n  \"_usuario_modificacion\": null\n  \"_fecha_modificacion\": \"2016-12-19T23:02:06.994Z\",\n  \"_fecha_creacion\": \"2016-12-19T23:02:06.994Z\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/menuRT.js",
    "groupTitle": "menu"
  },
  {
    "version": "1.0.0",
    "group": "menu",
    "name": "Put_menu",
    "type": "put",
    "url": "/seguridad/menu/:id",
    "title": "Actualiza la información de menu",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador del menu</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n\t\"nombre\":\"menu actualizado\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del menu</p>"
          }
        ],
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_menu",
            "description": "<p>Identificador del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "fid_menu_padre",
            "description": "<p>Identificador del menu padre</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "orden",
            "description": "<p>Orden del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "ruta",
            "description": "<p>Ruta del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "icono",
            "description": "<p>Icono del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del menu</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario de creación</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario de modificación</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>fecha de creación</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>fecha de modificación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_menu\": 13,\n    \"fid_menu_padre\": null,\n    \"nombre\": \"MENU ACTUALIZADO\",\n    \"descripcion\": \"Menu de prueba\",\n    \"orden\": null,\n    \"ruta\": null,\n    \"icono\": null,\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": null,\n    \"_fecha_creacion\": \"2016-12-19T23:02:06.994Z\",\n    \"_fecha_modificacion\": \"2016-12-19T23:22:13.560Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/menuRT.js",
    "groupTitle": "menu"
  },
  {
    "version": "1.0.0",
    "group": "plantillas_formly",
    "name": "Delete_plantillas_formly",
    "type": "delete",
    "url": "/api/v1/plantillasFormly/plantillas_formly/:id",
    "title": "Elimina un/a plantillas_formly",
    "description": "<p>Delete plantillas_formly</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de plantillas_formly que se quiere eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "  HTTP/1.1 200 OK\n{\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/plantilla_formlyRT.js",
    "groupTitle": "plantillas_formly"
  },
  {
    "version": "1.0.0",
    "group": "plantillas_formly",
    "name": "Get_plantillas_formly",
    "type": "get",
    "url": "/api/v1/plantillasFormly/plantillas_formly/",
    "title": "Obtiene la lista completa de plantillas_formly",
    "description": "<p>Get plantillas_formly</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"total\": 21,\n    \"resultado\":[\n      {\n       \"id_plantilla_formly\": 1,\n       \"nombre\": \"Contrato Administrativo para la Prestación de Bienes y Servicios\",\n       \"abreviacion\": \"CAPBS\",\n       \"plantilla\": \"[]\",\n       \"plantilla_valor\": null,\n       \"estado\": \"ACTIVO\",\n       \"_usuario_creacion\": 1,\n       \"_usuario_modificacion\": 1,\n       \"_fecha_creacion\": \"2016-12-15T21:03:42.486Z\",\n       \"_fecha_modificacion\": \"2016-12-15T21:05:12.504Z\"\n      }, ...\n  ]\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/plantilla_formlyRT.js",
    "groupTitle": "plantillas_formly"
  },
  {
    "version": "1.0.0",
    "group": "plantillas_formly",
    "name": "Get_plantillas_formly__id",
    "type": "get",
    "url": "/api/v1/plantillasFormly/plantillas_formly/:id",
    "title": "Obtiene un/a plantillas_formly",
    "description": "<p>Get plantillas_formly, obtiene un/a plantillas_formly</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de plantillas_formly que se quiere obtener</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_plantillas_formly",
            "description": "<p>Identificador de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de plantilla_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviacion de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valor de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de plantillas_formly</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_plantilla_formly\": 21,\n    \"nombre\": \"plantilla_test\",\n    \"abreviacion\": \"plant\",\n    \"plantilla\": \"[]\",\n    \"plantilla_valor\": null,\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": null,\n    \"_fecha_creacion\": \"2016-12-19T20:55:31.372Z\",\n    \"_fecha_modificacion\": \"2016-12-19T20:55:31.372Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/plantilla_formlyRT.js",
    "groupTitle": "plantillas_formly"
  },
  {
    "version": "1.0.0",
    "group": "plantillas_formly",
    "name": "Get_plantillas_formly__order__limit__page__filter_",
    "type": "get",
    "url": "/api/v1/plantillasFormly/plantillas_formly/?order=&limit=&page=&filter=",
    "title": "Obtiene la lista paginada de plantillas_formly",
    "description": "<p>Get plantillas_formly</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "order",
            "description": "<p>Campo por el cual se ordenará el resultado</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de resultados a obtener</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "page",
            "description": "<p>Número de página de resultados</p>"
          },
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "filter",
            "description": "<p>Texto a buscar en los registros</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "tipoMensaje",
            "description": "<p>Tipo del mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "datos",
            "description": "<p>Objeto de con los datos de respuesta</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "total",
            "description": "<p>Numero de objetos categoria</p>"
          },
          {
            "group": "Respuesta",
            "type": "Array",
            "optional": false,
            "field": "resultado",
            "description": "<p>Array de objetos categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"total\": 21,\n    \"resultado\":[\n    {\n     \"id_plantilla_formly\": 1,\n     \"nombre\": \"Contrato Administrativo para la Prestación de Bienes y Servicios\",\n     \"abreviacion\": \"CAPBS\",\n     \"plantilla\": \"[]\",\n     \"plantilla_valor\": null,\n     \"estado\": \"ACTIVO\",\n     \"_usuario_creacion\": 1,\n     \"_usuario_modificacion\": 1,\n     \"_fecha_creacion\": \"2016-12-15T21:03:42.486Z\",\n     \"_fecha_modificacion\": \"2016-12-15T21:05:12.504Z\"\n    }, ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/plantilla_formlyRT.js",
    "groupTitle": "plantillas_formly"
  },
  {
    "version": "1.0.0",
    "group": "plantillas_formly",
    "name": "Options_plantillas_formly",
    "type": "options",
    "url": "/api/v1/plantillasFormly/plantillas_formly",
    "title": "Extrae formly de plantillas_formly",
    "description": "<p>Options de plantillas_formly</p>",
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "key",
            "description": "<p>Llave para el campo</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de etiqueta este puede ser input, select, datepicker, etc</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "templateOptions",
            "description": "<p>Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"key\": \"id_plantillas_formly\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"number\",\n      \"label\": \"Id plantillas_formly\",\n      \"required\": true\n    },\n  },\n  {\n    \"key\": \"campo\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"Campo\",\n      \"required\": true\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/plantilla_formlyRT.js",
    "groupTitle": "plantillas_formly"
  },
  {
    "version": "1.0.0",
    "group": "plantillas_formly",
    "name": "Post_plantillas_formly",
    "type": "post",
    "url": "/api/v1/plantillasFormly/plantillas_formly",
    "title": "Crear plantillas_formly",
    "description": "<p>Post para plantillas_formly</p>",
    "parameter": {
      "fields": {
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de la plantilla_formly</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviacion de la plantilla_formly</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantilla_formly</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario que esta creando</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n\t\"nombre\":\"plantilla_test\",\n\t\"abreviacion\":\"plant\",\n\t\"plantilla\":\"[]\",\n\t\"_usuario_creacion\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_plantillas_formly",
            "description": "<p>Identificador de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de plantilla_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviacion de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valor de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de plantillas_formly</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_plantilla_formly\": 21,\n    \"nombre\": \"plantilla_test\",\n    \"abreviacion\": \"plant\",\n    \"plantilla\": \"[]\",\n    \"plantilla_valor\": null,\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": null\n    \"_fecha_modificacion\": \"2016-12-19T20:55:31.372Z\",\n    \"_fecha_creacion\": \"2016-12-19T20:55:31.372Z\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/plantilla_formlyRT.js",
    "groupTitle": "plantillas_formly"
  },
  {
    "version": "1.0.0",
    "group": "plantillas_formly",
    "name": "Put_plantillas_formly",
    "type": "put",
    "url": "/api/v1/plantillasFormly/plantillas_formly/:id",
    "title": "Actualiza un/a plantillas_formly",
    "description": "<p>Put plantillas_formly</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de plantillas_formly que se quiere actualizar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreciación de plantillas_formly</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "  {\n\t  \"abreviacion\":\"QA\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_plantillas_formly",
            "description": "<p>Identificador de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviacion de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla",
            "description": "<p>Plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "plantilla_valor",
            "description": "<p>Valor de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de plantillas_formly</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de plantillas_formly</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_plantilla_formly\": 21,\n    \"nombre\": \"plantilla_test\",\n    \"abreviacion\": \"QA\",\n    \"plantilla\": \"[]\",\n    \"plantilla_valor\": null,\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": null,\n    \"_fecha_creacion\": \"2016-12-19T20:55:31.372Z\",\n    \"_fecha_modificacion\": \"2016-12-19T21:02:38.049Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/plantillasFormly/plantilla_formlyRT.js",
    "groupTitle": "plantillas_formly"
  },
  {
    "version": "1.0.0",
    "group": "rol",
    "name": "Delete_rol",
    "type": "delete",
    "url": "/api/v1/seguridad/rol/:id",
    "title": "Eliminar un rol",
    "description": "<p>Delete para rol</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de rol que se quiere eliminar.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/rolRT.js",
    "groupTitle": "rol"
  },
  {
    "version": "1.0.0",
    "group": "rol",
    "name": "Get_rol",
    "type": "get",
    "url": "/api/v1/seguridad/rol",
    "title": "Obtiene listado de roles",
    "description": "<p>Get para rol, obtiene todos los datos del modelo rol.</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta :",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id_rol\": 1,\n    \"nombre\": \"ADMIN\",\n    \"descripcion\": \"Administrador\",\n    \"peso\": 0,\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": 2,\n    \"_fecha_creacion\": \"2016-09-02T15:09:16.415Z\",\n    \"_fecha_modificacion\": \"2016-09-02T15:09:16.415Z\"\n  },\n  ...\n\n]",
          "type": "Array"
        }
      ]
    },
    "filename": "src/routes/seguridad/rolRT.js",
    "groupTitle": "rol"
  },
  {
    "version": "1.0.0",
    "group": "rol",
    "name": "Get_rol__id",
    "type": "get",
    "url": "/api/v1/seguridad/rol/:id",
    "title": "Obtiene un rol",
    "description": "<p>Get para rol, obtiene la información sobre un rol basado en su id.</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de rol que se quiere obtener.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_rol",
            "description": "<p>Identificador del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "peso",
            "description": "<p>Peso del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado por defecto ACTIVO.</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creacion del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador de usuario creador.</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificacion del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que modifica.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta :",
          "content": "\t    HTTP/1.1 200 OK\n      {\n      \"id_rol\": 1,\n      \"nombre\": \"ADMIN\",\n      \"descripcion\": \"Administrador\",\n      \"peso\": 0,\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 2,\n      \"_fecha_creacion\": \"2016-09-02T15:09:16.415Z\",\n      \"_fecha_modificacion\": \"2016-09-02T15:09:16.415Z\"\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/rolRT.js",
    "groupTitle": "rol"
  },
  {
    "version": "1.0.0",
    "group": "rol",
    "name": "Get_rol__order__limit__page__filter_",
    "type": "get",
    "url": "/api/v1/seguridad/rol/?order=&limit=&page=&filter=",
    "title": "Obtiene la lista paginada de roles",
    "description": "<p>Get para rol, obtiene todos los datos del modelo rol.</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "order",
            "description": "<p>Campo por el cual se ordenara el resultado</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de resultados a obtener</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "page",
            "description": "<p>Número de página de resultados</p>"
          },
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "filter",
            "description": "<p>Texto a buscar en los registros</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta :",
          "content": "  HTTP/1.1 200 OK\n{\n    \"count\":3,\n    \"results\":[\n      {\n        \"id_rol\": 2,\n        \"nombre\": \"INSPECTOR DE BIENES\",\n        \"descripcion\": \"Inspector de bienes\",\n        \"peso\": 5,\n        \"estado\": \"ACTIVO\",\n        \"_usuario_creacion\": 1,\n        \"_usuario_modificacion\": 2,\n        \"_fecha_creacion\": \"2016-09-02T15:09:16.415Z\",\n        \"_fecha_modificacion\": \"2016-09-02T15:09:16.415Z\"\n      },\n      ...\n\n    ]\n}",
          "type": "Array"
        }
      ]
    },
    "filename": "src/routes/seguridad/rolRT.js",
    "groupTitle": "rol"
  },
  {
    "version": "1.0.0",
    "group": "rol",
    "name": "OptionsRoles",
    "type": "options",
    "url": "/api/v1/seguridad/rol",
    "title": "Options",
    "description": "<p>Para devolver el options de Rol</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Ninguno",
            "optional": false,
            "field": "Sin",
            "description": "<p>Parámetros</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n\n[\n  {\n    \"key\": \"id_rol\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"number\",\n      \"label\": \"Id rol\",\n      \"required\": true\n    }\n  },\n  {\n    \"key\": \"nombre\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"Rol\",\n      \"required\": true\n    }\n  },\n  {\n    \"key\": \"descripcion\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"Descripción\",\n      \"required\": false\n    }\n  },\n  {\n    \"key\": \"peso\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"number\",\n      \"label\": \"Peso\",\n      \"required\": true\n    }\n  },\n  {\n    \"key\": \"estado\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"Estado\",\n      \"required\": true\n    }\n  },\n  {\n    \"key\": \"usuario_creacion\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"Usuario de creación\",\n      \"required\": true\n    }\n  },\n  {\n    \"key\": \"usuario_modificacion\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"Usuario de modificación\",\n      \"required\": false\n    }\n  },\n  {\n    \"key\": \"fecha_creacion\",\n    \"type\": \"datepicker\",\n    \"templateOptions\": {\n      \"type\": \"datetime-local\",\n      \"label\": \"fecha_creacion\",\n      \"required\": true\n    }\n  },\n  {\n    \"key\": \"fecha_modificacion\",\n    \"type\": \"datepicker\",\n    \"templateOptions\": {\n      \"type\": \"datetime-local\",\n      \"label\": \"fecha_modificacion\",\n      \"required\": true\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/rolRT.js",
    "groupTitle": "rol"
  },
  {
    "version": "1.0.0",
    "group": "rol",
    "name": "Post_rol",
    "type": "post",
    "url": "/api/v1/seguridad/rol",
    "title": "Crear rol",
    "description": "<p>Post para rol</p>",
    "parameter": {
      "fields": {
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "peso",
            "description": "<p>Peso del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del rol.</p>"
          },
          {
            "group": "Peticion",
            "type": "Fecha",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creacion del registro.</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario que esta creando.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n    \"nombre\":\"tester\",\n    \"descripcion\":\"Rol destinado al tester\",\n    \"peso\":0,\n    \"estado\":\"ACTIVO\",\n    \"_usuario_creacion\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_departamento",
            "description": "<p>Identificador del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripción del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado por defecto ACTIVO.</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador de usuario creador.</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificacion del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que modifica.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id_rol\": 6,\n  \"nombre\": \"tester\",\n  \"descripcion\": \"Rol destinado al tester\",\n  \"peso\": 0,\n  \"estado\": \"ACTIVO\",\n  \"_usuario_creacion\": 1,\n  \"_fecha_modificacion\": \"2016-09-05T14:19:12.841Z\",\n  \"_fecha_creacion\": \"2016-09-05T14:19:12.841Z\",\n  \"_usuario_modificacion\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/rolRT.js",
    "groupTitle": "rol"
  },
  {
    "version": "1.0.0",
    "group": "rol",
    "name": "Put_rol",
    "type": "put",
    "url": "/api/v1/seguridad/rol/:id",
    "title": "Actualiza un rol",
    "description": "<p>Put para rol</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador del rol que se quiere actualizar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del rol</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripción del rol</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que esta modificando</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"nombre\":\"tester_up\",\n  \"descripcion\":\"Rol destinado al tester updated\",\n  \"_usuario_modificacion\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_rol",
            "description": "<p>Identificador del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion del rol.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado por defecto ACTIVO.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador de usuario creador.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que modifica.</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creacion.</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificacion.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id_rol\": 6,\n  \"nombre\": \"tester_up\",\n  \"descripcion\": \"Rol destinado al tester updated\",\n  \"peso\": 0,\n  \"estado\": \"ACTIVO\",\n  \"_usuario_creacion\": 1,\n  \"_usuario_modificacion\": null,\n  \"_fecha_creacion\": \"2016-09-05T14:19:12.841Z\",\n  \"_fecha_modificacion\": \"2016-09-05T14:36:26.453Z\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/rolRT.js",
    "groupTitle": "rol"
  },
  {
    "version": "1.0.0",
    "group": "unidad",
    "name": "Delete_unidad",
    "type": "delete",
    "url": "/api/v1/seguridad/unidad/:id",
    "title": "Elimina un/a unidad",
    "description": "<p>Delete unidad</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de unidad que se quiere eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "  HTTP/1.1 200 OK\n{\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/unidadRT.js",
    "groupTitle": "unidad"
  },
  {
    "version": "1.0.0",
    "group": "unidad",
    "name": "Get_unidad",
    "type": "get",
    "url": "/api/v1/seguridad/unidad/",
    "title": "Obtiene la lista completa de unidad",
    "description": "<p>Get unidad</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n\"tipoMensaje\": \"EXITO\",\n\"mensaje\": \"La operación se realizó correctamente.\",\n\"datos\": {\n  \"total\": 12,\n  \"resultado\": [\n    {\n      \"id_unidad\": 1,\n      \"nombre\": \"Area de Auditoria Interna\",\n      \"abreviacion\": \"AAI\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-19T19:49:55.922Z\",\n      \"_fecha_modificacion\": \"2016-12-19T19:49:55.922Z\"\n    },\n    {\n      \"id_unidad\": 2,\n      \"nombre\": \"Area de Comunicación\",\n      \"abreviacion\": \"AC\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-19T19:49:55.922Z\",\n      \"_fecha_modificacion\": \"2016-12-19T19:49:55.922Z\"\n    },\n    {\n      \"id_unidad\": 3,\n      \"nombre\": \"Area de Planificación\",\n      \"abreviacion\": \"AP\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-19T19:49:55.922Z\",\n      \"_fecha_modificacion\": \"2016-12-19T19:49:55.922Z\"\n    }, ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/unidadRT.js",
    "groupTitle": "unidad"
  },
  {
    "version": "1.0.0",
    "group": "unidad",
    "name": "Get_unidad__id",
    "type": "get",
    "url": "/api/v1/seguridad/unidad/:id",
    "title": "Obtiene un/a unidad",
    "description": "<p>Get unidad, obtiene un/a unidad</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de la unidad que se quiere obtener</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_unidad",
            "description": "<p>Identificador de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviación de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de unidad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_unidad\": 12,\n    \"nombre\": \"Unidad de QA\",\n    \"abreviacion\": \"UQA\",\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": null,\n    \"_fecha_creacion\": \"2016-12-19T20:37:43.509Z\",\n    \"_fecha_modificacion\": \"2016-12-19T20:37:43.509Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/unidadRT.js",
    "groupTitle": "unidad"
  },
  {
    "version": "1.0.0",
    "group": "unidad",
    "name": "Get_unidad__order__limit__page__filter_",
    "type": "get",
    "url": "/api/v1/seguridad/unidad/?order=&limit=&page=&filter=",
    "title": "Obtiene la lista paginada de unidad",
    "description": "<p>Get unidad</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "order",
            "description": "<p>Campo por el cual se ordenará el resultado</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de resultados a obtener</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "page",
            "description": "<p>Número de página de resultados</p>"
          },
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "filter",
            "description": "<p>Texto a buscar en los registros</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "tipoMensaje",
            "description": "<p>Tipo del mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "datos",
            "description": "<p>Objeto de con los datos de respuesta</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "total",
            "description": "<p>Numero de objetos categoria</p>"
          },
          {
            "group": "Respuesta",
            "type": "Array",
            "optional": false,
            "field": "resultado",
            "description": "<p>Array de objetos categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "  HTTP/1.1 200 OK\n  {\n\"tipoMensaje\": \"EXITO\",\n\"mensaje\": \"La operación se realizó correctamente.\",\n\"datos\": {\n  \"total\": 12,\n  \"resultado\": [\n    {\n      \"id_unidad\": 1,\n      \"nombre\": \"Area de Auditoria Interna\",\n      \"abreviacion\": \"AAI\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-19T19:49:55.922Z\",\n      \"_fecha_modificacion\": \"2016-12-19T19:49:55.922Z\"\n    },\n    {\n      \"id_unidad\": 2,\n      \"nombre\": \"Area de Comunicación\",\n      \"abreviacion\": \"AC\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-19T19:49:55.922Z\",\n      \"_fecha_modificacion\": \"2016-12-19T19:49:55.922Z\"\n    },\n    {\n      \"id_unidad\": 3,\n      \"nombre\": \"Area de Planificación\",\n      \"abreviacion\": \"AP\",\n      \"estado\": \"ACTIVO\",\n      \"_usuario_creacion\": 1,\n      \"_usuario_modificacion\": 1,\n      \"_fecha_creacion\": \"2016-12-19T19:49:55.922Z\",\n      \"_fecha_modificacion\": \"2016-12-19T19:49:55.922Z\"\n    }, ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/unidadRT.js",
    "groupTitle": "unidad"
  },
  {
    "version": "1.0.0",
    "group": "unidad",
    "name": "Options_unidad",
    "type": "options",
    "url": "/api/v1/seguridad/unidad",
    "title": "Extrae formly de unidad",
    "description": "<p>Options de unidad</p>",
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "key",
            "description": "<p>Llave para el campo</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de etiqueta este puede ser input, select, datepicker, etc</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "templateOptions",
            "description": "<p>Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"key\": \"id_unidad\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"number\",\n      \"label\": \"Id unidad\",\n      \"required\": true\n    },\n  },\n  {\n    \"key\": \"campo\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"nombre\",\n      \"required\": true\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/unidadRT.js",
    "groupTitle": "unidad"
  },
  {
    "version": "1.0.0",
    "group": "unidad",
    "name": "Post_unidad",
    "type": "post",
    "url": "/api/v1/seguridad/unidad",
    "title": "Crear unidad",
    "description": "<p>Post para unidad</p>",
    "parameter": {
      "fields": {
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de la unidad</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviación de la unidad</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario que esta creando</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"nombre\":\"Unidad de QA\",\n  \"abreviacion\":\"UQA\",\n  \"_usuario_creacion\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_unidad",
            "description": "<p>Identificador de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviación de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de unidad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id_unidad\": 12,\n  \"nombre\": \"Unidad de QA\",\n  \"abreviacion\": \"UQA\",\n  \"estado\": \"ACTIVO\",\n  \"_usuario_creacion\": 1,\n  \"_usuario_modificacion\": null\n  \"_fecha_modificacion\": \"2016-12-19T20:37:43.509Z\",\n  \"_fecha_creacion\": \"2016-12-19T20:37:43.509Z\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/unidadRT.js",
    "groupTitle": "unidad"
  },
  {
    "version": "1.0.0",
    "group": "unidad",
    "name": "Put_unidad",
    "type": "put",
    "url": "/api/v1/seguridad/unidad/:id",
    "title": "Actualiza un/a unidad",
    "description": "<p>Put unidad</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de unidad que se quiere actualizar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreciacion de la unidad a actualizar</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que actualiza</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"abreviacion\":\"UQA UP\",\n  \"_usuario_modificacion\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_unidad",
            "description": "<p>Identificador de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "abreviacion",
            "description": "<p>Abreviación de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado de la unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de unidad</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de unidad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_unidad\": 12,\n    \"nombre\": \"Unidad de QA\",\n    \"abreviacion\": \"UQA UP\",\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": 1,\n    \"_fecha_creacion\": \"2016-12-19T20:37:43.509Z\",\n    \"_fecha_modificacion\": \"2016-12-19T20:50:13.092Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/unidadRT.js",
    "groupTitle": "unidad"
  },
  {
    "version": "1.0.0",
    "group": "usuario",
    "name": "Delete_usuario",
    "type": "delete",
    "url": "/api/v1/seguridad/usuario/:id",
    "title": "Eliminar un usuario",
    "description": "<p>Delete para usuario</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de usuario que se quiere eliminar.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuarioRT.js",
    "groupTitle": "usuario"
  },
  {
    "version": "1.0.0",
    "group": "usuario",
    "name": "Get_usuario",
    "type": "get",
    "url": "/api/v1/seguridad/usuario",
    "title": "Obtiene listado de usuarios",
    "description": "<p>Get para usuario, obtiene todos los datos del modelo usuario, con su rol y oficina.</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta :",
          "content": "HTTP/1.1 200 OK\n[\n  {\n   \"id_usuario\": 72,\n   \"fid_unidad\": 9,\n   \"usuario\": \"acampos\",\n   \"contrasena\": \"672caf27f5363dc833bda5099d775e89a1\",\n   \"numero_documento\": \"12345678\",\n   \"nombres\": \"Ariel\",\n   \"apellidos\": \"campos\",\n   \"cargo\": \"Profesional de Desarrollo de Sistemas\",\n   \"email\": \"acampos@agetic.gob.bo\",\n   \"estado\": \"ACTIVO\",\n   \"_usuario_creacion\": 1,\n   \"_usuario_modificacion\": 1,\n   \"_fecha_creacion\": \"2016-12-16T14:47:56.104Z\",\n   \"_fecha_modificacion\": \"2016-12-16T19:24:17.857Z\",\n   \"usuario_rol\": [\n     {\n       \"fid_rol\": 3,\n       \"fid_usuario\": 72,\n       \"id_usuario_rol\": 72,\n       \"estado\": \"ACTIVO\",\n       \"rol\": {\n         \"id_rol\": 3,\n         \"nombre\": \"OPERADOR\",\n         \"estado\": \"ACTIVO\"\n       }\n     }\n   ]\n }, ...\n]",
          "type": "Array"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuarioRT.js",
    "groupTitle": "usuario"
  },
  {
    "version": "1.0.0",
    "group": "usuario",
    "name": "Get_usuario__id",
    "type": "get",
    "url": "/api/v1/seguridad/usuario/:id",
    "title": "Obtiene un usuario",
    "description": "<p>Get para usuario, obtiene la información sobre un usuario basado en su id.</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de usuario que se quiere obtener.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_usuario",
            "description": "<p>Identificador del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "usuario",
            "description": "<p>nombre de usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "contrasena",
            "description": "<p>Contraseña del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "numero_documento",
            "description": "<p>Número de documento del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombres",
            "description": "<p>Nombres del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "cargo",
            "description": "<p>Cargo del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "fid_unidad",
            "description": "<p>Identificador de la unidad del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado por defecto ACTIVO</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador de usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que modifica</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificacion del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta :",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"Obtención de datos exitosa.\",\n  \"datos\": {\n    \"id_usuario\": 141,\n    \"fid_unidad\": null,\n    \"usuario\": \"test90\",\n    \"contrasena\": \"a9186858e1f98cbcc4cc070617a7fa76\",\n    \"numero_documento\": \"12345678\",\n    \"nombres\": \"Juan\",\n    \"apellidos\": \"Perez Cortez\",\n    \"cargo\": \"tester\",\n    \"email\": \"test@test.test\",\n    \"estado\": \"ACTIVO\",\n    \"_usuario_creacion\": 1,\n    \"_usuario_modificacion\": null,\n    \"_fecha_creacion\": \"2016-12-19T21:14:47.419Z\",\n    \"_fecha_modificacion\": \"2016-12-19T21:14:47.419Z\",\n    \"usuario_rol\": [\n      {\n        \"fid_rol\": 1,\n        \"estado\": \"ACTIVO\",\n        \"rol\": {\n          \"id_rol\": 1,\n          \"nombre\": \"ADMIN\",\n          \"estado\": \"ACTIVO\"\n        }\n      },\n      {\n        \"fid_rol\": 2,\n        \"estado\": \"ACTIVO\",\n        \"rol\": {\n          \"id_rol\": 2,\n          \"nombre\": \"JEFE\",\n          \"estado\": \"ACTIVO\"\n        }\n      }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuarioRT.js",
    "groupTitle": "usuario"
  },
  {
    "version": "1.0.0",
    "group": "usuario",
    "name": "Get_usuario__order__limit__page__filter_",
    "type": "get",
    "url": "/api/v1/seguridad/usuario/?order=&limit=&page=&filter=",
    "title": "Obtiene la lista paginada de usuarios",
    "description": "<p>Get para usuario, obtiene todos los datos del modelo usuario.</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "order",
            "description": "<p>Campo por el cual se ordenara el resultado</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de resultados a obtener</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "page",
            "description": "<p>Número de página de resultados</p>"
          },
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "filter",
            "description": "<p>Texto a buscar en los registros</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta :",
          "content": "HTTP/1.1 200 OK\n[\n  {\n   \"id_usuario\": 72,\n   \"fid_unidad\": 9,\n   \"usuario\": \"acampos\",\n   \"contrasena\": \"672caf27f5363dc833bda5099d775e89a1\",\n   \"numero_documento\": \"12345678\",\n   \"nombres\": \"Ariel\",\n   \"apellidos\": \"campos\",\n   \"cargo\": \"Profesional de Desarrollo de Sistemas\",\n   \"email\": \"acampos@agetic.gob.bo\",\n   \"estado\": \"ACTIVO\",\n   \"_usuario_creacion\": 1,\n   \"_usuario_modificacion\": 1,\n   \"_fecha_creacion\": \"2016-12-16T14:47:56.104Z\",\n   \"_fecha_modificacion\": \"2016-12-16T19:24:17.857Z\",\n   \"usuario_rol\": [\n     {\n       \"fid_rol\": 3,\n       \"fid_usuario\": 72,\n       \"id_usuario_rol\": 72,\n       \"estado\": \"ACTIVO\",\n       \"rol\": {\n         \"id_rol\": 3,\n         \"nombre\": \"OPERADOR\",\n         \"estado\": \"ACTIVO\"\n       }\n     }\n   ]\n }, ...\n]",
          "type": "Array"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuarioRT.js",
    "groupTitle": "usuario"
  },
  {
    "version": "1.0.0",
    "type": "options",
    "url": "/api/v1/seguridad/usuario",
    "title": "Options",
    "name": "OptionsUsuarios",
    "group": "usuario",
    "description": "<p>Para devolver el options de Usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Ninguno",
            "optional": false,
            "field": "Sin",
            "description": "<p>Parámetros</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\n[\n   {\n     \"key\": \"id_usuario\",\n     \"type\": \"input\",\n     \"templateOptions\": {\n       \"type\": \"number\",\n       \"label\": \"id_usuario\",\n       \"required\": true\n     }\n   },\n   {\n     \"key\": \"nombres\",\n     \"type\": \"input\",\n     \"templateOptions\": {\n       \"type\": \"text\",\n       \"label\": \"nombres\",\n       \"required\": false\n     }\n   },\n   {\n     \"key\": \"apellidos\",\n     \"type\": \"input\",\n     \"templateOptions\": {\n       \"type\": \"text\",\n       \"label\": \"apellidos\",\n       \"required\": false\n     }\n   },\n   {\n     \"key\": \"email\",\n     \"type\": \"input\",\n     \"templateOptions\": {\n       \"type\": \"text\",\n       \"label\": \"email\",\n       \"required\": true\n     }\n   },\n   {\n     \"key\": \"usuario\",\n     \"type\": \"input\",\n       \"type\": \"text\",\n     \"templateOptions\": {\n       \"label\": \"usuario\",\n       \"required\": true\u0001\n     }\n   },\n   {\n     \"key\": \"contrasena\",\n     \"type\": \"input\",\n     \"templateOptions\": {\n       \"type\": \"text\",\n       \"label\": \"contrasena\",\n       \"required\": true\n     }\n   },\n   {\n     \"key\": \"estado\",\n     \"type\": \"input\",\n     \"templateOptions\": {\n       \"type\": \"text\",\n       \"label\": \"Estado\",\n       \"required\": true\n     }\n   },\n   {\n     \"key\": \"fecha_creacion\",\n     \"type\": \"datepicker\",\n     \"templateOptions\": {\n       \"type\": \"datetime-local\",\n       \"label\": \"fecha_creacion\",\n       \"required\": true\n     }\n   },\n   {\n     \"key\": \"fecha_modificacion\",\n     \"type\": \"datepicker\",\n     \"templateOptions\": {\n       \"type\": \"datetime-local\",\n       \"label\": \"fecha_modificacion\",\n       \"required\": true\n     }\n   },\n   {\n     \"key\": \"id_medico\",\n     \"type\": \"select\",\n     \"templateOptions\": {\n       \"type\": \"number\",\n       \"label\": \"id_medico\",\n       \"required\": false,\n       \"options\": [\n         {\n           \"name\": \"2 null\",\n           \"value\": 4\n         },\n         {\n           \"name\": \"1 foto.png\",\n           \"value\": 1\n         }\n       ]\n     }\n   },\n   {\n     \"key\": \"id_persona\",\n     \"type\": \"select\",\n     \"templateOptions\": {\n       \"type\": \"number\",\n       \"label\": \"id_persona\",\n       \"required\": true,\n       \"options\": [\n         {\n           \"name\": \"AGETIC AGETIC\",\n           \"value\": 1\n         },\n         {\n           \"name\": \"JUDITH ALEJANDRA CALIZAYA\",\n           \"value\": 2\n         }\n       ]\n     }\n   }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuarioRT.js",
    "groupTitle": "usuario"
  },
  {
    "version": "1.0.0",
    "group": "usuario",
    "name": "Post_usuario",
    "type": "post",
    "url": "/api/v1/seguridad/usuario",
    "title": "Crear usuario",
    "description": "<p>Post para usuario</p>",
    "parameter": {
      "fields": {
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "usuario",
            "description": "<p>Nombre de usuario</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "contrasena",
            "description": "<p>Contraseña de usuario</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "numero_documento",
            "description": "<p>Número de documento del usuario</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "nombres",
            "description": "<p>Nombres del usuario</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del usuario</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "cargo",
            "description": "<p>Cargo de usuario</p>"
          },
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "email",
            "description": "<p>Email de usuario</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario que esta creando</p>"
          },
          {
            "group": "Peticion",
            "type": "Array",
            "optional": false,
            "field": "roles",
            "description": "<p>Identificadores de rol</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"usuario\": \"test91\",\n  \"contrasena\": \"Developer\",\n  \"numero_documento\": 12345678,\n  \"nombres\": \"Juan\",\n  \"apellidos\": \"Perez Cortez\",\n  \"cargo\": \"tester\",\n  \"email\": \"test@test.test\",\n  \"_usuario_creacion\": 1,\n  \"roles\": [1,2]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_usuario",
            "description": "<p>Identificador del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "usuario",
            "description": "<p>nombre de usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "contrasena",
            "description": "<p>Contraseña del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "numero_documento",
            "description": "<p>Número de documento del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombres",
            "description": "<p>Nombres del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "cargo",
            "description": "<p>Cargo del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "fid_unidad",
            "description": "<p>Identificador de la unidad del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado por defecto ACTIVO</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador de usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que modifica</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificacion del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id_usuario\": 142,\n  \"usuario\": \"test91\",\n  \"contrasena\": \"67a9d6ae80e14dd6156c4706f7c9cef8\",\n  \"numero_documento\": \"12345678\",\n  \"nombres\": \"Juan\",\n  \"apellidos\": \"Perez Cortez\",\n  \"cargo\": \"tester\",\n  \"email\": \"test@test.test\",\n  \"fid_unidad\": null,\n  \"estado\": \"ACTIVO\",\n  \"_usuario_creacion\": 1,\n  \"_usuario_modificacion\": null\n  \"_fecha_modificacion\": \"2016-12-19T21:21:23.567Z\",\n  \"_fecha_creacion\": \"2016-12-19T21:21:23.567Z\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuarioRT.js",
    "groupTitle": "usuario"
  },
  {
    "version": "1.0.0",
    "group": "usuario",
    "name": "Put_usuario",
    "type": "put",
    "url": "/api/v1/seguridad/usuario/:id",
    "title": "Actualiza un usuario",
    "description": "<p>Put para usuario</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador del usuario que se quiere actualizar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "usuario",
            "description": "<p>Nombre de usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"usuario\": \"jperezc\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_usuario",
            "description": "<p>Identificador del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "fid_unidad",
            "description": "<p>Identificador de la unidad del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "usuario",
            "description": "<p>nombre de usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "contrasena",
            "description": "<p>Contraseña del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "numero_documento",
            "description": "<p>Número de documento del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "nombres",
            "description": "<p>Nombres del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "cargo",
            "description": "<p>Cargo del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado por defecto ACTIVO</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador de usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario que modifica</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificacion del usuario</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id_usuario\": 142,\n  \"fid_unidad\": null,\n  \"usuario\": \"jperezc\",\n  \"contrasena\": \"67a9d6ae80e14dd6156c4706f7c9cef8\",\n  \"numero_documento\": \"12345678\",\n  \"nombres\": \"Juan\",\n  \"apellidos\": \"Perez Cortez\",\n  \"cargo\": \"tester\",\n  \"email\": \"test@test.test\",\n  \"estado\": \"ACTIVO\",\n  \"_usuario_creacion\": 1,\n  \"_usuario_modificacion\": null,\n  \"_fecha_creacion\": \"2016-12-19T21:21:23.567Z\",\n  \"_fecha_modificacion\": \"2016-12-19T21:28:18.016Z\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuarioRT.js",
    "groupTitle": "usuario"
  },
  {
    "version": "1.0.0",
    "group": "usuario_his",
    "name": "Delete_usuario_his",
    "type": "delete",
    "url": "/api/v1/seguridad/usuario_his/:id",
    "title": "Elimina un/a usuario_his",
    "description": "<p>Delete usuario_his</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de usuario_his que se quiere eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "  HTTP/1.1 200 OK\n{\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuario_hisRT.js",
    "groupTitle": "usuario_his"
  },
  {
    "version": "1.0.0",
    "group": "usuario_his",
    "name": "Get_usuario_his",
    "type": "get",
    "url": "/api/v1/seguridad/usuario_his/",
    "title": "Obtiene la lista completa de usuario_his",
    "description": "<p>Get usuario_his</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"total\": 21,\n    \"resultado\":[\n      {\n        \"id_usuario_his\": \"1\",\n        \"campo\": \"xxx\",\n        \"_usuario_creacion\": \"1\",\n        \"_fecha_creacion\": \" << fecha y hora >> \",\n        \"_fecha_modificacion\": \" << fecha y hora >> \"\n      },\n      {\n        \"id_usuario_his\": \"2\",\n        \"campo\": \"zzz\",\n        \"_usuario_creacion\": \"1\",\n        \"_fecha_creacion\": \" << fecha y hora >> \",\n        \"_fecha_modificacion\": \" << fecha y hora >> \"\n      },\n      ...\n    ]\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuario_hisRT.js",
    "groupTitle": "usuario_his"
  },
  {
    "version": "1.0.0",
    "group": "usuario_his",
    "name": "Get_usuario_his__id",
    "type": "get",
    "url": "/api/v1/seguridad/usuario_his/:id",
    "title": "Obtiene un/a usuario_his",
    "description": "<p>Get usuario_his, obtiene un/a usuario_his</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de usuario_his que se quiere obtener</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_usuario_his",
            "description": "<p>Identificador de usuario_his</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de usuario_his</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de usuario_his</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"id_usuario_his\": \"1\",\n    \"campo\": \"xxx\",\n    \"_usuario_creacion\": \"1\",\n    \"_fecha_creacion\": \" << fecha y hora >> \",\n    \"_fecha_modificacion\": \" << fecha y hora >> \"\n  }\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuario_hisRT.js",
    "groupTitle": "usuario_his"
  },
  {
    "version": "1.0.0",
    "group": "usuario_his",
    "name": "Get_usuario_his__order__limit__page__filter_",
    "type": "get",
    "url": "/api/v1/seguridad/usuario_his/?order=&limit=&page=&filter=",
    "title": "Obtiene la lista paginada de usuario_his",
    "description": "<p>Get usuario_his</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "order",
            "description": "<p>Campo por el cual se ordenará el resultado</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de resultados a obtener</p>"
          },
          {
            "group": "Query",
            "type": "Numerico",
            "optional": false,
            "field": "page",
            "description": "<p>Número de página de resultados</p>"
          },
          {
            "group": "Query",
            "type": "Texto",
            "optional": false,
            "field": "filter",
            "description": "<p>Texto a buscar en los registros</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "tipoMensaje",
            "description": "<p>Tipo del mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Mensaje de respuesta.</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "datos",
            "description": "<p>Objeto de con los datos de respuesta</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "total",
            "description": "<p>Numero de objetos categoria</p>"
          },
          {
            "group": "Respuesta",
            "type": "Array",
            "optional": false,
            "field": "resultado",
            "description": "<p>Array de objetos categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\": {\n    \"total\": 21,\n    \"resultado\":[\n      {\n        \"id_usuario_his\": 1,\n        \"codigo\": \"CI\",\n        \"descripcion\": \"Carnet de identidad\",\n        \"estado\": \"ACTIVO\",\n        \"_usuario_creacion\": 5,\n        \"_usuario_modificacion\": null,\n        \"_fecha_creacion\": \"2016-08-29T13:59:22.788Z\",\n        \"_fecha_modificacion\": \"2016-08-29T13:59:22.788Z\"\n      },\n      {\n        \"id_usuario_his\": 2,\n        \"codigo\": \"PAS\",\n        \"descripcion\": \"Pasaporte\",\n        \"estado\": \"ACTIVO\",\n        \"_usuario_creacion\": 5,\n        \"_usuario_modificacion\": null,\n        \"_fecha_creacion\": \"2016-08-29T14:02:19.060Z\",\n        \"_fecha_modificacion\": \"2016-08-29T14:02:19.060Z\"\n      },\n      ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuario_hisRT.js",
    "groupTitle": "usuario_his"
  },
  {
    "version": "1.0.0",
    "group": "usuario_his",
    "name": "Options_usuario_his",
    "type": "options",
    "url": "/api/v1/seguridad/usuario_his",
    "title": "Extrae formly de usuario_his",
    "description": "<p>Options de usuario_his</p>",
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "key",
            "description": "<p>Llave para el campo</p>"
          },
          {
            "group": "Respuesta",
            "type": "Texto",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de etiqueta este puede ser input, select, datepicker, etc</p>"
          },
          {
            "group": "Respuesta",
            "type": "Objeto",
            "optional": false,
            "field": "templateOptions",
            "description": "<p>Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"key\": \"id_usuario_his\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"number\",\n      \"label\": \"Id usuario_his\",\n      \"required\": true\n    },\n  },\n  {\n    \"key\": \"campo\",\n    \"type\": \"input\",\n    \"templateOptions\": {\n      \"type\": \"text\",\n      \"label\": \"Campo\",\n      \"required\": true\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuario_hisRT.js",
    "groupTitle": "usuario_his"
  },
  {
    "version": "1.0.0",
    "group": "usuario_his",
    "name": "Post_usuario_his",
    "type": "post",
    "url": "/api/v1/seguridad/usuario_his",
    "title": "Crear usuario_his",
    "description": "<p>Post para usuario_his</p>",
    "parameter": {
      "fields": {
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "campo",
            "description": "<p>Descripción del campo</p>"
          },
          {
            "group": "Peticion",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario que esta creando</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"campo\": \"xxx\",\n  \"_usuario_creacion\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_usuario_his",
            "description": "<p>Identificador de usuario_his</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creación de usuario_his</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificación de usuario_his</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\":\"EXITO\",\n  \"mensaje\":\"La operación se realizó correctamente.\",\n  \"datos\":{\n    \"id_usuario_his\": \"1\",\n    \"campo\": \"xxx\",\n    \"_usuario_creacion\": \"1\",\n    \"_fecha_creacion\": \" << fecha y hora actual >> \",\n    \"_fecha_modificacion\": \" << fecha y hora actual >> \"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuario_hisRT.js",
    "groupTitle": "usuario_his"
  },
  {
    "version": "1.0.0",
    "group": "usuario_his",
    "name": "Put_usuario_his",
    "type": "put",
    "url": "/api/v1/seguridad/usuario_his/:id",
    "title": "Actualiza un/a usuario_his",
    "description": "<p>Put usuario_his</p>",
    "parameter": {
      "fields": {
        "Parametro": [
          {
            "group": "Parametro",
            "type": "Numerico",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de usuario_his que se quiere actualizar</p>"
          }
        ],
        "Peticion": [
          {
            "group": "Peticion",
            "type": "Texto",
            "optional": false,
            "field": "campo",
            "description": "<p>Decripción del campo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para enviar:",
          "content": "{\n  \"campo\": \"yyy\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Respuesta": [
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "id_usuario_his",
            "description": "<p>Identificador de usuario_his</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_creacion",
            "description": "<p>Identificador del usuario creador</p>"
          },
          {
            "group": "Respuesta",
            "type": "Numerico",
            "optional": false,
            "field": "_usuario_modificacion",
            "description": "<p>Identificador del usuario modificador</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_creacion",
            "description": "<p>Fecha de creacion de usuario_his</p>"
          },
          {
            "group": "Respuesta",
            "type": "FechaHora",
            "optional": false,
            "field": "_fecha_modificacion",
            "description": "<p>Fecha de modificacion de usuario_his</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta del Ejemplo:",
          "content": "HTTP/1.1 200 OK\n{\n  \"tipoMensaje\": \"EXITO\",\n  \"mensaje\": \"La operación se realizó correctamente.\",\n  \"datos\":{\n    \"id_usuario_his\": \"1\",\n    \"campo\": \"yyy\",\n    \"_usuario_creacion\": \"1\",\n    \"_fecha_creacion\": \" << fecha y hora >>\",\n    \"_fecha_modificacion\": \" << fecha y hora actual >> \"\n  }\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/seguridad/usuario_hisRT.js",
    "groupTitle": "usuario_his"
  }
] });
