import sequelizeHandlers from "sequelize-handlers";
import sequelizeFormly from "sequelize-formly";
import fs from "fs";
const moment = require('moment');


module.exports = app => {
  const documento = app.src.db.models.documento;
  const unidad = app.src.db.models.unidad;
  const usuario = app.src.db.models.usuario;
  const correlativo = app.src.db.models.correlativo;
  const historial_flujo = app.src.db.models.historial_flujo;
  const confNotificacion = app.src.db.models.conf_notificacion;
  const notificacion = app.src.db.models.notificacion;
  const util = require('../../lib/util');
  const correo = require('../../lib/correo');
  const notificar = require('../../lib/notificacion');
  const archivo = require('../../lib/archivos');
  const bl = require('../../bl/plantillasFormly/documentoBL');
  const blm = require('../../bl/monitor/monitorBL');
  const sequelize = app.src.db.sequelize;
  const rutaExternos = app.src.config.config.ruta_externos;
  const director = app.src.config.config.sistema.director;
  const citeGuia = app.src.config.config.sistema.cite_principal;
  const citeCeros = app.src.config.config.sistema.cite_ceros;

/**
  @apiVersion 1.0.0
  @apiGroup documento
  @apiName Post documento
  @api {post} /api/v1/plantillasFormly/documento Crear documento

  @apiDescription Post para documento

  @apiParam (Peticion) {Texto} nombre Nombre del documento
  @apiParam (Peticion) {Texto} plantilla Plantilla del documento
  @apiParam (Peticion) {Texto} plantilla_valor Valores de la plantilla
  @apiParam (Peticion) {Numerico} _usuario_creacion Identificador del usuario que esta creando

  @apiParamExample {json} Ejemplo para enviar:
  {
    "nombre": "INSTRUCTIVO",
    "plantilla": "[]",
    "plantilla_valor": "{}",
    "_usuario_creacion": 1
  }

  @apiSuccess (Respuesta) {Numerico} id_documento Identificador de documento
  @apiSuccess (Respuesta) {Texto} nombre Nombre del documento
  @apiSuccess (Respuesta) {Texto} plantilla Plantilla del documento
  @apiSuccess (Respuesta) {Texto} plantilla_valor Valores de la plantilla
  @apiSuccess (Respuesta) {Texto} estado Estado del registro
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de documento
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de documento

  @apiSuccessExample {json} Respuesta del Ejemplo:
  HTTP/1.1 200 OK
    {
      "tipoMensaje": "EXITO",
      "mensaje": "La operación se realizó correctamente.",
      "datos": {
        "id_documento": 3,
        "nombre": "INSTRUCTIVO",
        "plantilla": "[]",
        "plantilla_valor": "{}",
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_fecha_modificacion": "2016-12-02T20:16:10.276Z",
        "_fecha_creacion": "2016-12-02T20:16:10.276Z",
        "_usuario_modificacion": null
      }
    }

  @apiSampleRequest off
*/
  app.post('/api/v1/plantillasFormly/documento', (req, res) => {
    let xdoc;
    const msg = "La operación se realizó correctamente.";
    const sw = req.body.sw;
    sw.xenviar = !sw.enviado && sw.enviar;

    sequelize.transaction().then(t => {
        const tr = { transaction: t };
        bl.verificarExternos(req.body,rutaExternos)
        .then(pValores => {
          if(pValores) req.body.plantilla_valor=pValores;

          return documento.create(req.body, tr)
          .then( resp => {
            xdoc = resp;
            return bl.actualizarGrupo(documento, xdoc, tr)
          })
          .then( resp => {
            if(sw.xenviar && sw.es_respuesta){
              return bl.documento_crear(historial_flujo, xdoc.documento_padre, xdoc._usuario_creacion, tr)
            }
            return
          })
          .then( resp => {
            if(sw.xenviar){
              return bl.documento_enviar(historial_flujo, xdoc, tr, director)
              .then(() => t.commit())
              .finally(() =>  notificar.enviar(confNotificacion, usuario,notificacion,historial_flujo,xdoc,'enviado',{}))
            }
            return
          })
        })
        .then( resp => {
          if(!sw.xenviar) t.commit();
          res.send(util.formatearMensaje("EXITO", msg, xdoc));
        })
        .catch(e => {
          t.rollback();
          res.status(412).send(util.formatearMensaje("ERROR", e));
        })
    });


  });




/**
  @apiVersion 1.0.0
  @apiGroup documento
  @apiName Get documento/:id
  @api {get} /api/v1/plantillasFormly/documento/:id Obtiene un/a documento

  @apiDescription Get documento, obtiene un/a documento

  @apiParam (Parametro) {Numerico} id Identificador de documento que se quiere obtener

  @apiSuccess (Respuesta) {Numerico} id_documento Identificador de documento
  @apiSuccess (Respuesta) {Texto} nombre Nombre del documento
  @apiSuccess (Respuesta) {Texto} plantilla Plantilla del documento
  @apiSuccess (Respuesta) {Texto} plantilla_valor Valores de la plantilla
  @apiSuccess (Respuesta) {Texto} estado Estado del registro
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de documento
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de documento

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
    {
      "tipoMensaje": "EXITO",
      "mensaje": "La operación se realizó correctamente.",
      "datos": {
        "id_documento": 1,
        "nombre": "INSTRUCTIVO",
        "plantilla": "[{\"type\":\"textoh2\",\"key\":\"textoh2\",\"className\":\"ap-text-center\",\"templateOptions\":{\"label\":\"INSTRUCTIVO\"}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"CITE:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"A:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"REF:\",\"disabled\":false,\"required\":true}},{\"type\":\"datepicker\",\"key\":\"inputDatePicker\",\"templateOptions\":{\"label\":\"FECHA:\",\"disabled\":false,\"required\":true}},{\"type\":\"textarea\",\"key\":\"inputTextArea\",\"templateOptions\":{\"label\":\"Contenido:\",\"rows\":6,\"grow\":false,\"required\":true}}]",
        "plantilla_valor": "{\"input-0\":\"AGETIC/UAF/002/2016\",\"input-1\":\"Todo el personal de la AGETIC\",\"input-2\":\"SOLICITUD DE VIATICOS\",\"datepicker-0\":\"2016-12-01T04:00:00.000Z\",\"textarea-0\":\"Se comunica al personal de la Agencia de Gobierno Electrónico y Tecnologías de Información y Comunicación que sea declarado en Comisión de Viaje debe realizar los requerimientos de pasajes y viáticos por separado para facilitar el pago:\\n\\nPara pasajes: Señalar los nombres completos de los pasajeros, la cedula de identidad, el lugar, la fecha de ida y de retorno debidamente justificado. Adjuntar la reserva del pasaje con el precio referencial \\n\\nEjemplo: Soila Ana Vaca Rodríguez, C.I. 9999999 L.P. y Juan Carlos Perico Pericon C.I. 8888888 L.P. viajaran a Tarija el 9/02/2015 y regresaran 10/02/2015 para la instalación de la red en el SIN. \\n\\nPara viáticos: Llenar el formulario correspondiente adjuntando el Memorandum y la certificación presupuestaria . Para el calculo de pago de viatico se considera un importe bruto de Bs. 371.- por día  sujetos a retencion del 13% RC IVA (Excepto el Director General Ejecutivo)\\n\\nEs cuanto informo para fines consiguientes\\n\\n\\nLa Paz, 1 de diciembre de 2016\"}",
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_usuario_modificacion": 1,
        "_fecha_creacion": "2016-12-01T19:09:18.329Z",
        "_fecha_modificacion": "2016-12-01T19:34:14.745Z"
      }
    }
*/
  app.get('/api/v1/plantillasFormly/documento/:id', Validar, (req,res) => {
    console.log("Iniciando con la obtencion del documento");

    documento.findOne({
      where:{
        id_documento:req.params.id,
        estado:{$ne:'ELIMINADO'},
      },
    })
    .then(pDocumento => {
      if(pDocumento)
        res.status(200).send(util.formatearMensaje("EXITO","La operación se realizó correctamente.", pDocumento))
      else throw new Error("El documento solicitado no esta disponible.");
    })
    .catch(pError => res.status(412).send(util.formatearMensaje("ERROR",pError)))
  });

  /**
   * Funcion que realiza el registro de la visita, validando si esta relacionado con el usuario.
   * @param {[type]}   req  [description]
   * @param {[type]}   res  [description]
   * @param {Function} next [description]
   */
  function Validar(req,res, next){
    // console.log("Iniciando la validacion");
    const usuarioPeticion = req.body.audit_usuario;
    let
    cite = false,
    resultado = null;

    documento.findById(req.params.id)
    .then(pDocumento => {
      if(pDocumento){
        resultado= pDocumento;

        if(pDocumento.estado != 'NUEVO'){
          cite = (pDocumento.estado == 'ENVIADO')? false : true;
          return bl.validarPeticionGet(documento, historial_flujo, pDocumento, usuarioPeticion)
          .then(pValido => {
            req.body.relacionado=pValido;
          })
        }
        else if (pDocumento.estado == 'NUEVO') {
          if(pDocumento._usuario_creacion == usuarioPeticion.id_usuario) req.body.relacionado=true;
          else req.body.relacionado=false;
        }
        else req.body.relacionado=false;

      }
      else req.body.relacionado=false;
    })
    .then(() => {
      // console.log("Iniciando con la obtencion de datos del cliente1", req.connection.remoteAddress);
      // console.log("Iniciando con la obtencion de datos del cliente2", req.headers['x-forwarded-for']);
      let rmip = req.connection.remoteAddress;
      let miIp = rmip.substr(rmip.lastIndexOf(':')+1,rmip.length);
      const log = {
        fid_usuario:req.body.audit_usuario.id_usuario,
        fid_documento:req.params.id,
        ip:[miIp],
        relacionado:req.body.relacionado,
        cite,
      }
      blm.registrarVisita(app.src.db.models,log)
      .finally(() => {
        next();
      })
    })
    .catch(pError => {
      console.log("Error al validar");
      res.status(412).send(util.formatearMensaje("ERROR",pError))
    })
  }


/**
  @apiVersion 1.0.0
  @apiGroup documento
  @apiName Get documento
  @api {get} /api/v1/plantillasFormly/documento/ Obtiene la lista completa de documento

  @apiDescription Get documento

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
  {
  "tipoMensaje": "EXITO",
  "mensaje": "La operación se realizó correctamente.",
  "datos": {
    "total": 2,
    "resultado": [
      {
        "id_documento": 1,
        "nombre": "INSTRUCTIVO",
        "plantilla": "[{\"type\":\"textoh2\",\"key\":\"textoh2\",\"className\":\"ap-text-center\",\"templateOptions\":{\"label\":\"INSTRUCTIVO\"}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"CITE:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"A:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"REF:\",\"disabled\":false,\"required\":true}},{\"type\":\"datepicker\",\"key\":\"inputDatePicker\",\"templateOptions\":{\"label\":\"FECHA:\",\"disabled\":false,\"required\":true}},{\"type\":\"textarea\",\"key\":\"inputTextArea\",\"templateOptions\":{\"label\":\"Contenido:\",\"rows\":6,\"grow\":false,\"required\":true}}]",
        "plantilla_valor": "{\"input-0\":\"AGETIC/UAF/002/2016\",\"input-1\":\"Todo el personal de la AGETIC\",\"input-2\":\"SOLICITUD DE VIATICOS\",\"datepicker-0\":\"2016-12-01T04:00:00.000Z\",\"textarea-0\":\"Se comunica al personal de la Agencia de Gobierno Electrónico y Tecnologías de Información y Comunicación que sea declarado en Comisión de Viaje debe realizar los requerimientos de pasajes y viáticos por separado para facilitar el pago:\\n\\nPara pasajes: Señalar los nombres completos de los pasajeros, la cedula de identidad, el lugar, la fecha de ida y de retorno debidamente justificado. Adjuntar la reserva del pasaje con el precio referencial \\n\\nEjemplo: Soila Ana Vaca Rodríguez, C.I. 9999999 L.P. y Juan Carlos Perico Pericon C.I. 8888888 L.P. viajaran a Tarija el 9/02/2015 y regresaran 10/02/2015 para la instalación de la red en el SIN. \\n\\nPara viáticos: Llenar el formulario correspondiente adjuntando el Memorandum y la certificación presupuestaria . Para el calculo de pago de viatico se considera un importe bruto de Bs. 371.- por día  sujetos a retencion del 13% RC IVA (Excepto el Director General Ejecutivo)\\n\\nEs cuanto informo para fines consiguientes\\n\\n\\nLa Paz, 1 de diciembre de 2016\"}",
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_usuario_modificacion": 1,
        "_fecha_creacion": "2016-12-01T19:09:18.329Z",
        "_fecha_modificacion": "2016-12-01T19:34:14.745Z"
      },
      {
        "id_documento": 2,
        "nombre": "CIRCULAR",
        "plantilla": "[{\"type\":\"textoh1\",\"key\":\"textoh1\",\"className\":\"ap-text-center\",\"templateOptions\":{\"label\":\"CIRCULAR\"}},{\"type\":\"textoh3\",\"key\":\"textoh3\",\"className\":\"ap-text-center\",\"templateOptions\":{\"label\":\"AGETIC/UAF N°083/2016\"}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"DE:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"A:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"REF:\",\"disabled\":false,\"required\":true}},{\"type\":\"datepicker\",\"key\":\"inputDatePicker\",\"templateOptions\":{\"label\":\"FECHA:\",\"disabled\":false,\"required\":true}},{\"type\":\"parrafo\",\"key\":\"textParrafo\",\"className\":\"ap-text-justify\",\"templateOptions\":{\"label\":\"Dando cumplimiento a lo establecido en el Decreto Supremo N° 21531 de fecha 29 de junio de 1995 y la reglamentación relativa al Régimen Complementario al Impuesto al Valor Agregado (RC-IVA), así como la remisión del formulario 110 RC-IVA dependientes, todos los servidores públicos deben tomar en cuenta:\"}},{\"type\":\"parrafo\",\"key\":\"textParrafo\",\"className\":\"ap-text-justify\",\"templateOptions\":{\"label\":\"1. El formulario RC-IVA 110 debidamente llenado tanto para el pago de sueldos como para refrigerios deben ser presentados desde el 01 hasta el día 15 de cada mes o el siguiente día hábil en caso de ser fin de semana o feriado. \\n2. La elaboración de los formularios debe realizarse en el programa Facilito, el cual está instalado en todos los computadores.\"}},{\"type\":\"parrafo\",\"key\":\"textParrafo\",\"className\":\"ap-text-justify\",\"templateOptions\":{\"label\":\"La Unidad Administrativa Financiera mediante Recursos Humanos se pone a disposición de todos los funcionarios que tengan dudad o requieran mayor información a la presente circular.\"}},{\"type\":\"parrafo\",\"key\":\"textParrafo\",\"className\":\"ap-text-left\",\"templateOptions\":{\"label\":\"Atentamente,\"}}]",
        "plantilla_valor": "{\"datepicker-0\":\"2016-12-01T04:00:00.000Z\",\"input-0\":\"Carmen Fedra Valverde\",\"input-1\":\"Todo el personal de planta de la Agencia de Gobierno Electronico y Tecnologías de Información y Comunicación\",\"input-2\":\"FORMULARIOS RC-IVA\"}",
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_usuario_modificacion": null,
        "_fecha_creacion": "2016-12-01T19:36:18.489Z",
        "_fecha_modificacion": "2016-12-01T19:36:18.489Z"
      }
    ]
  }
 }

*/

/**
  @apiVersion 1.0.0
  @apiGroup documento
  @apiName Get documento/?order=&limit=&page=&filter=
  @api {get} /api/v1/plantillasFormly/documento/?order=&limit=&page=&filter= Obtiene la lista paginada de documento

  @apiDescription Get documento

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
    "total": 2,
    "resultado": [
      {
        "id_documento": 1,
        "nombre": "INSTRUCTIVO",
        "plantilla": "[{\"type\":\"textoh2\",\"key\":\"textoh2\",\"className\":\"ap-text-center\",\"templateOptions\":{\"label\":\"INSTRUCTIVO\"}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"CITE:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"A:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"REF:\",\"disabled\":false,\"required\":true}},{\"type\":\"datepicker\",\"key\":\"inputDatePicker\",\"templateOptions\":{\"label\":\"FECHA:\",\"disabled\":false,\"required\":true}},{\"type\":\"textarea\",\"key\":\"inputTextArea\",\"templateOptions\":{\"label\":\"Contenido:\",\"rows\":6,\"grow\":false,\"required\":true}}]",
        "plantilla_valor": "{\"input-0\":\"AGETIC/UAF/002/2016\",\"input-1\":\"Todo el personal de la AGETIC\",\"input-2\":\"SOLICITUD DE VIATICOS\",\"datepicker-0\":\"2016-12-01T04:00:00.000Z\",\"textarea-0\":\"Se comunica al personal de la Agencia de Gobierno Electrónico y Tecnologías de Información y Comunicación que sea declarado en Comisión de Viaje debe realizar los requerimientos de pasajes y viáticos por separado para facilitar el pago:\\n\\nPara pasajes: Señalar los nombres completos de los pasajeros, la cedula de identidad, el lugar, la fecha de ida y de retorno debidamente justificado. Adjuntar la reserva del pasaje con el precio referencial \\n\\nEjemplo: Soila Ana Vaca Rodríguez, C.I. 9999999 L.P. y Juan Carlos Perico Pericon C.I. 8888888 L.P. viajaran a Tarija el 9/02/2015 y regresaran 10/02/2015 para la instalación de la red en el SIN. \\n\\nPara viáticos: Llenar el formulario correspondiente adjuntando el Memorandum y la certificación presupuestaria . Para el calculo de pago de viatico se considera un importe bruto de Bs. 371.- por día  sujetos a retencion del 13% RC IVA (Excepto el Director General Ejecutivo)\\n\\nEs cuanto informo para fines consiguientes\\n\\n\\nLa Paz, 1 de diciembre de 2016\"}",
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_usuario_modificacion": 1,
        "_fecha_creacion": "2016-12-01T19:09:18.329Z",
        "_fecha_modificacion": "2016-12-01T19:34:14.745Z"
      },
      {
        "id_documento": 2,
        "nombre": "CIRCULAR",
        "plantilla": "[{\"type\":\"textoh1\",\"key\":\"textoh1\",\"className\":\"ap-text-center\",\"templateOptions\":{\"label\":\"CIRCULAR\"}},{\"type\":\"textoh3\",\"key\":\"textoh3\",\"className\":\"ap-text-center\",\"templateOptions\":{\"label\":\"AGETIC/UAF N°083/2016\"}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"DE:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"A:\",\"disabled\":false,\"required\":true}},{\"type\":\"input\",\"key\":\"inputText\",\"templateOptions\":{\"type\":\"text\",\"label\":\"REF:\",\"disabled\":false,\"required\":true}},{\"type\":\"datepicker\",\"key\":\"inputDatePicker\",\"templateOptions\":{\"label\":\"FECHA:\",\"disabled\":false,\"required\":true}},{\"type\":\"parrafo\",\"key\":\"textParrafo\",\"className\":\"ap-text-justify\",\"templateOptions\":{\"label\":\"Dando cumplimiento a lo establecido en el Decreto Supremo N° 21531 de fecha 29 de junio de 1995 y la reglamentación relativa al Régimen Complementario al Impuesto al Valor Agregado (RC-IVA), así como la remisión del formulario 110 RC-IVA dependientes, todos los servidores públicos deben tomar en cuenta:\"}},{\"type\":\"parrafo\",\"key\":\"textParrafo\",\"className\":\"ap-text-justify\",\"templateOptions\":{\"label\":\"1. El formulario RC-IVA 110 debidamente llenado tanto para el pago de sueldos como para refrigerios deben ser presentados desde el 01 hasta el día 15 de cada mes o el siguiente día hábil en caso de ser fin de semana o feriado. \\n2. La elaboración de los formularios debe realizarse en el programa Facilito, el cual está instalado en todos los computadores.\"}},{\"type\":\"parrafo\",\"key\":\"textParrafo\",\"className\":\"ap-text-justify\",\"templateOptions\":{\"label\":\"La Unidad Administrativa Financiera mediante Recursos Humanos se pone a disposición de todos los funcionarios que tengan dudad o requieran mayor información a la presente circular.\"}},{\"type\":\"parrafo\",\"key\":\"textParrafo\",\"className\":\"ap-text-left\",\"templateOptions\":{\"label\":\"Atentamente,\"}}]",
        "plantilla_valor": "{\"datepicker-0\":\"2016-12-01T04:00:00.000Z\",\"input-0\":\"Carmen Fedra Valverde\",\"input-1\":\"Todo el personal de planta de la Agencia de Gobierno Electronico y Tecnologías de Información y Comunicación\",\"input-2\":\"FORMULARIOS RC-IVA\"}",
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_usuario_modificacion": null,
        "_fecha_creacion": "2016-12-01T19:36:18.489Z",
        "_fecha_modificacion": "2016-12-01T19:36:18.489Z"
      }
    ]
  }
}

*/
  app.get('/api/v1/plantillasFormly/documento', sequelizeHandlers.query(documento));


  function filtros (req,res,next){
      if(req.query.filter!='')
        util.consulta(req,res,next,documento)
      else next();
  }


  app.post('/api/v1/plantillasFormly/documentoPDF', (req, res) => {
      let dirArch = '.';
      if(req.body.cite && req.body.cite.indexOf('/public/externos/')==0)
        dirArch += req.body.cite
      else dirArch += `/public/documentos/${req.body.cite}`;
      const nombre= req.body.cite.substr(0,req.body.cite.indexOf('.pdf'));
      const usuarioPeticion = req.body.audit_usuario;
      const msg = "Usted no esta autorizado para ver este documento.";

      fs.readFile(dirArch, (pError, pData) => {

        if(pError){
          pError=(process.env.NODE_ENV=='production')?"No se pudo obtener el documento":pError;
          res.status(412).send(util.formatearMensaje("ERROR",pError));
        }
        else res.send(pData);
      });
  })

  app.get('/api/v1/plantillasFormly/documento/:id/misdocumentos',  filtros, (req, res) => {

    const documentos=[];
    const estFlujo = [];
    const estDoc = [];
    const xdocs = {};
    const estVal = {
        'nuevo': 'NUEVO',
        'envia': 'ENVIADO',
        'recha': 'RECHAZADO',
        // 'cerra': 'APROBADO',
        'cerra': 'CERRADO',
        'deriv': 'DERIVADO',
        //-------flujo-----
        'aprobe': 'CERRADO',
        'aprobe': 'APROBADO',
        'rechace': 'RECHAZADO',
        'derive': 'DERIVADO',
        'respondi': 'CREADO',
    };
    const estKeyFlujo = {
        //-------flujo-----
        'APROBADO': 'APROBE',
        'RECHAZADO': 'RECHACE',
        'DERIVADO': 'DERIVE',
        'CREADO': 'RESPONDI',
        'CERRADO': 'APROBE',
    };
    if(req.query.estado){
        req.query.estado.split(',').forEach(it => {
            if(['nuevo','envia','recha','cerra','deriv'].indexOf(it)!=-1) estDoc.push(estVal[it]);
            else estFlujo.push(estVal[it]);
        });
    }
    const opcionesFlujo = {
      attributes:['id_documento', 'accion'],
      where: {_usuario_creacion:req.params.id},
      order: '_fecha_creacion',
    };
    if(req.query.estado)
        opcionesFlujo.where.accion = { $in: estFlujo};

    historial_flujo.findAll(opcionesFlujo)
    .then(pRespuesta => {
      if(pRespuesta){
        pRespuesta.forEach((pItem) => {
            documentos.push(pItem.dataValues.id_documento);
            xdocs[pItem.dataValues.id_documento]=pItem;
        });
      }
      const opcionesDocumento={};
      opcionesDocumento.where={
        $or: [
          {
            _usuario_creacion:req.params.id,

          },
          {
            id_documento:{ $in:documentos },
          },
        ],
        estado:{$ne: 'ELIMINADO'},
      };

      if(req.query.filter!=='' && req.xfilter){
          opcionesDocumento.where.$or[0].$or = req.xfilter;
          opcionesDocumento.where.$or[1].$or = req.xfilter;
      }


      if(req.query.fields){
        opcionesDocumento.attributes=req.query.fields.split(',');
        opcionesDocumento.attributes.push('_usuario_creacion');
      }
      if(req.query.estado)
        opcionesDocumento.where.$or[0].estado={$in:estDoc};
      if(req.query.limit)
        opcionesDocumento.limit=req.query.limit;
      if(req.query.page)
        opcionesDocumento.offset=(req.query.limit * ((req.query.page || 1) - 1)) || 0;
      let order;
      if(req.query.order){
        order = (req.query.order.charAt(0)=='-')? ' DESC': '';
        req.query.order = (req.query.order.charAt(0)=='-')? req.query.order.substring(1,req.query.order.length) : req.query.order;
        opcionesDocumento.order = req.query.order + order;
      }

      return documento.findAndCountAll(opcionesDocumento)

    })
    .then(pRespuesta => {
      // console.log("revisando el filtro", req.query.filter);
        if(xdocs){
            pRespuesta.rows.forEach( d => {
                if(d._usuario_creacion != req.params.id){
                      d.estado = estKeyFlujo[xdocs[d.id_documento].accion];
                }
                delete d._usuario_creacion;
            });
        }
        res.send(util.formatearMensaje("EXITO", "La busqueda fue exitosa", {total:pRespuesta.count,resultado:pRespuesta.rows}))
    })
    .catch(pError => {
      // console.log("Error en la busqueda de documentos", pError);
      res.status(412).send(util.formatearMensaje("ERROR", pError));
    })
  });

  app.get('/api/v1/plantillasFormly/documento/:id/todo', filtros,(req, res) => {
    // console.log("entra aqui", req.query);
    const estDoc = ['ENVIADO', 'DERIVADO'];
    const estVal = { 'envia':'ENVIADO', 'deriv':'DERIVADO' };
    let opcionesDocumento={};

    opcionesDocumento.where={
        via_actual:req.params.id,
        estado:{
            $eq: 'DERIVADO',
            $ne: 'ELIMINADO',
        },
    };
    opcionesDocumento.attributes = ['id_documento'];
    opcionesDocumento.raw=true;
    if(req.query.filter!=='' && req.xfilter)opcionesDocumento.where.$or = req.xfilter;

    documento.findAll(opcionesDocumento)
    .then( pRespuesta => {
        const promesas=[];
        pRespuesta.forEach( d => {
            promesas.push(new Promise((resolve, reject) => {
                documento.findOne({ attributes: ['fecha'], where:{ documento_padre: d.id_documento}, raw:true})
                .then( pResp => {
                    resolve( pResp==null? d.id_documento : ( (pResp && pResp.fecha===null)? d.id_documento: 0));
                })
            }))
        })
        return Promise.all(promesas)
    })
    .then( pRespuesta => {
        opcionesDocumento={};
        opcionesDocumento.where={
            $or: [
                { via_actual:req.params.id, estado:'ENVIADO' },
                { id_documento:{$in:pRespuesta} },
            ],
            estado:{$ne: 'ELIMINADO'},
        };

        if(req.query.filter!=='' && req.xfilter)opcionesDocumento.where.$or = req.xfilter;

        if(req.query.fields) opcionesDocumento.attributes=req.query.fields.split(',');
        if(req.query.limit) opcionesDocumento.limit=req.query.limit;
        if(req.query.page) opcionesDocumento.offset=(req.query.limit * ((req.query.page || 1) - 1)) || 0;

        if(req.query.estado){
            let swEnv, swDer;
            req.query.estado.split(',').forEach(it => {
                if(it=='envia') swEnv=true;
                if(it=='deriv') swDer=true;
            });
            if(!swEnv) opcionesDocumento.where.$or.shift();
            if(!swDer) opcionesDocumento.where.$or.pop();
        }

        let order;
        if(req.query.order){
            order = (req.query.order.charAt(0)=='-')? ' DESC': '';
            req.query.order = (req.query.order.charAt(0)=='-')? req.query.order.substring(1,req.query.order.length) : req.query.order;
            opcionesDocumento.order = req.query.order + order;
        }
        // console.log(JSON.stringify(opcionesDocumento, null, 2));
        return documento.findAndCountAll(opcionesDocumento)
    })
    .then(pRespuesta => {
        res.send(util.formatearMensaje("EXITO", "La busqueda fue exitosa", {total:pRespuesta.count,resultado:pRespuesta.rows}))
    })
    .catch(pError => {
      res.status(412).send(util.formatearMensaje("ERROR", pError));
    })
  });

  app.get('/api/v1/plantillasFormly/documento/:id/encurso', filtros,(req, res) => {
    // console.log("entra aqui", req.query);

    const opcionesDocumento = {};
    opcionesDocumento.where = { $or: [
        { via:{ $like:{ $any:[`%${req.params.id},%`,`%${req.params.id}]`] }} },
        { para:`[${req.params.id}]` },
    ]};
    opcionesDocumento.where.$or[0].estado = { $notIn:['ELIMINADO', 'CERRADO'] };
    opcionesDocumento.where.$or[1].estado = { $notIn:['ELIMINADO', 'CERRADO'] };
    opcionesDocumento.where.$or[0].grupo = { $not:null };
    opcionesDocumento.where.$or[1].grupo = { $not:null };
    opcionesDocumento.attributes = ['grupo'];

    let xdocs;
    documento.findAll(opcionesDocumento)
    .then(resp => {
      xdocs = [];
      resp.forEach( (it) => { xdocs.push(it.dataValues.grupo); })
      // console.log('grupos 1', xdocs);
      return documento.findAll({
        attributes: ['grupo', [sequelize.fn('COUNT', sequelize.col('grupo')), 'cant']],
        where: {
            grupo: { $in:xdocs },
        },
        group:['grupo'],
      })
    })
    .then( resp => {
      xdocs = [];
      resp.forEach( (it) => { if(it.dataValues.cant!=1){ xdocs.push(it.dataValues.grupo); }})

      if(req.query.filter!=='' && req.xfilter)opcionesDocumento.where.$or = req.xfilter;
      if(req.query.fields) opcionesDocumento.attributes=req.query.fields.split(',');
      if(req.query.limit) opcionesDocumento.limit=req.query.limit;
      if(req.query.page) opcionesDocumento.offset=(req.query.limit * ((req.query.page || 1) - 1)) || 0;
      if(req.query.order){
        const order = (req.query.order.charAt(0)=='-')? ' DESC': '';
        req.query.order = (req.query.order.charAt(0)=='-')? req.query.order.substring(1,req.query.order.length) : req.query.order;
        opcionesDocumento.order = req.query.order + order;
      }
      opcionesDocumento.where.$or[0].grupo = { $in: xdocs };
      opcionesDocumento.where.$or[1].grupo = { $in: xdocs };
      return documento.findAndCountAll(opcionesDocumento)
    })
    .then( resp => {
        // resp.rows.forEach( (it) => { console.log(it.dataValues);})
        res.send(util.formatearMensaje("EXITO", "La busqueda fue exitosa", {total:resp.count,resultado:resp.rows}))
    })
    .catch(pError => {
      res.status(412).send(util.formatearMensaje("ERROR", pError));
    })
  });



  app.get('/api/v1/plantillasFormly/documento/:id/info', (req, res) => {
    // console.log("Iniciando con la obtencion de informacion sobre el documento");
    documento.findOne({
      where:{
        id_documento:req.params.id,
        estado:{$ne:'ELIMINADO'},
      },
    })
    .then(pDoc => {
      // Si existe el documento.
      if(pDoc){
        // Parsea a objeto los valores del documento.
        const v = JSON.parse(pDoc.plantilla_valor);
        // informacion a retornar.
        let inf=null;
        // contador de valores a obtener.
        let c=0;
        // Campos valor a excluir.
        const a= ['ccArchivo-0'];

        // Itera los valores.
        for (const k in v) {

          // Si el contador es menor a 6.
          if(c<6){
            // Si el valor en iteracion no esta en la lista de excluidos.
            if(a.indexOf(k) == -1 ){
              // Si el valor es de tipo datosGenerales.
              if(k.indexOf('datosGenerales')>-1){
                // Busca la referencia o asunto e incrementa el contador.
                if(v[k].ref){
                  inf = `${(inf==null)?'':inf}${(inf==null)?'':'<br/>'}${v[k].ref}`;
                  c++;
                }
              }
              // Si el valor es de tipo editor de texto.
              else if(k.indexOf('editorTexto') > -1){}
              // Si el valor es de tipo checkbox.
              else if(k.indexOf('checkbox') > -1){}
              // Si el valor es de tipo datepicker.
              else if(k.indexOf('datepicker') > -1){
                // Genera la fecha actual.
                const fecha=moment(v[k]).format("DD/MM/YYYY");
                // Agrega la informacion.
                inf = `${(inf==null)?'':inf}${(inf==null)?'':'<br/>'}${fecha}`
              }
              // Si el valor es de otro tipo.
              else{
                if(typeof v[k] == 'string'){
                  /// Agrega la informacion, actualiza el contador.
                  inf = `${(inf==null)?'':inf}${(inf==null)?'':'<br/>'}${v[k]}`
                  c++;
                }
              }
            }
          }
        }
        // Si la variable inf no ha sido modificado.
        if(inf !== null){
          // Si la longitud del valor es mayor a 250 caracteres.
          if(inf.length>250) inf = `${inf.substring(0,250)} .....`;
        } else {
          inf ='Sin información.'
        }
        // Reemplaza todos los saltos de linea.
        inf = inf.replace(/\n/g, "<br/>");
        // Retorna la informacion.
        return inf;


      }
      // Si el documento no existe
      else throw new Error("El documento solicitado, no esta disponible.")
    })
    .then(pDoc =>
      // Finaliza la peticion de manera exitosa.
      res.send(util.formatearMensaje("EXITO", "La busqueda fue exitosa", pDoc))
    )
    .catch(pError => {
      console.log("Error al buscar el documento");
      // Finaliza la peticion, retornando el error.
      return res.status(412).send(util.formatearMensaje("ERROR", pError));
    })
  })
/**
  @apiVersion 1.0.0
  @apiGroup documento
  @apiName Delete documento
  @api {delete} /api/v1/plantillasFormly/documento/:id Elimina un/a documento

  @apiDescription Delete documento

  @apiParam (Parametro) {Numerico} id Identificador de documento que se quiere eliminar

  @apiSuccessExample {json} Respuesta:
      HTTP/1.1 200 OK
    {

    }
*/
  app.delete('/api/v1/plantillasFormly/documento/:idUs/misdocumentos/:id', (req, res) => {

    if( req.params.idUs == req.body.audit_usuario.id_usuario ){

      documento.findOne({
        where:{_usuario_creacion:req.params.id},
      })
      bl.eliminarDocumento(req.params.idUs, req.params.id, documento, historial_flujo)
      .then(() => res.send(util.formatearMensaje("EXITO", "La eliminación fue exitosa.")))
      .catch(pError => res.status(412).send(util.formatearMensaje("ERROR", pError)))
    } else {
      res.status(412).send(util.formatearMensaje("ERROR", "Usted no tiene la autorizacion."))
    }


  });



/**
  @apiVersion 1.0.0
  @apiGroup documento
  @apiName Put documento
  @api {put} /api/v1/plantillasFormly/documento/:id Actualiza un/a documento

  @apiDescription Put documento

  @apiParam (Parametro) {Numerico} id Identificador de documento que se quiere actualizar

  @apiParam (Peticion) {Texto} nombre Nombre del documento
  @apiParam (Peticion) {Texto} plantilla Plantilla del documento
  @apiParam (Peticion) {Texto} plantilla_valor Valores de la plantilla
  @apiParam (Peticion) {Numerico} _usuario_modificacion Identificador del usuario que esta modificando

  @apiParamExample {json} Ejemplo para enviar:
  {
    "nombre": "INSTRUCTIVO",
    "plantilla": "[]",
    "plantilla_valor": "{}",
    "_usuario_modificacion": 1
  }

  @apiSuccess (Respuesta) {Numerico} id_documento Identificador de documento
  @apiSuccess (Respuesta) {Texto} nombre Nombre del documento
  @apiSuccess (Respuesta) {Texto} plantilla Plantilla del documento
  @apiSuccess (Respuesta) {Texto} plantilla_valor Valores de la plantilla
  @apiSuccess (Respuesta) {Texto} estado Estado del registro
  @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
  @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
  @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de documento
  @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de documento

  @apiSuccessExample {json} Respuesta del Ejemplo:
  HTTP/1.1 200 OK
    {
      "tipoMensaje": "EXITO",
      "mensaje": "La operación se realizó correctamente.",
      "datos": {
        "id_documento": 3,
        "nombre": "INSTRUCTIVO",
        "plantilla": "[]",
        "plantilla_valor": "{}",
        "estado": "ACTIVO",
        "_usuario_creacion": 1,
        "_usuario_modificacion": 1,
        "_fecha_creacion": "2016-12-02T20:16:10.276Z",
        "_fecha_modificacion": "2016-12-02T20:27:47.955Z"
      }
    }

  @apiSampleRequest off
*/
  app.put('/api/v1/plantillasFormly/documento/:id', (req, res) => {
    let xdoc;
    const msg = "La operación se realizó correctamente.";
    const sw = req.body.sw || {};
    sw.xenviar = !sw.enviado && sw.enviar || false;
    let flag= false;

    sequelize.transaction().then(t => {

      const tr = { transaction: t };

      // Verifica la existencia de archivos externos, si existen los crea fisicamente en el servidor.
      bl.verificarExternos(req.body,rutaExternos)
      .then(pValores => {

        // Si existe la respuesta actualiza plantilla_valor.
        if(pValores) req.body.plantilla_valor=pValores;
        return documento.findById(req.params.id)
        .then( resp => {
          xdoc = resp;

          if(xdoc.estado == 'NUEVO' || xdoc.estado == 'RECHAZADO'){
            if(xdoc._usuario_creacion == req.body.audit_usuario.id_usuario)
              return xdoc.update(req.body, tr);
            else
              throw new Error("Usted no tiene la autorizacion");
          }
          else if(xdoc.estado == 'CERRADO' || xdoc.estado == 'DERIVADO'){

            let flag=false;
            const roles = req.body.audit_usuario.roles;
            for(let i = 0; i<roles.length; i++){
              const rol = roles[i].rol.nombre
              if(rol=='SECRETARIA'){
                flag = true;
                break;
              }
            }
            if(flag) return xdoc.update(req.body, tr);
            else throw new Error("La modificacion no esta disponible en este momento.");
          }
          else throw new Error("La modificacion no esta disponible en este momento.");


        })
        .then( resp => {
          if(sw.xenviar && sw.es_respuesta){
            return bl.documento_crear(historial_flujo, xdoc.documento_padre, xdoc._usuario_modificacion, tr)
          }
          return
        })
        .then( resp => {
          if(sw.xenviar){
            return bl.documento_enviar(historial_flujo, xdoc, tr, director)
            .then(() => {
              t.commit();
              flag = true;
              return notificar.enviar(confNotificacion, usuario,notificacion,historial_flujo,xdoc,'enviado',{})
              .then(() => resp)
            })
          }
          return resp;
        })
      })
      .then( resp => {
        if(!flag) t.commit();
        res.send(util.formatearMensaje("EXITO", msg));
      })
      .catch(e => {
        t.rollback();
        res.status(412).send(util.formatearMensaje("ERROR", e));
      })
    })

  });

  // Servicio rest de envio de documento para su aprobacion
  /**
    @apiVersion 1.0.0
    @apiGroup documento
    @apiName Put documento para aprobacion
    @api {put} /api/v1/plantillasFormly/documento/:id/aprobar Envio de documento para su aprobacion

    @apiDescription Put documento

    @apiParam (Parametro) {Numerico} id Identificador de documento que se quiere aprobar

    @apiParam (Peticion) {Numerico} usuario Identificador del usuario que aprueba.

    @apiParamExample {json} Ejemplo para enviar:
    {
      "usuario":1
    }

    @apiSuccessExample {json} Respuesta del Ejemplo:
    HTTP/1.1 200 OK
    {
      "tipoMensaje" : EXITO,
      "mensaje" : El documento se aprobó correctamente
    }
    @apiSampleRequest off
  */
  app.put('/api/v1/plantillasFormly/documento/:id/aprobar',  (req, res) => {
    const idDocumento = req.params.id;
    const usuarioModificacion = req.body.audit_usuario.id_usuario;
    // const usuarioModificacion = req.body.usuario;
    let tieneCite =false;
    documento.findById(idDocumento).then(doc => {
        // Solo modifica el documento, con el estado ENVIADO.
        if(doc.estado !== 'ENVIADO') throw new Error("Este documento no puede ser modificado.");

        const via = JSON.parse(doc.via);
        const para = JSON.parse(doc.para)[0];
        let model, i, j, citeGeneral;

        let viaActual = doc.via_actual;
        const aprobar =  (viaActual == para);
        let fechaActual, citeSinNumero;
        const form = JSON.parse(doc.plantilla);
        if(aprobar){
            model = JSON.parse(doc.plantilla_valor);

            if(doc.via_actual == usuarioModificacion){
              return usuario.findById(doc._usuario_creacion)
              .then( usu => unidad.findById(usu.fid_unidad))
              .then( uni => {

                  fechaActual = moment().tz("America/La_Paz").format();

                  for (i = 0; i < form.length; i++) {
                      if(form[i].type=="cite" && form[i].templateOptions)
                          citeGeneral = (form[i].templateOptions.tipo=='general');
                      else if(form[i].type=="layout"){
                          for (j = 0; j < form[i].fieldGroup.length; j++)
                              if(form[i].type=="cite" && form[i].templateOptions)
                                  citeGeneral = (form[i].templateOptions.tipo=='general');

                      }
                  }

                  // Si es distinto de indefinido tiene cite.
                  if(doc.fecha != undefined){
                    citeSinNumero=doc.nombre;
                    tieneCite=true;
                  }else {
                    if(citeGeneral)
                        citeSinNumero = `${citeGuia}/${doc.abreviacion}`;
                    else if(uni)
                        citeSinNumero = `${citeGuia}-${uni.abreviacion}/${doc.abreviacion}`;
                    else
                        throw new Error("El usuario que le envió no tiene unidad, solicite al administrador del sistema que le asigne su unidad");
                  }

                  return correlativo.findOne({
                      where: {
                          abreviacion: citeSinNumero,
                          anio: `${moment(fechaActual).year()}`,
                      },
                  });
              })
              .then( co => {
                  if(co){
                      return co;
                  }else {
                      return correlativo.create({
                          abreviacion: citeSinNumero,
                          anio: `${moment(fechaActual).year()}`,
                          valor: 1,
                          _usuario_creacion: usuarioModificacion,
                      });
                  }
              })
              .then( co => {

                  const cantCeros = citeCeros - parseInt( (`${co.valor}`).length );
                  let correlativoConCeros = '';
                  for (i = 0; i < cantCeros; i++) correlativoConCeros += '0';
                  correlativoConCeros += co.valor;
                  model['cite-0'] = {};
                  model['cite-0']['cite'] = (tieneCite==true)?citeSinNumero:`${citeSinNumero}/${correlativoConCeros}/${co.anio}`;
                  if( model['cite-0']['fecha']==undefined )
                      model['cite-0']['fecha'] = fechaActual;

                  co.update({ valor: co.valor+1, _usuario_modificacion: usuarioModificacion });
                  const datos={
                      via_actual: viaActual,
                      nombre: tieneCite==true?citeSinNumero: model['cite-0']['cite'],
                      fecha: fechaActual,
                      plantilla_valor: JSON.stringify(model),
                      estado : (aprobar)? 'APROBADO' : 'ENVIADO',
                      _usuario_modificacion: usuarioModificacion,
                  }
                  if(req.body.derivar==true && aprobar==true)
                      datos.observaciones = req.body.observaciones;

                  bl.actualizarDocumento(doc,datos,historial_flujo)
                  .then(pResultado => {
                    if(req.body.derivar==true && aprobar==true){
                      return bl.actualizarDocumento(doc,
                        {
                          estado:'DERIVADO',
                          via_actual: req.body.usuario_derivar,
                          observaciones: req.body.observaciones,
                          _usuario_modificacion: usuarioModificacion,
                        }, historial_flujo)
                        .then(() => {
                          let rmip = req.connection.remoteAddress;
                          let miIp = rmip.substr(rmip.lastIndexOf(':')+1,rmip.length);
                          const log = {
                            fid_usuario: req.body.audit_usuario.id_usuario,
                            fid_documento: doc.id_documento,
                            cite:true,
                            ip:[miIp]
                          }
                          blm.registrarVisita(app.src.db.models, log )
                          .then(() => notificar.enviar(confNotificacion, usuario,notificacion,historial_flujo,doc,'derivado',{})
                            .then(() => notificar.enviar(confNotificacion, usuario,notificacion,historial_flujo,doc,'aprobado',{}))
                          )
                        })
                    }
                    else if(req.body.derivar==false && aprobar==true){
                      return bl.cerrarDocumento(documento, historial_flujo,doc,usuarioModificacion)
                      .then(pResultado => {
                        let rmip = req.connection.remoteAddress;
                        let miIp = rmip.substr(rmip.lastIndexOf(':')+1,rmip.length);
                        const log = {
                          fid_usuario: req.body.audit_usuario.id_usuario,
                          fid_documento: doc.id_documento,
                          cite:true,
                          ip:[miIp]
                        }
                        return blm.registrarVisita(app.src.db.models, log )
                        .then(() => {

                          return notificar.enviar(confNotificacion, usuario,notificacion,historial_flujo,doc,'aprobado',{})
                          console.log("El documento y sus padres ya se cerro");
                        })
                      })
                    }
                  })
                  .then(resultado => {
                      res.send(util.formatearMensaje("EXITO", "El documento se aprobó correctamente", resultado));
                  })
                  .catch(error => {
                      res.status(412).send(util.formatearMensaje("ERROR", error));
                  });;
              })
              .catch( error => {
                  res.status(412).send(util.formatearMensaje("ERROR", error));
              })
            }
            else throw new Error("Usted no esta autorizado para la accion solicitada.")
        }
        else {

            for (i = 0; i < via.length; i++) {
                if (via[i] == doc.via_actual) {
                    i++;
                    break;
                }
            }

            let aprobarPorDireccion = false;
            for (let f = 0; f < form.length; f++) {
                if (form[f].type == "datosGenerales" && form[f].templateOptions) {
                    aprobarPorDireccion = form[f].templateOptions.aprobarPorDireccion;
                    break;
                }
            }

            // TODO: En observacion...
            if ((viaActual == via[via.length-1]) && aprobarPorDireccion) {
              viaActual = (viaActual == director)? para : director;
            } else {

              if(via.length == 0 && aprobarPorDireccion){
                if(viaActual == director) viaActual=para;
              }
              else viaActual = ( i < via.length ) ? via[i] : para;
            }

            if(doc.via_actual == usuarioModificacion){

              doc.update({
                  via_actual: viaActual,
                  estado : (aprobar) ? 'APROBADO' : 'ENVIADO',
                  _usuario_modificacion: usuarioModificacion,
              },{where: {id_documento: idDocumento} })
              .then(resultado =>
                historial_flujo.create({
                    id_documento:idDocumento,
                    accion: 'APROBADO',
                    observacion: '',
                    estado: 'ACTIVO',
                    _usuario_creacion: usuarioModificacion,
                }).then(() => {
                  // return resultado
                  if(resultado.estado == 'ENVIADO'){

                    return notificar.enviar(confNotificacion, usuario,notificacion,historial_flujo,doc,'enviado',{})
                    .then(() =>
                      notificar.enviar(confNotificacion, usuario,notificacion,historial_flujo,doc,'aprobado',{})
                      .then(() => resultado)
                    )
                  }
                  else if (resultado.estado =='APROBADO') {

                    return resultado;
                  }
                })
              )
              .then(resultado => {
                  res.send(util.formatearMensaje("EXITO", "El documento se aprobó correctamente", resultado));
              }).catch(error => {
                  res.status(412).send(util.formatearMensaje("ERROR", error));
              });
            } else throw new Error("Uste no esta autorizado para la accion solicitada")
        }
    })
    .catch(error => {
        res.status(412).send(util.formatearMensaje("ERROR", error));
    });

  });

  app.put('/api/v1/plantillasFormly/documento/:id/derivar',  (req, res) => {
    const idDocumento = req.params.id;
    const usuarioModificacion = req.body.audit_usuario.id_usuario;
    // const usuarioModificacion = req.body.usuario;
    const destino = req.body.destino;


    const datos={
        via_actual: destino,
        observaciones:req.body.observaciones,
        estado : 'DERIVADO',
        _usuario_modificacion: usuarioModificacion,
    }
    let doc = null;
    documento.findById(idDocumento).then(pDoc => {
        doc = pDoc;
        if(doc.via_actual !== usuarioModificacion) throw new Error("Usted no esta autorizado para la accion solicitada.");
        if(doc.estado !== 'DERIVADO') throw new Error("El documento no puede ser modificado.");
        return documento.findOne({ where:{ documento_padre:doc.id_documento } })
    })
    .then(resultado => {
        if(resultado==null) return bl.actualizarDocumento(doc,datos,historial_flujo);
        else throw new Error("El documento no se puede derivar, porque ya creó una respuesta.");
    })
    .then(resultado =>
      notificar.enviar(confNotificacion, usuario,notificacion,historial_flujo,doc,'derivado',{})
      .then(() => resultado)
    )
    .then(resultado => {
        res.send(util.formatearMensaje("EXITO", "El documento se derivó", resultado));
    }).catch(error => {
        res.status(412).send(util.formatearMensaje("ERROR", error));
    });
  });





  //Servicio rest para rechazar documento
  /**
    @apiVersion 1.0.0
    @apiGroup documento
    @apiName Put documento para rechazo
    @api {put} /api/v1/plantillasFormly/documento/:id/rechazar Rechazo de un documento

    @apiDescription Put documento

    @apiParam (Parametro) {Numerico} id Identificador de documento que se quiere rechazar

    @apiParam (Peticion) {Numerico} usuario Identificador del usuario que rechaza
    @apiParam (Peticion) {Texto} observaciones Observaciones al documento
    @apiParam (Peticion) {Texto} observado_por Información de quien rechaza el documento

    @apiParamExample {json} Ejemplo para enviar:
    {
      "usuario" : 1,
      "observaciones" : Este informe no contiene informacion alguna,
      "observado_por" : AGETIC AGETIC
    }

    @apiSuccess (Respuesta) {Numerico} id_documento Identificador de documento
    @apiSuccess (Respuesta) {Texto} nombre Nombre del documento
    @apiSuccess (Respuesta) {Texto} plantilla Plantilla del documento
    @apiSuccess (Respuesta) {Texto} plantilla_valor Valores de la plantilla
    @apiSuccess (Respuesta) {Texto} nombre_plantilla Nombre de la plantilla
    @apiSuccess (Respuesta) {Texto} abreviacion Abreviación del documento
    @apiSuccess (Respuesta) {Texto} de Remitente del documento
    @apiSuccess (Respuesta) {Texto} para Destinatario del documento
    @apiSuccess (Respuesta) {Texto} via Destinatario intermedios del documento
    @apiSuccess (Respuesta) {Texto} via_actual Destinatario actual del documento
    @apiSuccess (Respuesta) {Texto} referencia Referencia del documento
    @apiSuccess (Respuesta) {Fecha} fecha Fecha del documento
    @apiSuccess (Respuesta) {Texto} observaciones Observaciones al documento
    @apiSuccess (Respuesta) {Texto} estado Estado del documento
    @apiSuccess (Respuesta) {Numerico} _usuario_creacion Identificador del usuario creador
    @apiSuccess (Respuesta) {Numerico} _usuario_modificacion Identificador del usuario modificador
    @apiSuccess (Respuesta) {FechaHora} _fecha_creacion Fecha de creación de documento
    @apiSuccess (Respuesta) {FechaHora} _fecha_modificacion Fecha de modificación de documento

    @apiSuccessExample {json} Respuesta del Ejemplo:
    HTTP/1.1 200 OK
    {
    "tipoMensaje": "EXITO",
    "mensaje": "El documento se rechazó",
    "datos": {
        "id_documento": 4,
        "nombre": "Informe de Consultoria - AGETIC AGETIC",
        "plantilla": [],
        "plantilla_valor": {},
        "nombre_plantilla": "Informe de Consultoria",
        "abreviacion": "IC",
        "de": "[1]",
        "para": "[24]",
        "via": "[89]",
        "via_actual": 89,
        "referencia": "aaaa",
        "fecha": null,
        "observaciones": "Observado por:  AGETIC AGETIC - Observaciones: Este informe no contiene informacion alguna",
        "estado": "RECHAZADO",
        "_usuario_creacion": 1,
        "_usuario_modificacion": 1,
        "_fecha_creacion": "2016-12-19T20:18:08.156Z",
        "_fecha_modificacion": "2016-12-19T20:18:38.424Z"
    }
}
    @apiSampleRequest off
  */

  app.put('/api/v1/plantillasFormly/documento/:id/rechazar',  (req, res) => {
    const idDocumento = req.params.id;
    const usuarioModificacion = req.body.audit_usuario.id_usuario;
    // const usuarioModificacion = req.body.usuario;
    const observaciones = req.body.observaciones;
    const observadoPor = req.body.observado_por;
    let usuarioNotificar = null;
    let doc=null;
    sequelize.transaction().then(t => {
        const tr = { transaction: t };
        documento.findById(idDocumento).then(doc => {

          if(usuarioModificacion !== doc.via_actual) throw new Error("Usted no cuenta con la autorizacion");
          if(doc.estado!=='ENVIADO') throw new Error("El documento no puede ser modificado");

           return doc.update({
            estado : 'RECHAZADO',
            observaciones : `Observado por: ${observadoPor} - Observaciones: ${observaciones}`,
            _usuario_modificacion: usuarioModificacion,
          },
          {where: {id_documento: idDocumento}},
          tr)
        })
        .then(docum => {
          doc=docum.dataValues;
          usuarioNotificar=docum.dataValues._usuario_creacion;
          // console.log("revisando el docum en el rechazo", usuarioNotificar);
          return historial_flujo.create({
              id_documento:docum.id_documento,
              accion: 'RECHAZADO',
              observacion: docum.observaciones,
              estado: 'ACTIVO',
              _usuario_creacion: usuarioModificacion,
          },tr)
        })
        .then(() =>
          notificar.enviar(confNotificacion, usuario,notificacion,historial_flujo,doc,'observado',tr)
          .then(pRespuesta => {
            console.log("Notificacion enviada");
            return
          })

        )
        .then(() => {
          t.commit();
          res.send(util.formatearMensaje("EXITO", "El documento se rechazó"));
        }).catch(error => {
          t.rollback();
          res.status(412).send(util.formatearMensaje("ERROR", error));
        });
    });

  });

/**
  @apiVersion 1.0.0
  @apiGroup documento
  @apiName Options documento
  @api {options} /api/v1/plantillasFormly/documento Extrae formly de documento

  @apiDescription Options de documento

  @apiSuccess (Respuesta) {Texto} key Llave para el campo
  @apiSuccess (Respuesta) {Texto} type Tipo de etiqueta este puede ser input, select, datepicker, etc
  @apiSuccess (Respuesta) {Objeto} templateOptions Objeto de opciones para la etiqueta, el cual varia de acuerdo el tipo de etiqueta

  @apiSuccessExample {json} Respuesta:
  HTTP/1.1 200 OK
    [
      {
        "key": "id_documento",
        "type": "input",
        "templateOptions": {
          "type": "number",
          "label": "ID",
          "required": true
        }
      },
      {
        "key": "nombre",
        "type": "input",
        "templateOptions": {
          "type": "text",
          "label": "Nombre",
          "required": true
        }
      },
      {
        "key": "plantilla",
        "type": "textarea",
        "templateOptions": {
          "type": "",
          "label": "Plantilla",
          "required": true
        }
      },
      {
        "key": "plantilla_valor",
        "type": "textarea",
        "templateOptions": {
          "type": "",
          "label": "Valores",
          "required": true
        }
      },
      {
        "key": "estado",
        "type": "select",
        "templateOptions": {
          "type": "",
          "label": "Estado",
          "required": false,
          "options": [
            {
              "name": "ACTIVO",
              "value": "ACTIVO"
            },
            {
              "name": "INACTIVO",
              "value": "INACTIVO"
            }
          ]
        }
      },
      {
        "key": "_usuario_creacion",
        "type": "input",
        "templateOptions": {
          "type": "number",
          "label": "Usuario de creación",
          "required": true
        }
      },
      {
        "key": "_usuario_modificacion",
        "type": "input",
        "templateOptions": {
          "type": "number",
          "label": "Usuario de modificación",
          "required": false
        }
      },
      {
        "key": "_fecha_creacion",
        "type": "datepicker",
        "templateOptions": {
          "type": "datetime-local",
          "label": "_fecha_creacion",
          "required": true
        }
      },
      {
        "key": "_fecha_modificacion",
        "type": "datepicker",
        "templateOptions": {
          "type": "datetime-local",
          "label": "_fecha_modificacion",
          "required": true
        }
      }
    ]

  @apiSampleRequest off
*/
  app.options('/api/v1/plantillasFormly/documento', sequelizeFormly.formly(documento, app.src.db.models));
  app.options('/api/v1/plantillasFormly/documento/:id/todo', sequelizeFormly.formly(documento, app.src.db.models));
  app.options('/api/v1/plantillasFormly/documento/:id/misdocumentos', sequelizeFormly.formly(documento, app.src.db.models));
  app.options('/api/v1/plantillasFormly/documento/:id/encurso', sequelizeFormly.formly(documento, app.src.db.models));

};
