const options = require('sequelize-formly');
const util = require('../../lib/util');
const notificar = require('../../lib/notificacion');

import crypto from "crypto";

module.exports = app => {

  const Usuario = app.src.db.models.usuario;
  const ConfNotificacion = app.src.db.models.conf_notificacion;
  const UsuarioHis = app.src.db.models.usuario_his;
  const Rol = app.src.db.models.rol;
  const UsuarioRol = app.src.db.models.usuario_rol;
  const UsuarioOficina = app.src.db.models.usuario_oficina;
  const cfg = app.src.config.config;
  const Oficina = app.src.db.models.oficina;
  const director = app.src.config.config.sistema.director;
  const direccion = app.src.config.config.sistema.direccion;
  const citeGuia = app.src.config.config.sistema.cite_principal;
  const front = app.src.config.config.front;
  const sequelize = app.src.db.sequelize;


  /**
  @apiVersion 1.0.0
  @apiGroup usuario
  @apiName Get usuario
	@api {get} /api/v1/seguridad/usuario Obtiene listado de usuarios

  @apiDescription Get para usuario, obtiene todos los datos del modelo usuario, con su rol y oficina.

  @apiSuccessExample {Array} Respuesta :
  HTTP/1.1 200 OK
  [
    {
     "id_usuario": 72,
     "fid_unidad": 9,
     "usuario": "acampos",
     "contrasena": "672caf27f5363dc833bda5099d775e89a1",
     "numero_documento": "12345678",
     "nombres": "Ariel",
     "apellidos": "campos",
     "cargo": "Profesional de Desarrollo de Sistemas",
     "email": "acampos@agetic.gob.bo",
     "estado": "ACTIVO",
     "_usuario_creacion": 1,
     "_usuario_modificacion": 1,
     "_fecha_creacion": "2016-12-16T14:47:56.104Z",
     "_fecha_modificacion": "2016-12-16T19:24:17.857Z",
     "usuario_rol": [
       {
         "fid_rol": 3,
         "fid_usuario": 72,
         "id_usuario_rol": 72,
         "estado": "ACTIVO",
         "rol": {
           "id_rol": 3,
           "nombre": "OPERADOR",
           "estado": "ACTIVO"
         }
       }
     ]
   }, ...
  ]
	*/
  /**
  @apiVersion 1.0.0
  @apiGroup usuario
  @apiName Get usuario/?order=&limit=&page=&filter=
	@api {get} /api/v1/seguridad/usuario/?order=&limit=&page=&filter=  Obtiene la lista paginada de usuarios

  @apiDescription Get para usuario, obtiene todos los datos del modelo usuario.

  @apiParam (Query) {Texto} order Campo por el cual se ordenara el resultado
  @apiParam (Query) {Numerico} limit Cantidad de resultados a obtener
  @apiParam (Query) {Numerico} page Número de página de resultados
  @apiParam (Query) {Texto} filter Texto a buscar en los registros

  @apiSuccessExample {Array} Respuesta :
  HTTP/1.1 200 OK
  [
    {
     "id_usuario": 72,
     "fid_unidad": 9,
     "usuario": "acampos",
     "contrasena": "672caf27f5363dc833bda5099d775e89a1",
     "numero_documento": "12345678",
     "nombres": "Ariel",
     "apellidos": "campos",
     "cargo": "Profesional de Desarrollo de Sistemas",
     "email": "acampos@agetic.gob.bo",
     "estado": "ACTIVO",
     "_usuario_creacion": 1,
     "_usuario_modificacion": 1,
     "_fecha_creacion": "2016-12-16T14:47:56.104Z",
     "_fecha_modificacion": "2016-12-16T19:24:17.857Z",
     "usuario_rol": [
       {
         "fid_rol": 3,
         "fid_usuario": 72,
         "id_usuario_rol": 72,
         "estado": "ACTIVO",
         "rol": {
           "id_rol": 3,
           "nombre": "OPERADOR",
           "estado": "ACTIVO"
         }
       }
     ]
   }, ...
  ]
	*/
  app.get('/api/v1/seguridad/usuario', (req,res) => {
    // console.log("INICIANDO LA OBTENCION DE DATOS", req.query);
    // Si existe consultas.
    if(Object.keys(req.query).length != 0){
      if(req.query.limit && req.query.page){
        req.query.offset = (req.query.page - 1) * req.query.limit;
      }
      if(req.query.filter){
        req.query.where = {};
        req.query.where.$or = [
          { usuario: {$iLike: `%${req.query.filter}%`}},
          { numero_documento: {$iLike: `%${req.query.filter}%`}},
        ];
      }
      if(req.query.order) {
        if(req.query.order.charAt(0) == '-'){
          req.query.order = `${req.query.order.substring(1, req.query.order.length)} DESC` ;
        }
      }

      Usuario.findAndCountAll(req.query)
        .then(result => {

          if(result.count>0){
            res.status(200).send(util.formatearMensaje("EXITO","Obtención de datos exitosa.",{total:result.count,resultado:result.rows}));
          }else{
            res.status(200).send(util.formatearMensaje("INFORMACION","No se encontraron registros.",{total:result.count,resultado:result.rows}));
          }

        })
        .catch(error => {
          res.status(412).send(util.formatearMensaje("ERROR",error));
        });
    }
    // Si no existe consultas, obtiene todos los usuarios.
    else {
      const condicion={ estado:'ACTIVO' };

      // Realiza un llamado a la funcion "buscarRolTodos", declarado en el modelo.
      Usuario.buscarRolTodos(UsuarioRol, Rol, UsuarioOficina, Oficina, condicion)
      .then(usuarios => {
        if(usuarios){
          res.status(200).send(util.formatearMensaje("EXITO", "Obtención de datos exitosa.",usuarios));
        }
        else{
          res.status(200).send(util.formatearMensaje("INFORMACION","No existen usuarios."));
        }

      })
      .catch(error => {
        res.status(412).send(util.formatearMensaje("ERROR",error));

      })

    }
  });

  app.get('/api/v1/seguridad/usuario_rol', (req,res) => {
    let campos = ['id_usuario', 'nombres', 'apellidos', 'cargo'];
    if(req.query.fields){
      campos = req.query.fields.split(',');
      if(campos.indexOf('contrasena')>-1) campos.splice(campos.indexOf('contrasena'), 1);

    }
    Usuario.findAll({
      attributes:campos,
      where:{estado:'ACTIVO'},
      order:'nombres ASC',
      include:[{
        model:UsuarioRol,
        as:'usuario_rol',
        attributes:['fid_rol','fid_usuario','id_usuario_rol','estado'],
        where:{estado:'ACTIVO'},
        include:[{
          model:Rol,
          as:'rol',
          attributes:['id_rol', 'nombre','estado'],
        }],
      }],
    })
    .then(pUsuarios => {
      if(pUsuarios){
        res.status(200).send(util.formatearMensaje("EXITO", "Obtención de datos exitosa.",pUsuarios));
      }
      else{
        res.status(200).send(util.formatearMensaje("INFORMACION","No existen usuarios."));
      }
    })
    .catch(pError => res.status(412).send(util.formatearMensaje("ERROR",pError)))



  });

  /**

  @apiVersion 1.0.0
  @apiGroup usuario
  @apiName Get usuario/:id
  @api {get} /api/v1/seguridad/usuario/:id Obtiene un usuario

  @apiDescription Get para usuario, obtiene la información sobre un usuario basado en su id.

  @apiParam (Parametro) {Numerico} id Identificador de usuario que se quiere obtener.

  @apiSuccess (Respuesta) {Numerico} id_usuario Identificador del usuario
  @apiSuccess (Respuesta) {Texto} usuario nombre de usuario
  @apiSuccess (Respuesta) {Texto} contrasena Contraseña del usuario
  @apiSuccess (Respuesta) {Numerico} numero_documento Número de documento del usuario
  @apiSuccess (Respuesta) {Texto} nombres Nombres del usuario
  @apiSuccess (Respuesta) {Texto} apellidos Apellidos del usuario
  @apiSuccess (Respuesta) {Texto} cargo Cargo del usuario
  @apiSuccess (Respuesta) {Numerico} fid_unidad Identificador de la unidad del usuario
  @apiSuccess (Respuesta) {Texto} estado Estado por defecto ACTIVO
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador de usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario que modifica
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificacion del usuario
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación del usuario

  @apiSuccessExample {json} Respuesta :
  HTTP/1.1 200 OK
  {
    "tipoMensaje": "EXITO",
    "mensaje": "Obtención de datos exitosa.",
    "datos": {
      "id_usuario": 141,
      "fid_unidad": null,
      "usuario": "test90",
      "contrasena": "a9186858e1f98cbcc4cc070617a7fa76",
      "numero_documento": "12345678",
      "nombres": "Juan",
      "apellidos": "Perez Cortez",
      "cargo": "tester",
      "email": "test@test.test",
      "estado": "ACTIVO",
      "_usuario_creacion": 1,
      "_usuario_modificacion": null,
      "_fecha_creacion": "2016-12-19T21:14:47.419Z",
      "_fecha_modificacion": "2016-12-19T21:14:47.419Z",
      "usuario_rol": [
        {
          "fid_rol": 1,
          "estado": "ACTIVO",
          "rol": {
            "id_rol": 1,
            "nombre": "ADMIN",
            "estado": "ACTIVO"
          }
        },
        {
          "fid_rol": 2,
          "estado": "ACTIVO",
          "rol": {
            "id_rol": 2,
            "nombre": "JEFE",
            "estado": "ACTIVO"
          }
        }
      ]
    }
  }
  */
  app.get('/api/v1/seguridad/usuario/:id',(req,res) => {
    // console.log("Iniciando la obtencion de un usuario.");
    const id_usuario = req.params.id;

    Usuario.buscarRolUno(id_usuario,UsuarioRol,Rol, UsuarioOficina, Oficina)
    .then(usuario => {

      if(usuario){
        res.status(200).send(util.formatearMensaje("EXITO","Obtención de datos exitosa.",usuario));

      }
      else{
        res.status(200).send(util.formatearMensaje("INFORMACION","No existe el usuario solicitado."));
      }
    })
    .catch(error => {
      // console.log("Error al busca el rol para un usuario.",error);
      res.status(412).send(util.formatearMensaje("ERROR",error));

    })

  });

  app.get('/api/v1/seguridad/usuario/:id/informacion', (req,res) =>
    Usuario.findOne({
      attributes:['fid_unidad'],
      where:{ id_usuario:req.params.id},
      include:[{
        model:UsuarioRol,
        as:'usuario_rol',
        include:[{
          model:Rol,
          as:'rol',
        }],
      }],
    })
    .then(pUnidad => {

      if(pUnidad.fid_unidad != null){

        // TODO: Temporal, revisar el correcto uso
        if(pUnidad.fid_unidad == direccion && req.params.id==director){

          // Busca los Identificadores de usuarios con el rol jefe.
          return UsuarioRol.findAll({
            attributes:['fid_usuario'],
            where:{
              fid_rol:2,
              $and:{
                fid_usuario:{
                  $ne: req.params.id,
                },
              },
            },
          })
          .then(pResultado => {
            const usuarios=[];
            for(const i in pResultado){
              usuarios.push(pResultado[i].dataValues.fid_usuario);
            }

            return Usuario.findAll({
              attributes:['id_usuario','nombres', 'apellidos', 'cargo'],
              where:{
                $or:{
                  fid_unidad:pUnidad.fid_unidad,
                  id_usuario:{
                    $or:usuarios,
                  },
                  $and:{
                    id_usuario:{
                      $ne: req.params.id,
                    },
                  },
                },
              },
              order:[['nombres','ASC']],
            })
            .then(pResultadoJefes =>
              res.status(201).send(util.formatearMensaje("EXITO","Obtencion de dependientes correcta.",{total:pResultadoJefes.length, resultado:pResultadoJefes}))
            )

          })

        }
        else{

          if(pUnidad.fid_unidad == direccion && pUnidad.usuario_rol[0].rol.nombre =="CORRESPONDENCIA"){
            const jefes =[];
            return Rol.findOne({
              attributes:['id_rol'],
              where:{nombre:'JEFE'},
            })
            .then(pRespuestaRol => UsuarioRol.findAll({
              attributes:['fid_usuario'],
              where:{fid_rol:pRespuestaRol.id_rol},
            })
            .then(pRespuestaUR => {
              if(pRespuestaUR){
                return pRespuestaUR.forEach((pItem, pIndice) => {
                  jefes.push(pItem.fid_usuario)
                })
              }
            }))
            .then(() => Usuario.findAll({
              where:{
                id_usuario:{
                  $in:jefes,
                },
              },
              order:'nombres ASC',
            })
            .then(pUsuarios => {
              res.status(201).send(util.formatearMensaje("EXITO","Obtencion de dependientes correcta.",{total:pUsuarios.length, resultado:pUsuarios}))
            }))


          }
          // TODO: filtro para añadir al usuario correspondencia en la derivacion para los jefes.
          // else if(pUnidad.usuario_rol[0].rol.nombre =="JEFE"){
          //   return Usuario.findAll({
          //     attributes:['id_usuario','nombres','apellidos', 'cargo'],
          //     where:{
          //       // fid_unidad:pUnidad.fid_unidad,
          //       $or:[
          //         {
          //           fid_unidad:pUnidad.fid_unidad,
          //         },
          //         {
          //           usuario:'correspondencia'
          //         }
          //       ],
          //       $and:{
          //         id_usuario:{
          //           $ne: req.params.id,
          //         },
          //       },
          //     },
          //     order:[['nombres','ASC']],
          //   })
          //   .then(pResultado =>
          //     res.status(201).send(util.formatearMensaje("EXITO","Obtencion de dependientes correcta.",{total:pResultado.length, resultado:pResultado}))
          //   )
          // }
          else {
            return Usuario.findAll({
              attributes:['id_usuario','nombres','apellidos', 'cargo'],
              where:{
                fid_unidad:pUnidad.fid_unidad,
                $and:{
                  id_usuario:{
                    $ne: req.params.id,
                  },
                },
              },
              order:[['nombres','ASC']],
            })
            .then(pResultado =>
              res.status(201).send(util.formatearMensaje("EXITO","Obtencion de dependientes correcta.",{total:pResultado.length, resultado:pResultado}))
            )
          }


        }
      }
      else res.status(201).send(util.formatearMensaje("EXITO","No tiene dependientes.",{total:0, datos:[]}));


    })
    .catch(pError => {

      res.status(412).send(util.formatearMensaje("ERROR",pError));
    })
  )
  app.post('/api/v1/seguridad/usuario',(req,res) => {

    if(cfg.sistema.usar_ldap == false){
      const usuarioCrear = req.body;
      let usuarioDevolver = {};
      usuarioCrear.contrasena=Math.random().toString(36).slice(-8);
      // Inicia una transaccion.
      sequelize.transaction().then((t) =>  {
        Usuario.findOne({
            where: { usuario: usuarioCrear.usuario },
            transaction: t,
          })
          .then((usuarioEncontrado) =>  {
            if (usuarioEncontrado) {
              throw new Error("Ya existe un usuario registrado.");
            }
            else {

              if(!usuarioCrear.roles || usuarioCrear.roles.length==0){
                throw new Error("Debe elegir minimamente un rol.");
              }
              return Usuario.create(usuarioCrear, {
                  transaction: t,
                });

            }
          })
          .then(pUsuario => {
            usuarioDevolver = pUsuario;
            return ConfNotificacion.create({
              fid_usuario: pUsuario.id_usuario,
              _usuario_creacion:req.body.audit_usuario.id_usuario,
            },{ transaction: t});
          })
          .then(() => {

            // usuarioDevolver=usuario;
            const usuarioRol=[];
            const roles=usuarioCrear.roles;
            if(roles && roles.length>0){
              roles.forEach((item,indice) => {

                const crear={
                  fid_rol:item,
                  fid_usuario:usuarioDevolver.id_usuario,
                  estado:'ACTIVO',
                  _usuario_creacion:usuarioDevolver._usuario_creacion,
                  _fecha_creacion:usuarioDevolver._fecha_creacion }
                usuarioRol.push(crear);

              })

              // Crea las relaciones de usuario - rol.
              return UsuarioRol.bulkCreate(usuarioRol,{transaction:t});

            }
            else{
              return true;
            }

          })
          .then(() =>  {

            const contenido=`
            <div>
              <div style="background-color:#FF3D00; text-align:center">
                <span style="color: white; text-align: center;">Bienvenido al sistema de documentos administrativos</span><br>
                <h1 style="color: white; text-align: center;">.:: ${citeGuia} ::.</h1>
              </div>
              <h3 style="color: #009688;">Registro de usuario:</h3>
              <p>Estas son sus credenciales de acceso, el uso de las mismas es responsabilidad personal.</p>
              <h3 style="color: #009688;">Sus datos de acceso son:</h3>
              <div style="font-size:16px">
                <span style="background-color: #ffffff;"><strong>&nbsp;usuario : &nbsp;<span style="color:#009688; font-size:20px">${usuarioDevolver.usuario}</span></strong></span> <br>
                <span style="background-color: #ffffff;"><strong>&nbsp;clave &nbsp; &nbsp;: &nbsp;<span style="color:#009688; font-size:20px">${usuarioCrear.contrasena}</span></strong></span>
              </div><br>

              <div style="text-align:center; font-size:18px;">
                <a title="ir a ${citeGuia}" style="color:#009688; text-decoration:none; text-align:right;" href="${front}">Acceder ahora</a>
                <p>Si el enlace no funciona, prueba a copiar y pegar lo siguiente en tu navegador: ${front}</p>
              </div>
            </div>

            `
            const json={
              para: usuarioCrear.email,
              titulo:`Bienvenido a ${citeGuia}`,
              html:contenido }

            notificar.correo(json);
            console.log(contenido);
            t.commit();
            res.status(201).send(util.formatearMensaje("EXITO","Creación de usuario correcto.",usuarioDevolver));
          })
          .catch(error  =>  {
            t.rollback();
            res.status(412).send(util.formatearMensaje("ERROR",error));

          });
        })
    } else {
      res.status(201).send(util.formatearMensaje("EXITO","Este servicio no esta disponible por el momento."));
    }
    ;
  });

  /**
  @apiVersion 1.0.0
  @apiGroup usuario
  @apiName Put usuario
  @api {put} /api/v1/seguridad/usuario/:id Actualiza un usuario

  @apiDescription Put para usuario

  @apiParam (Parametro) {Numerico} id Identificador del usuario que se quiere actualizar

  @apiParam (Peticion) {Texto} usuario Nombre de usuario

  @apiParamExample {json} Ejemplo para enviar:
  {
    "usuario": "jperezc"
  }

  @apiSuccess (Respuesta) {Numerico} id_usuario Identificador del usuario
  @apiSuccess (Respuesta) {Numerico} fid_unidad Identificador de la unidad del usuario
  @apiSuccess (Respuesta) {Texto} usuario nombre de usuario
  @apiSuccess (Respuesta) {Texto} contrasena Contraseña del usuario
  @apiSuccess (Respuesta) {Numerico} numero_documento Número de documento del usuario
  @apiSuccess (Respuesta) {Texto} nombres Nombres del usuario
  @apiSuccess (Respuesta) {Texto} apellidos Apellidos del usuario
  @apiSuccess (Respuesta) {Texto} cargo Cargo del usuario
  @apiSuccess (Respuesta) {Texto} estado Estado por defecto ACTIVO
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador de usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario que modifica
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificacion del usuario
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación del usuario

  @apiSuccessExample {json} Respuesta del Ejemplo:
      HTTP/1.1 200 OK
      {
        "id_usuario": 142,
        "fid_unidad": null,
        "usuario": "jperezc",
        "contrasena": "67a9d6ae80e14dd6156c4706f7c9cef8",
        "numero_documento": "12345678",
        "nombres": "Juan",
        "apellidos": "Perez Cortez",
        "cargo": "tester",
        "email": "test@test.test",
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_usuario_modificacion": null,
        "_fecha_creacion": "2016-12-19T21:21:23.567Z",
        "_fecha_modificacion": "2016-12-19T21:28:18.016Z"
      }

  @apiSampleRequest off

  */
  app.put('/api/v1/seguridad/usuario/:id',(req,res) => {
    console.log("inicinado la modificacion de datos del usuario", req.body);
    const usuario = req.body;

    let usuarioDevolver = {};
    let usuarioRespuesta = {};
    let pwd=null;



    // Este dato es recepcionado en el caso de regeneracion de contraseña, ejecutado por el administrador.
    if(usuario.regenerar!= undefined){

      // let flag=false;
      // const roles = req.body.audit_usuario.roles;
      // for(let i = 0; i<roles.length; i++){
      //   const rol = roles[i].rol.nombre
      //   if(rol=='ADMIN'){
      //     flag = true;
      //     break;
      //   }
      // }
      // // TODO: Temporal, en testeo
      // if(!flag) throw new Error("La modificacion no esta disponible en este momento.")

      // Genera aleatoriamente una cadena alfanumerica de 8 digitos.
      pwd=Math.random().toString(36).slice(-8);

      // Encripta la contraseña.
      usuario.contrasena=crypto.createHash("md5").update(pwd).digest("hex");
    }

    // Declara la condicion de busqueda.
    const condiciones = { where: { id_usuario: req.params.id } };


    // Este dato es recepcionado en el caso de cambio de contraseña por el usuario.
    if( usuario.verificarContrasena != undefined && cfg.sistema.edicion_contrasena == true ){
      usuario.contrasena = crypto.createHash("md5").update(usuario.contrasena).digest("hex");
      condiciones.where.contrasena = crypto.createHash("md5").update(usuario.verificarContrasena).digest("hex");
    }
    else{
      delete usuario.contrasena;
    }


    sequelize.transaction().then((t) =>  {
    // Busca al usuario.
    Usuario.findOne(condiciones)
      .then((usuarioRespuestaBusqueda) =>  {


        if(usuarioRespuestaBusqueda){
          usuarioRespuesta=usuarioRespuestaBusqueda;
          if(usuario.roles && usuario.roles.length>0){
            return UsuarioRol.destroy({where: {fid_usuario: req.params.id}},{ transaction: t})
          }
        }
        else throw new Error("La contraseña actual no es valida.");

      })
      // Actualiza la informacion del usuario.
      .then(filas => {

        const actual=JSON.parse(JSON.stringify(usuario));
        if(cfg.sistema.edicion_cuenta==true ){

          return usuarioRespuesta.updateAttributes(usuario,{transaction:t});
        } else {
          throw new Error("Este servicio no esta disponible por el momento.");
        }

      })
      // Inserta las relaciones usuario - rol del usuario.
      .then(respuesta => {
        usuarioDevolver = respuesta;

        if(usuario.roles && usuario.roles.length>0){

          const usuarioRol=[];
          usuario.roles.forEach((item, indice) => {
            const crear={
              fid_rol:item,
              fid_usuario:usuarioDevolver.id_usuario,
              _usuario_creacion:usuarioDevolver._usuario_modificacion }
            usuarioRol.push(crear);
          });

          return UsuarioRol.bulkCreate(usuarioRol,{transaction:t})

        }
        else return true;

      })
      // Realiza el commit de la transacción.
      .then(() => {

        t.commit();
        return res.status(200).send(util.formatearMensaje("EXITO","Actualización de datos exitosa.",usuarioRespuesta));
      })
      .catch(error  =>  {
        t.rollback();
        res.status(412).send(util.formatearMensaje("ERROR",error));
      });
    });
  });


  app.put('/api/v1/seguridad/recuperar',(req,res) => {

    if(!cfg.sistema.usar_ldap){

      const usuario=req.body;

      // Genera una nueva contraseña.
      const pwd=Math.random().toString(36).slice(-8);

      // Buscando al usuario.
      Usuario.findOne({ where:{
        id_usuario: req.body.audit_usuario.id_usuario,
      } })
      .then(pRespuesta => {
        // console.log("Respuesta de la busqueda", pRespuesta);
        if(pRespuesta) return pRespuesta;
        else throw new Error("Verifique los datos introducidos.")
      })
      .then(pRespuesta => {

        pRespuesta.contrasena=crypto.createHash("md5").update(pwd).digest("hex");
        pRespuesta._usuario_modificacion=pRespuesta.id_usuario;

        return util.historico(Usuario, UsuarioHis, pRespuesta.dataValues, pRespuesta._previousDataValues)
        .then(pRespuestaHistorico => pRespuestaHistorico)
        .catch(pErrorHistorico => {
          throw new Error(pErrorHistorico);
        })
      })
      .then(pRespuesta => {

        const contenido=`
        <div>
        <div style="background-color:#FF3D00; text-align:center">
        <span style="color: white; text-align: center;">Bienvenido al sistema</span><br>
        <h1 style="color: white; text-align: center;">.:: ${citeGuia} ::.</h1>
        </div>
        <h3 style="color: #009688;">Recuperacion de contrase&ntilde;a:</h3>
        <p>Este correo ha sido generado, como una forma de recuperacion de la contrase&ntilde;a</p>
        <h3 style="color: #009688;">Sus datos de acceso son:</h3>
        <div style="font-size:16px">
        <span style="background-color: #ffffff;"><strong>&nbsp;usuario : &nbsp;<span style="color:#009688; font-size:20px">${pRespuesta.usuario}</span></strong></span> <br>
        <span style="background-color: #ffffff;"><strong>&nbsp;clave &nbsp; &nbsp;: &nbsp;<span style="color:#009688; font-size:20px">${pwd}</span></strong></span>
        </div><br>

        <div style="text-align:center; font-size:18px;">
        <a title="ir a ${citeGuia}" style="color:#009688; text-decoration:none; text-align:right;" href="${front}">Acceder ahora</a>
        <p>Si el enlace no funciona, prueba a copiar y pegar lo siguiente en tu navegador: ${front}</p>
        </div>
        </div>
        `
        const json={
          para: pRespuesta.email,
          titulo:'Recuperación de Contraseña',
          html:contenido }

          notificar.correo(json);
          res.status(200).send(util.formatearMensaje('EXITO', "Se ha enviado un correo con la informacion necesaria,\n revise su correo electronico"));
        })
        .catch(pError => {
          res.status(412).send(util.formatearMensaje('ERROR',pError));
        })
    } else {
      res.status(200).send(util.formatearMensaje('EXITO', "Esta opcion no esta disponible por el momento."));
    }


  })

  /**
  @apiVersion 1.0.0
  @apiGroup usuario
  @apiName Delete usuario
  @api {delete} /api/v1/seguridad/usuario/:id Eliminar un usuario

  @apiDescription Delete para usuario

  @apiParam (Parametro) {Numerico} id Identificador de usuario que se quiere eliminar.

  @apiSuccessExample {json} Respuesta:
      HTTP/1.1 200 OK
      {
      }
  */
  app.delete('/api/v1/seguridad/usuario/:id',(req,res) => {
    // console.log("Iniciando la eliminacion de usuario.");
    const idUsuario=req.params.id;

    // TODO: Una vez solucionado el problema de integridad referencial en la base de datos, remover el control manual de verificacion en usuario_rol.

    UsuarioRol.findAll({ where:{ fid_usuario:idUsuario } })
    .then(resultado => {
      if(resultado.length>0){
          res.status(405).send(util.formatearMensaje("ERROR","No se puede eliminar el usuario, por integridad."));
      }

      else{
        Usuario.destroy({ where:{ id_usuario:idUsuario } })
        .then(resultadoEliminar => {
          if(resultadoEliminar==0)
            resultadoEliminar="0, El usuario a eliminar no existe."
            res.status(200).send(util.formatearMensaje("EXITO",`Registros eliminados ${resultadoEliminar}`));

        })
        .catch(error => {
          console.log("Error al eliminar usuario.",error);
            res.status(412).send(util.formatearMensaje("ERROR",error));

        });
      }
    })
    .catch(errorBusqueda => {
      console.log("Error en la busqueda de usuario-rol",errorBusqueda);
      res.status(412).send(util.formatearMensaje("ERROR",error));

    });


  });

  /**
   * @apiVersion 1.0.0
   * @api {options} /api/v1/seguridad/usuario Options
   * @apiName OptionsUsuarios
   * @apiGroup usuario
   * @apiDescription Para devolver el options de Usuario
   *
   * @apiParam {Ninguno} Sin Parámetros
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   * [
   *    {
   *      "key": "id_usuario",
   *      "type": "input",
   *      "templateOptions": {
   *        "type": "number",
   *        "label": "id_usuario",
   *        "required": true
   *      }
   *    },
   *    {
   *      "key": "nombres",
   *      "type": "input",
   *      "templateOptions": {
   *        "type": "text",
   *        "label": "nombres",
   *        "required": false
   *      }
   *    },
   *    {
   *      "key": "apellidos",
   *      "type": "input",
   *      "templateOptions": {
   *        "type": "text",
   *        "label": "apellidos",
   *        "required": false
   *      }
   *    },
   *    {
   *      "key": "email",
   *      "type": "input",
   *      "templateOptions": {
   *        "type": "text",
   *        "label": "email",
   *        "required": true
   *      }
   *    },
   *    {
   *      "key": "usuario",
   *      "type": "input",
   *        "type": "text",
   *      "templateOptions": {
   *        "label": "usuario",
   *        "required": true
   *      }
   *    },
   *    {
   *      "key": "contrasena",
   *      "type": "input",
   *      "templateOptions": {
   *        "type": "text",
   *        "label": "contrasena",
   *        "required": true
   *      }
   *    },
   *    {
   *      "key": "estado",
   *      "type": "input",
   *      "templateOptions": {
   *        "type": "text",
   *        "label": "Estado",
   *        "required": true
   *      }
   *    },
   *    {
   *      "key": "fecha_creacion",
   *      "type": "datepicker",
   *      "templateOptions": {
   *        "type": "datetime-local",
   *        "label": "fecha_creacion",
   *        "required": true
   *      }
   *    },
   *    {
   *      "key": "fecha_modificacion",
   *      "type": "datepicker",
   *      "templateOptions": {
   *        "type": "datetime-local",
   *        "label": "fecha_modificacion",
   *        "required": true
   *      }
   *    },
   *    {
   *      "key": "id_medico",
   *      "type": "select",
   *      "templateOptions": {
   *        "type": "number",
   *        "label": "id_medico",
   *        "required": false,
   *        "options": [
   *          {
   *            "name": "2 null",
   *            "value": 4
   *          },
   *          {
   *            "name": "1 foto.png",
   *            "value": 1
   *          }
   *        ]
   *      }
   *    },
   *    {
   *      "key": "id_persona",
   *      "type": "select",
   *      "templateOptions": {
   *        "type": "number",
   *        "label": "id_persona",
   *        "required": true,
   *        "options": [
   *          {
   *            "name": "AGETIC AGETIC",
   *            "value": 1
   *          },
   *          {
   *            "name": "JUDITH ALEJANDRA CALIZAYA",
   *            "value": 2
   *          }
   *        ]
   *      }
   *    }
   * ]
   *
   */
  app.route('/api/v1/seguridad/usuario').options(options.formly(Usuario, app.src.db.models));
  app.route('/api/v1/seguridad/usuario_rol').options(options.formly(Usuario, app.src.db.models));
}
