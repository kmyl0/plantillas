import jwt from "jwt-simple";
import LdapStrategy from "passport-ldapauth";
import passport from "passport";
import crypto from "crypto";
const util = require('../../lib/util');
const bl = require('../../bl/seguridad/usuarioBL');
const Uuid = require('uuid');
const moment = require('moment');

import md5 from "md5"

module.exports = app => {
  /**
   * @apiVersion 1.0.0
   * @api {post} /autenticar Retorna un token, con cierto cifrado para la autenticación de peticiones.
   * @apiGroup Seguridad
   * @apiSuccess {String} retorna un jwt
   * @apiSuccessExample {json} Success
   *
   HTTP/1.1 200 OK
   *
   {  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjoxLCJ1c3VhcmlvIjoiYWRtaW4ifQ.XaaEKFFndFq_LhizdJU-3lLIBRVUxra-LceHb6R57sc"  }
   */

  // configuracion para authenticacion por base de datos
  // TODO: Realizar varios archivos de autencicacion  para diferentes tecnoclogias OAUTH , OAUT2 que estee encapsulado en este archivo
  const usuarios = app.src.db.models.usuario;
  const UsuariosRoles = app.src.db.models.usuario_rol;
  const Roles = app.src.db.models.rol;
  const RolesMenus = app.src.db.models.rol_menu;
  const Menus = app.src.db.models.menu;
  const cfg = app.src.config.config;
  const Unidad = app.src.db.models.unidad;
  const AuthUser = app.src.db.models.auth_user;
  const ConfNotificacion = app.src.db.models.conf_notificacion;


  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const OPTS = cfg.ldap;
  passport.use(new LdapStrategy(OPTS, (payload, done) =>
    done(null, {
      nombre: payload.givenName,
      apellido: payload.sn,
      email: payload.mail,
      uid: payload.uid,
      cargo: payload.title ||'Sin cargo',
    })
  ));

  passport.initialize();

/**
 * Funcion que realiza la autenticacion, sea usando ldap ó localmente; si se usa
 * ldap en el primer acceso al sistema, registra al usuario en el mismo, usando
 * los datos obtenidos del ldap.
 * @param  {Objeto} req           Objeto http de peticion.
 * @param  {Objeto} res           Objeto http de respuesta
 * @param  {Numero} [usar_ldap=1] Bandera para usar autenticacion local o ldap.
 * @return {[type]}               [description]
 */
function xautenticacion(req, res, usar_ldap=1){

  let menu, rol, usuario;
  let roles=[];
  usar_ldap=req.user?1:usar_ldap;

  if(req.body.username && req.body.password){

    // Declara constantes.
    const email= req.body.username;
    const contrasena= req.body.password;
    // const contrasena= 'Developer';

    const condicion ={
      usuario:req.body.username,
    };
    if(!req.user) {
      condicion.contrasena=crypto.createHash("md5").update(req.body.password).digest("hex");
    }
    // Busca al usuario en base a los parametros de "email" y "contrasena".
    usuarios.findOne({where:condicion})
    .then(pUsuario => {
      if(req.user && !pUsuario){

        return bl.procesaUsuario(req.user, UsuariosRoles, Unidad, AuthUser, usuarios)
        .then(pRespuesta => ConfNotificacion.create({
            fid_usuario:pRespuesta.id_usuario,
            _usuario_creacion:pRespuesta.id_usuario,
          })
          .then(pConf => pRespuesta)
        )
        .catch(pErrorProceso => {throw new Error(pErrorProceso)})
      }
      else return pUsuario;
    })
    // Control que verifica si existe el usuario.
    .then(pUsuario => {
      // Verifica si el usuario existe y esta activo.
      if(pUsuario){
        if(pUsuario.estado=='ACTIVO') return usuario=pUsuario;
        else throw new Error("Este usuario esta inactivo.");
      }
      // Si usuario no existe.
      else {
        throw  new Error("Verifique los datos ingresados");
      }
    })
    // Obtiene los roles, para luego posteriormente obtener los menus.
    .then(() => bl.obtenerRoles(UsuariosRoles, Roles, usuario.id_usuario)
      .then(pRespuesta => bl.obtenerMenus(RolesMenus, Menus, pRespuesta)
        .then(pRespuestaMenu => {
          menu=pRespuestaMenu.menu
          // roles.push(pRespuestaMenu.rol)
          roles=pRespuestaMenu.rol;
        })
      )
    )
    // Realiza el armado del objeto respuesta.
    .then(() => {

      const cifrar = {
        id_usuario: usuario.id_usuario,
        usuario: usuario.usuario,
        secret:jwt.encode({
          fecha:moment().tz('America/La_Paz').add(cfg.tiempo_token,'minutes').format(),
          clave:Uuid.v4(),
        }, cfg.jwtSecret),
        clave:Uuid.v4(),
        tiempo:cfg.tiempo_token,
        configuracion:{
          edicion_cuenta: cfg.sistema.edicion_cuenta,
          edicion_contrasena: cfg.sistema.edicion_contrasena,
          habilitar_correo: cfg.sistema.habilitar_correo,
          habilitar_sms: cfg.sistema.habilitar_sms,
          usar_ldap: cfg.sistema.usar_ldap,
        },
        roles,
      }

      const usuarioEnviar={
        id: usuario.id_usuario,
        username: usuario.usuario,
        first_name: usuario.nombres,
        last_name:usuario.apellidos,
        cargo: usuario.cargo,
        doc: usuario.numero_documento,
        email: usuario.email,
        date_joined: usuario._fecha_creacion,
        ldap:req.ldap,
      }

      const datosTemporal={
        user:usuarioEnviar,
        menu:menu.menu,
        menuEntrar:menu.menuEntrar,
        roles,
      }
      const token=jwt.encode(cifrar, app.src.config.config.jwtSecret);
      const sesion= app.get("sesion");

      // sesion[usuario.id_usuario]=token
      sesion[usuario.id_usuario]={
        fecha:moment(moment().tz('America/La_Paz').format()).add(1,'minutes'),
        backup:null,
        token,
      }

      if(!req.user){
        if(usuario.contrasena=== crypto.createHash("md5").update(req.body.password).digest("hex")){
          app.set("sesion", sesion);
          res.status(200).send(util.formatearMensaje("EXITO","Acceso al sistema correcto",datosTemporal,token));
        }
        else res.status(200).send(util.formatearMensaje("INFORMACION","Contraseña incorrecta."));
      }
      else
        res.status(200).send(util.formatearMensaje("EXITO","Acceso al sistema correcto",datosTemporal,token));
    })
    .catch( (error) => {
      res.status(412).send(util.formatearMensaje("ERROR",error));
    });

  }
  // Si no existe datos.
  else{
    res.status(412).send(util.formatearMensaje("INFORMACION","No hay datos para procesar."));
  }
}

//app.post("/autenticar", interceptar,(req,res) => {
app.post("/autenticar", (req,res) => {

  xautenticacion(req, res, 1)
});
function interceptar(req, res, next){
  passport.authenticate("ldapauth", cfg.jwtSession, (err, user, info) => {
    if(err) return next(err)
    if(!user){
      req.ldap=false;
      res.status(412).send(util.formatearMensaje("ERROR","Verifique los datos ingresados."));
    }
    else{
      req.ldap=true;
      req.user = user;
      next();
    }
  })(req,res,next)
}

app.get('/api/v1/refrescar', (req,res) => {

  const tokenBackup = req.headers.authorization.split(" ")[1];
  if(tokenBackup){
    const tokenDecodificado = jwt.decode(tokenBackup, app.get('secretBJA'));
    if(tokenDecodificado){
      // Busca al usuario con su estado 'ACTIVO'.
      usuarios.findOne({
        where:{
          id_usuario:tokenDecodificado.id_usuario,
          estado:'ACTIVO',
        },
      })
      .then(pUsuario => {

        // Verifica si existe el usuario, si es el mismo usuario del token.
        if(pUsuario && pUsuario.usuario == tokenDecodificado.usuario){

          if(tokenDecodificado.secret){
            const secreto = jwt.decode(tokenDecodificado.secret, app.get('secretBJA'));

            // Verifica si la fecha actual es aun valida.
            if(moment().tz('America/La_Paz').format() <= secreto.fecha) {


              const cifrar = {
                id_usuario: tokenDecodificado.id_usuario,
                usuario: tokenDecodificado.usuario,
                secret:jwt.encode({
                  fecha:moment().tz('America/La_Paz').add(cfg.tiempo_token,'minutes').format(),
                  clave:Uuid.v4(),
                }, cfg.jwtSecret),
                clave:Uuid.v4(),
                tiempo:cfg.tiempo_token,
                roles:tokenDecodificado.roles,
                configuracion:{
                  edicion_cuenta: cfg.sistema.edicion_cuenta,
                  edicion_contrasena: cfg.sistema.edicion_contrasena,
                  habilitar_correo: cfg.sistema.habilitar_correo,
                  habilitar_sms: cfg.sistema.habilitar_sms,
                  usar_ldap: cfg.sistema.usar_ldap,
                },
              }

              const token=jwt.encode(cifrar, app.src.config.config.jwtSecret);
              const sesion = app.get("sesion");

              // Actualiza los datos de la sesión.
              sesion[cifrar.id_usuario].token=token;
              sesion[cifrar.id_usuario].backup=tokenBackup;
              sesion[cifrar.id_usuario].fecha=moment(moment().tz('America/La_Paz').format()).add(1,'minutes');

              // Aplica los cambios a la sesión.
              app.set("sesion", sesion);


              res.status(200).send(util.formatearMensaje("EXITO","Acceso al sistema correcto",{},token));

              // Si el token ya expiro.
            } else throw new Error("Siga participando...");
          } else throw new Error("Siga participando...");
          // Si usuario no existe o no es el mismo del token.
        } else throw new Error("Usuario invalido.");

      })
      .catch(pError => res.status(403).send(util.formatearMensaje("ERROR", pError)))
    }
    else res.status(403).send(util.formatearMensaje("ERROR", "Falló la autenticacion"));
  }
  else res.status(403).send(util.formatearMensaje("ERROR", "Falló la autenticacion"));


});


};
