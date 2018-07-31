import path from "path";
const http = require('http');
const hash = require('object-hash');
const html_pdf = require('html-pdf');
const ejs = require("ejs");
const moment = require('moment');
const Uuid = require('uuid');
console.log("archivo util");


const raiz = "./";
const dirPlantillas = raiz+"public/plantillas/";
const dirInformes = raiz+"public/informes/";
const dirDocumento = "./public/documentos/";

const funcionCabeceras = (objs) => {
  const cabs = new Array();
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];
    for (const key in obj) {
      const attrName = key;
      const attrValue = obj[key];
      //Ocultamos el atributo URL, para no ser mostrado en la vista EJS
      if (attrName === "url" ) {
      } else {
        cabs.push(attrName);
      }
    }
  }
  return cabs;
};


/**
Funcion que asigna un formato a los mensajes de respuesta para una peticion http.
@param {estado} Estado de la peticion http.
@param {mensaje} Mensaje a retornar.
@param {datos} Datos obtenidos o generados para ser retornados.
@return Retorna un {json} con los datos en el formato establecido.
*/
const formatearMensaje = (tipoMensaje, mensaje, datos,token) => {

  // Validacion para el parametro mensaje.
  let mensajeFinal=mensaje;

  // Si el parametro mensaje es un objeto, actualiza el valor del mensaje final.
  if(mensaje.message) mensajeFinal=mensaje.message;

  if(process.env.NODE_ENV =='production'){
    // console.log("El entorno es produccion", mensaje);
    // console.log("El entorno es produccion", mensaje.name);
    // console.log("Revisando el mensaje final", mensajeFinal);
    if(mensaje.name ){
      if(mensaje.name !== 'Error'){
        mensajeFinal="Ha ocurrido un error al procesar su solicitud.";
      }
      else {
        console.log("El nombre del mensaje es ERROR", mensaje);
      }
    }
  }
  // Declara el objeto respuesta.
  var respuesta={
    tipoMensaje: tipoMensaje,
    mensaje: mensajeFinal,
    datos: datos
  };


  // Esto solo es necesario, en la operacion de autenticación.
  if(token)respuesta.token= token;


  return respuesta;
};

/**
Funcion que verifica un objeto del tipo json, si el objeto es vacio retorna false, si tiene datos true.
@param {pObj} Objeto del tipo json a verificar.
@return Retorna TRUE/FALSE.
*/
const verificarJSON=(pObj)=>{

  if(typeof pObj === 'object'){
    for(var i in pObj) return true;
    return false;
  }else{
    return false;
  }

}

/**
Funcion que verifica que sea un vector y que ademas tenga por lo minimo un elemento.
@param {pVector} vector a validar.
@return Retorna un true/false.
*/
const vectorValido=(pVector)=>{

  if(Array.isArray(pVector)){
    if(pVector.length>0) return true;
    else return false;
  }else{
    return false;
  }
}

/**
Funcion que inserta un vector de objetos.
@param {pVector} Vector que contiene los objetos a insertar.
@param {pModel} Modelo sequelize a usar para la insercion  a base de datos.
@param {pUsuarios} Objeto con los  usuarios y valores de auditoria.
@param {pLlaves} Objeto con las llaves foraneas y sus respectivos valores.
@return Retorna un vector con los objetos insertados a base de datos.
*/
//TODO: remover pProceso una ves verificado e correcto funcionamiento.
const insertarVector =function(pVector, pModel, pProceso,pUsuarios,pLlaves) {
  var Promise=require('bluebird');
  var resultado = [];
    if(vectorValido(pVector)){
      // Declara el almacenamiento de promesas en un vector.
      var promises = pVector.map(function(pItem) {

        if(pUsuarios._usuario_modificacion) pItem._usuario_modificacion=pUsuarios._usuario_modificacion;
        else pItem._usuario_creacion=pUsuarios._usuario_creacion;

        // Si existen llaves las asigna al item.
        if(pLlaves){
          for(let item in pLlaves){
            pItem[item]=pLlaves[item];
          }
        }

        return pModel.create(pItem)
          .then(pItemCreado=> {
            resultado.push(pItemCreado);
          })
          .catch(pErrorItem=> {
            return Promise.reject(pErrorItem);
          });
      });

    }

    return Promise.all(promises)
      .then(()=> {
        return Promise.resolve(resultado);
      })
      .catch(err=>{
        if(!promises) return Promise.reject('');
        return Promise.reject(err);
      });
}

// TODO: Esta funcion en un futuro deberia reconocer otros operadores logicos usados por sequelize.
/**
Funcion que realiza la conversion de un string en objeto.
@param {pObjNombre} Cadena de texto.
@param {pValorOperador} Cadena de texto que contiene operadores logicos usados por el sequelize(caso especifico OR = ',').
@return Retorna un objeto que tiene como valor a un vector de objetos.
@example
ingresa (id_proceso,'1,2,3')
salida  {$or:[{id_proceso:1},{id_proceso:2},{id_proceso:3}]};
*/
const convertirCadenaOperador=(pObjNombre,pValorOperador)=>{

  let objNombre='';
  let objRespuesta={};
  // TODO: Implementar una funcion que detecte de que operador se trata.
  // Para coma, OR.
  let indiceComa=pValorOperador.indexOf(',');
  objNombre='$or'

  let items=[];
  let valorObj=null;

  while(indiceComa>-1){
    let objTemp={}
    valorObj=pValorOperador.substring(0,indiceComa);
    objTemp[pObjNombre]=valorObj;
    items.push(objTemp);
    pValorOperador=pValorOperador.substring(indiceComa+1,pValorOperador.length);
    indiceComa=pValorOperador.indexOf(',');
  }

  if(indiceComa===-1 && pValorOperador.length>0){
    let objTempFinal={};
    valorObj=pValorOperador.substring(pValorOperador.indexOf(",")+1,pValorOperador.length);
    objTempFinal[pObjNombre]=valorObj;
    items.push(objTempFinal);
  }
  objRespuesta[objNombre]=items;


  return objRespuesta;
}

/**
Funcion que realiza la validacion de una cadena de texto con formato json.
@param {pTextoJson} Cadena de texto que tiene el formato de un json.
@return Retorna un true/false.
@example
ingresa "[{id_usuario:4}]"
salida true/false
*/
const  validarTextoJson=(pTextoJson)=>{

  if (/^[\],:{}\s]*$/.test(pTextoJson.replace(/\\["\\\/bfnrtu]/g, '@').
  replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
  replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) return true;
  else  return false;

}

/**
Funcion que realiza la transformacion de una cadena de texto.
@param {pCadena} Cadena de texto que tiene el formato json.
@return Retorna un objeto.
@example
ingresa "[{id_usuario:4},{estado:'ACTIVO'}]"
salida
{
  id_usuario:4,
  estado:'ACTIVO'
}
*/
const transformarVectorTexto=(pCadena)=>{

  let objRespuesta={};
  pCadena=pCadena.replace("[","").replace("]","");
  let indiceLlaveInicio=pCadena.indexOf("{");
  let indiceLlavefinal=pCadena.indexOf("}");
  let indiceComa=pCadena.indexOf(",");
  let llave,valor, indicePuntos=null;
  if(pCadena.length>0){

    while (indiceLlavefinal>-1 && indiceComa>-1) {

      indicePuntos=pCadena.indexOf(":");
      llave=pCadena.substring(indiceLlaveInicio+1,indicePuntos).replace('"','').replace('"','');

      // TODO: Implementar control para otros operadores logicos.
      if(indiceLlaveInicio<indiceLlavefinal && indiceLlavefinal<indiceComa){
        valor=pCadena.substring(indicePuntos+1,indiceLlavefinal).replace('"','').replace('"','');
        objRespuesta[llave]=valor; // TODO: revisar este caso para todos los enum.
        pCadena=pCadena.substring(indiceComa+1,pCadena.length);
      }
      else if(indiceLlaveInicio<indiceLlavefinal && indiceLlavefinal>indiceComa && indiceComa>-1){

        let valorEnviar=pCadena.substring(indicePuntos+1,indiceLlavefinal).replace('"','').replace('"','');
        valor=convertirCadenaOperador(llave,valorEnviar);
        objRespuesta.$or=valor.$or;
        pCadena=pCadena.substring(indiceLlavefinal+2,pCadena.length);

      }

      indiceLlaveInicio=pCadena.indexOf("{");
      indiceLlavefinal=pCadena.indexOf("}");
      indiceComa=pCadena.indexOf(",");

    }// Fin while.

    if(indiceComa===-1 && pCadena.length>0){
      indicePuntos=pCadena.indexOf(":");
      llave=pCadena.substring(indiceLlaveInicio+1,indicePuntos).replace('"','').replace('"','');
      valor=pCadena.substring(indicePuntos+1,indiceLlavefinal).replace('"','').replace('"','');
      objRespuesta[llave]=valor;


    }
  }

  return objRespuesta
}

/**
Funcion que realiza la transformacion de una cadena de texto en un objeto.
@param {pCondiciones} Objeto que contiene las condiciones.
@return Retorna un objeto.
@example
ingresa { limit:'',order:10, asignacion:"[{fid_usuario:4},{estado:ACTIVO}]"}
salida
{
  limit:'',
  order:10,
  asignacion:{
    fid_usuario:4,
    estado:ACTIVO
  }
}
*/
const transformarConsulta=(pCondiciones)=>{
  let objRespuesta={};
  for(let item in pCondiciones){
    if(pCondiciones[item].indexOf("[")>-1)
      if(validarTextoJson(pCondiciones[item])) objRespuesta[item]=transformarVectorTexto(pCondiciones[item]);
    else objRespuesta[item]=pCondiciones[item];
  }
  return objRespuesta;
}// Fin transformarConsulta



/**
 Funcion que genera el historico de un modelo.
 @param {pModelo} Modelo Modelo origen del cual se genera un historico.
 @param {pModeloHistorico} Modelo Modelo historico que almacena el dato anterior a la modificacion.
 @param {pObjActual} Objeto Datos de actualizacion a insertar.
 @param {pObjAntiguo} Objeto Datos a respaldar en el historico.
 @return Retorna una promesa.
 */
const historico = (pModelo, pModeloHistorico, pObjActual, pObjAntiguo )=>{

  var Promise=require('bluebird');

  // Almacena la llave primaria.
  var llavePrimaria = pModelo.primaryKeyAttribute;
  let resultado=[];

  // Si existe el obj actual y es distinto de indefinido.
  if(pObjActual && pObjActual!=undefined){
    // Si existe el objAntiguo y es distinto de indefinido.
    if(pObjAntiguo && pObjAntiguo!=undefined){

      let prohibidos = ["_usuario_creacion","_usuario_modificacion","_fecha_creacion","_fecha_modificacion"];
      let antiguoTemp={};
      let actualTemp={};

      // Elimina los campos de auditoria.
      for(let llave in pObjActual){
        if(prohibidos.indexOf(llave)=== -1){
          antiguoTemp[llave]=pObjAntiguo[llave]
          actualTemp[llave]=pObjActual[llave]
        }
      }

      // Si los hashes son distintos.
      if(hash(antiguoTemp) !== hash(actualTemp)){


        pObjAntiguo["f"+llavePrimaria]=pObjActual[llavePrimaria];
        pObjAntiguo._usuario_creacion=pObjActual._usuario_modificacion;
        // Almacena la promesa que crea el historico.
        var promesas= pModeloHistorico.create(pObjAntiguo)
        .then(pRespuestaHistorico=>{
          let condicion={where:{}}
          condicion.where[llavePrimaria] = pObjActual[llavePrimaria];
          // Retorna la promesa que modifica la informacion destino.
          return pModelo.update(pObjActual,condicion)
          .then(pRespuestaModeloCrear=>{
            resultado=pObjActual;
            return resultado;
          })
          // Control de error para la modificacion.
          .catch(pErrorModeloCrear=>{
            return Promise.reject(pErrorModeloCrear);
          });
        })
        // Control de error para la creacion del historico.
        .catch(pErrorHistorico=>{
          return Promise.reject(pErrorHistorico);
        })

        // Retorna las promesas.
        return promesas;
      }
      // Si los hashes son iguales.
      else{
        // Finaliza la ejecucion de la promesa por correcto.
        return Promise.resolve(pObjActual);
      }

    }
    // Si no existe el objAntiguo.
    else{

      // Almacena la promesa para creacion del datos en el modelo.
      var promesas= pModelo.create(pObjActual)
      .then(pRespuestaModelo=>{
        resultado=pRespuestaModelo;
        return resultado;
      })
      // Control de error para creacion de informacion del modelo.
      .catch(pErrorModelo=>{
        return Promise.reject(pErrorModelo);
      });

      // Retorna la promesa.
      return promesas;
    }
  }


  // Ejecuta las promesas almacenadas.
  return Promise.all(promesas)
  .then(()=>{
    // Finaliza la promesa por correcto.
    return Promise.resolve(resultado);
  })
  // Control de error para la ejecucion de todas la promesas.
  .catch(pError=>{

    // Si no existen promesas retorna un mensaje personalizado.
    if(!promesas) return Promise.reject("No hay promesas")
    // Finaliza la promesa por error.
    return Promise.reject(pError);
  });



}

/**
 Funcion que genera el historico para un vector de un mismo modelo.
 @param {pVector} Vector Contiene objetos de datos a insertar/modificar.
 @param {pObj} Objeto Contiene datos de respaldo(para la modificacion), undefined (si es para insertar).
 @param {pModelo} Modelo Modelo origen del cual se genera un historico.
 @param {pModeloHistorico} Modelo Modelo historico que almacena el dato anterior a la modificacion.
 @param {pIdUsuario} Int Identificador del usuario(campo de auditoria).

 @return Retorna una promesa.
 */
const historicoVector =(pVector,pObj,pModelo,pModeloHis, pIdUsuario)=> {
  var Promise=require('bluebird');
  var resultado = [];
  let identificador=pModelo.primaryKeyAttribute;

  // if(vectorValido(pVector)){
  if(Array.isArray(pVector)){
    var promises = pVector.map((pItem)=> {

      let antiguo=pObj!=undefined? pObj[pItem[identificador]]:undefined;

      if(antiguo!=undefined) pItem._usuario_modificacion=pIdUsuario;
      else pItem._usuario_creacion=pIdUsuario;

      return historico(pModelo,pModeloHis,pItem,antiguo)
        .then(pRespuesta=> {
          if(antiguo===undefined){
            resultado.push(pRespuesta);
          }else{
            return;
          }
        })
        .catch(pError=> {
          // return Promise.resolve();
          return Promise.reject(pError);
        });
    });

  }


  return Promise.all(promises)
    .then(()=> {
      return Promise.resolve(resultado);
    })
    .catch(err=>{
      // TODO: Revisas con pruebas si lo mejor es rechazar o resolver la promesa.
      if(!promises) return Promise.reject("El vector con datos a modificar no es valido.");
      return Promise.reject(err);
    });
}



/**
 Funcion que crea un pdf de la plantilla.
 @param {pl} Plantilla objeto plantilla.
*/
function generarPDF (pl) {
  var file = pl.fid_categoria+"-"+pl.fid_subcategoria;
  var file = "";
  if(pl.fid_tipo_bien === null && pl.fid_subcategoria === null && pl.fid_categoria !== null){
      file = pl.fid_categoria;
  }else if(pl.fid_tipo_bien === null && pl.fid_subcategoria !== null && pl.fid_categoria !== null){
      file = pl.fid_categoria + "-" + pl.fid_subcategoria;
  }else if(pl.fid_tipo_bien !== null && pl.fid_subcategoria !== null && pl.fid_categoria !== null){
      file = pl.fid_categoria + "-" + pl.fid_subcategoria + "-" + pl.fid_tipo_bien;
  }
  file += ".pdf" ;

  // var xdatos = {
  //   fid_categoria: pl.fid_categoria,
  //   fid_subcategoria: pl.fid_subcategoria,
  //   fid_tipo_bien: pl.fid_tipo_bien
  // };
  //
  // var file = hash(xdatos) + ".pdf";
  var ruta_file = dirPlantillas + file;
  var ruta_ejs = __dirname+"/html_plantilla/plantilla.ejs";
  // console.log("revisando el valor que ingresa", pl);
  pl.caracteristicas_generales = JSON.parse(pl.caracteristicas_generales);
  pl.caracteristicas_especificas = JSON.parse(pl.caracteristicas_especificas);
  pl.articulos = JSON.parse(pl.articulos);
  // console.log("Verificando las caracteristicas_especificas", pl.caracteristicas_especificas);
  for (var i = 0; i < pl.caracteristicas_generales.length; i++) {
    // console.log(pl.caracteristica[i].type);
    if (pl.caracteristicas_generales[i].type == "select") {
      if (pl.caracteristicas_generales[i].templateOptions.multiple) {
        pl.caracteristicas_generales[i].type = "checkbox";
      }else {
        pl.caracteristicas_generales[i].type = "radio";
      }
    }else if (pl.caracteristicas_generales[i].type == "checkbox") {
        pl.caracteristicas_generales[i].type = "checkbox1";
    }
  }
  for (var i = 0; i < pl.caracteristicas_especificas.length; i++) {
    // console.log(pl.caracteristica[i].type);
    if (pl.caracteristicas_especificas[i].type == "select") {
      if (pl.caracteristicas_especificas[i].templateOptions.multiple) {
        pl.caracteristicas_especificas[i].type = "checkbox";
      }else {
        pl.caracteristicas_especificas[i].type = "radio";
      }
    }else if (pl.caracteristicas_especificas[i].type == "checkbox") {
        pl.caracteristicas_especificas[i].type = "checkbox1";
    }
  }

  ejs.renderFile(ruta_ejs, pl, function (error, resultHTML) {
    if (resultHTML) {
      // console.log("creando "+ruta_file);
      var options = {
        filename: ruta_file,
        format: 'Letter',
        orientation: 'portrait',
        border: "2cm",
        type: "application/pdf",
        // phantomPath: "./node_modules/phantomjs/bin/phantomjs"
      };

      html_pdf.create(resultHTML, options).toStream(function(err, stream) {
        if (err) {
          console.log("hubo un error al generar "+ruta_file+ " fecha:"+genFecha.format());
          console.log("error "+err);
        }else {
          console.log("Se creo exitosamente el archivo "+ruta_file+ " fecha:"+genFecha.format());
        }
      });
    }else {
      console.log("hubo un error al generar "+ruta_file+ " fecha:"+genFecha.format());
      console.log("error "+error);
    }
  });
}

function formatearFecha(date) {
  var resultado = "";
  var mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  resultado = date.getDate() +" de "+ mes[date.getMonth()] +" de "+ date.getFullYear();
  return resultado;
}

const historicoT = (pModelo, pModeloHistorico, pObjActual, pObjAntiguo, pTransaccion )=>{
console.log("verificando la llegada del historicoT", pModeloHistorico);
  var Promise=require('bluebird');

  // Almacena la llave primaria.
  var llavePrimaria = pModelo.primaryKeyAttribute;
  let resultado=[];

  // Si existe el obj actual y es distinto de indefinido.
  if(pObjActual && pObjActual!=undefined){
    // Si existe el objAntiguo y es distinto de indefinido.
    if(pObjAntiguo && pObjAntiguo!=undefined){

      let prohibidos = ["_usuario_creacion","_usuario_modificacion","_fecha_creacion","_fecha_modificacion"];
      let antiguoTemp={};
      let actualTemp={};

      // Elimina los campos de auditoria.
      for(let llave in pObjActual){
        if(prohibidos.indexOf(llave)=== -1){
          antiguoTemp[llave]=pObjAntiguo[llave]
          actualTemp[llave]=pObjActual[llave]
        }
      }

      // Si los hashes son distintos.
      if(hash(antiguoTemp) !== hash(actualTemp)){


        pObjAntiguo["f"+llavePrimaria]=pObjActual[llavePrimaria];
        pObjAntiguo._usuario_creacion=pObjActual._usuario_modificacion;
        // Almacena la promesa que crea el historico.
        var promesas= pModeloHistorico.create(pObjAntiguo, pTransaccion)
        .then(pRespuestaHistorico=>{
          let condicion={where:{}}
          condicion.where[llavePrimaria] = pObjActual[llavePrimaria];
          // Retorna la promesa que modifica la informacion destino.
          return pModelo.update(pObjActual,condicion, pTransaccion)
          .then(pRespuestaModeloCrear=>{
            resultado=pObjActual;
            return resultado;
          })
          // Control de error para la modificacion.
          .catch(pErrorModeloCrear=>{
            console.log("Error al actualizar el modelo", pErrorModeloCrear);
            return Promise.reject(pErrorModeloCrear);
          });
        })
        // Control de error para la creacion del historico.
        .catch(pErrorHistorico=>{
          console.log("Error al crear el historico", pErrorHistorico);
          return Promise.reject(pErrorHistorico);
        })

        // Retorna las promesas.
        return promesas;
      }
      // Si los hashes son iguales.
      else{
        // Finaliza la ejecucion de la promesa por correcto.
        return Promise.resolve(pObjActual);
      }

    }
    // Si no existe el objAntiguo.
    else{

      // Almacena la promesa para creacion del datos en el modelo.
      var promesas= pModelo.create(pObjActual, pTransaccion)
      .then(pRespuestaModelo=>{
        resultado=pRespuestaModelo;
        return resultado;
      })
      // Control de error para creacion de informacion del modelo.
      .catch(pErrorModelo=>{
        console.log("Error historicoT", pErrorModelo);
        return Promise.reject(pErrorModelo);
      });

      // Retorna la promesa.
      return promesas;
    }
  }


  // Ejecuta las promesas almacenadas.
  return Promise.all(promesas)
  .then(()=>{
    // Finaliza la promesa por correcto.
    return Promise.resolve(resultado);
  })
  // Control de error para la ejecucion de todas la promesas.
  .catch(pError=>{

    // Si no existen promesas retorna un mensaje personalizado.
    if(!promesas) return Promise.reject("No hay promesas")
    // Finaliza la promesa por error.
    return Promise.reject(pError);
  });



}

function desserializarDeJson(query) {
    for (var i in query) {
        if (query.hasOwnProperty(i)) {
            query[i] = JSON.parse(query[i]);
        }
    }
    return query;
}
function convertirLike(model, query) {
    var atributos = model.rawAttributes;
    // console.log(Object.keys(model));
    // console.log(model.rawAttributes);
    // console.log(model.rawAttributes.id_proceso_judicial);
    // console.log(model.rawAttributes.id_proceso_judicial.type.constructor.key);

    var xquery = {};
    for (var i in query) {
        // console.log(getTipoAtributo(atributos[i]));
        var tipo_textos = ["STRING","TEXT"];
        if(tipo_textos.indexOf(getTipoAtributo(atributos[i])) !== -1){
            xquery[i] = {
                $like: '%'+query[i]+'%'
            };
        }else {
            xquery[i] = query[i];
        }
    }
    return xquery;
}
function getTipoAtributo(atrib) {
    return atrib.type.constructor.key;
}

/**
 Funcion que genera el historico para un vector de un mismo modelo usnado transacciones.
 @param {pVector} Vector Contiene objetos de datos a insertar/modificar.
 @param {pObj} Objeto Contiene datos de respaldo(para la modificacion), undefined (si es para insertar).
 @param {pModelo} Modelo Modelo origen del cual se genera un historico.
 @param {pModeloHistorico} Modelo Modelo historico que almacena el dato anterior a la modificacion.
 @param {pIdUsuario} Int Identificador del usuario(campo de auditoria).
 @param {Objeto} pTransaccion transaccion sequelize.

 @return Retorna una promesa.
 */
const historicoVectorT =(pVector,pObj,pModelo,pModeloHis, pIdUsuario, pTransaccion)=> {
  var Promise=require('bluebird');
  var resultado = [];
  let identificador=pModelo.primaryKeyAttribute;

  // if(vectorValido(pVector)){
  if(Array.isArray(pVector)){
    var promises = pVector.map((pItem)=> {

      let antiguo=pObj!=undefined? pObj[pItem[identificador]]:undefined;

      if(antiguo!=undefined) pItem._usuario_modificacion=pIdUsuario;
      else pItem._usuario_creacion=pIdUsuario;

      return historicoT(pModelo,pModeloHis,pItem,antiguo, pTransaccion)
        .then(pRespuesta=> {
          if(antiguo===undefined){
            resultado.push(pRespuesta);
          }else{
            return;
          }
        })
        .catch(pError=> {
          // return Promise.resolve();
          return Promise.reject(pError);
        });
    });

  }

  return Promise.all(promises)
    .then(()=> {
      return Promise.resolve(resultado);
    })
    .catch(err=>{
      // TODO: Revisas con pruebas si lo mejor es rechazar o resolver la promesa.
      if(!promises) return Promise.reject("El vector con datos a modificar no es valido.");
      return Promise.reject(err);
    });
}
const generarDocumento = (pDatos) => {
  return new Promise((resolve,reject)=>{
    const nombreDocumento = formatoNombreDoc(pDatos.doc.nombre)
    pDatos.nombre=`${nombreDocumento}.pdf`;
    const rutaDocumento = `${dirDocumento}${pDatos.nombre}`;
    const rutaPlantilla = `${__dirname}/html_plantilla/documento.ejs`;


    let numeracion = pDatos.form_actual[0].templateOptions.numeracionPagina || false;
    let membrete = pDatos.form_actual[0].templateOptions.tipoMembrete || 'sin membrete';
    let tipoHoja = pDatos.form_actual[0].templateOptions.tipoHoja || 'Letter';
    let alto=0, ancho =0;
    switch (tipoHoja) {
      case "Letter":
        ancho='216mm';
        alto = '279mm';
      break;
      case "Oficio":
        ancho='216mm';
        alto = '330mm';
      break;
      case "A4":
        ancho='210mm';
        alto = '297mm';
      break;
      case "Externo":
        ancho ='210mm';
        alto ='279mm';
      break;
      case "Legal":
        ancho ='210mm';
        alto ='329mm';
      break;


    }
    // Combinacion de altura carta, ancho A4
    if (membrete == 'externo'){
      ancho ='210mm';
      alto ='279mm';
    }
    if (membrete == 'legal'){
      ancho ='210mm';
      alto ='329mm';
    }

    let ruta =__dirname;
    ruta = ruta.substr(0,ruta.lastIndexOf('/'));
    ruta = ruta.substr(0,ruta.lastIndexOf('/'));

    pDatos.html=false;
    pDatos.ruta=ruta;
    pDatos.numeracion=numeracion;
    pDatos.mensaje="Prohibida la reproducción."

    // console.log("revisando los valores de congifuracion", ruta,"\n",numeracion,"\n",tipoHoja);

    pDatos.doc.plantilla= JSON.parse(pDatos.doc.plantilla)

    ejs.renderFile(rutaPlantilla, pDatos, (pError, pHtml) => {

      if(pHtml){
        const configuracion = {
          filename: rutaDocumento,
          orientation: 'portrait',
          height: alto,
          width: ancho,
          border:{
            top:(membrete=='legal')?"1.7cm":"25mm",
            right:(membrete=='externo' || membrete=='legal')?"1.7cm":"2.5cm",
            bottom:"2.5cm",
            left:"25mm"
          },
          type:'application/pdf',
          footer: {
            height: "8mm",
            contents:(numeracion=='true'||numeracion==true)?'<div style="float:right;"><span style="color: #444;">{{page}}</span></div>':''
          },
          header: {
            height: "18mm"
          },
          quality: "100"
        };

        html_pdf.create(pHtml, configuracion).toFile(rutaDocumento, (pErrorCrear, pStream) => {
          if(pErrorCrear) reject((process.env.NODE_ENV=='production')? "No se pudo crear el pdf del documento":pError)
          else resolve(pDatos)
        })
      }
      else reject((process.env.NODE_ENV=='production')? "No se pudo generar el pdf del documento":pError);

    });


  });
}

/** Funcion que elimina caracteres especiales de una cadena de texto.
  @param {Texto} pCadena Cadena de texto con caracteres especiales
  @return {Texto} Retorna una cadena de texto sin caracteres especiales
 */
const formatoNombreDoc = (pCadena) => {
  pCadena = pCadena.replace(/ /gi,"_");

  const acentos =  "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
  const original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNncc";
  for (var i=0; i<pCadena.length; i++) {
    const indice = acentos.indexOf(pCadena[i])
    // console.log("Mi texto", pCadena[i], indice, acentos.charAt(indice));
    pCadena = pCadena.replace(acentos.charAt(indice), original.charAt(indice));
  }
  return pCadena;
}

const consulta = (req,res,next, pModelo) => {
  const attributes = req.query.fields.split(',') || null;
  if(req.query.filter !== undefined ){



    pModelo.describe().then( fields => {
      const xfilter = [];
      for(let i in fields){
        let field = fields[i];
        const obj = {};
        let x = null; // TODO: revisar si es el lugar correcto.
        var buscar = (attributes==null)? true : attributes.indexOf(i)!=-1;
        if(buscar)
        switch (field.type) {
          case 'INTEGER':
            x = parseInt(req.query.filter);
            if(!isNaN(x) && req.query.filter.indexOf("/") == -1){
                obj[i] = x;
                xfilter.push(obj);
            }
          break;
          case 'USER-DEFINED':
            x = req.query.filter;
            for (var j in field.special) {
              // console.log("j",field.special[j]);
              if(field.special[j].toLowerCase().indexOf(x.toLowerCase()) == 0){
                obj[i] = field.special[j];
                xfilter.push(obj);
              }
            }
          break;
          case 'TIMESTAMP WITH TIME ZONE':
          // Busqueda de fechas del tipo: 2016-10-20, 2016/10/20, 20-10-2016, 20/10/2016.
          // TODO: No se puede buscar por el mes.
          var consulta=procesarFecha(req.query.filter);
          if(consulta!=false){
            obj[i]=procesarFecha(req.query.filter);
            xfilter.push(obj);
          }
          break;
          case 'CHARACTER VARYING':
            obj[i] = { $ilike:"%"+req.query.filter+"%" };
            xfilter.push(obj);
          break;
          case 'TEXT':
            obj[i] = { $ilike:"%"+req.query.filter+"%" };
            xfilter.push(obj);
          break;
          default:
          obj[i] = req.query.filter;
          xfilter.push(obj);

        }

      }
      req.xfilter=xfilter;
      next();
    })

  }




}

/**
  Funcion que procesa una cadena, verifica si tiene el formato de una fecha.
  @param {pCadena} Cadena de texto con formato de fecha.
  @return Retorna:
  EXITO -> un objeto de consulta con formato sequelize.
  FALLO -> false.
*/
function procesarFecha(pCadena){

  var fecha=new Date(pCadena);
  var anio=null, inicio=null, fin=null;

  // Identifica el operador usando en la cadena para separar los datos.
  var operador=pCadena.indexOf('-')>-1? '-': pCadena.indexOf('/')>-1?'/':null;

  // Si existe un operador valido en la cadena.
  if(operador!=null){

    // Si la cadena no es valida como fecha, se la invierte.
    if(fecha == 'Invalid Date') {
      fecha =new Date(((pCadena.split(operador)).reverse()).join("-"));
    }
    // Obtine el año.
    anio=fecha.getFullYear();

    // Si existe el año.
    if(anio!=null){
      var vector=pCadena.split(operador)

      // Si la longitud del vector es igual a 3.
      if(vector.length==3){
        var indice=vector.indexOf(anio.toString());

        // Si el año existe dentro del vector de la cadena.
        if(indice>-1){

          // Armado de la fecha inicio y fecha fin.
          if(indice==0){
            inicio=vector[0]+"-"+vector[1]+"-"+vector[2];
            fin=vector[0]+"-"+vector[1]+"-"+(parseInt(vector[2])+1);
          }
          else if(indice==2) {
            inicio=vector[2]+"-"+vector[1]+"-"+vector[0];
            fin=vector[2]+"-"+vector[1]+"-"+(parseInt(vector[0])+1);
          }

          // Armado de la respuesta a retornar.
          var respuesta={
            $gte: inicio,
            $lt: fin
          };
          return respuesta;
        }
        else return false; // Fin condicional indice.
      }
      else return false; // Fin condicional longitud vector.
    }
    else return false; // Fin condicional existencia año.
  }
  else return false; // Fin condicional existencia operador.
}
const generarHtml = (pDatos) => {
  return new Promise((resolve,reject)=>{
    const nombreDocumento = formatoNombreDoc(pDatos.doc.nombre)
    pDatos.nombre=`${nombreDocumento}.pdf`;
    const rutaDocumento = `${dirDocumento}${pDatos.nombre}`;
    const rutaPlantilla = `${__dirname}/html_plantilla/documento.ejs`;


    let numeracion = pDatos.form_actual[0].templateOptions.numeracionPagina || false;
    let membrete = pDatos.form_actual[0].templateOptions.tipoMembrete || 'sin membrete';
    let tipoHoja = pDatos.form_actual[0].templateOptions.tipoHoja || 'Letter';
    let alto=0, ancho =0;
    switch (tipoHoja) {
      case "Letter":
        ancho='216mm';
        alto = '279mm';
      break;
      case "Oficio":
        ancho='216mm';
        alto = '330mm';
      break;
      case "A4":
        ancho='210mm';
        alto = '297mm';
      break;
      case "Externo":
        ancho ='210mm';
        alto ='279mm';
      break;
      case "Legal":
        ancho ='210mm';
        alto ='329mm';
      break;


    }
    // Combinacion de altura carta, ancho A4
    if (membrete == 'externo'){
      ancho ='210mm';
      alto ='279mm';
    }
    if (membrete == 'legal'){
      ancho ='210mm';
      alto ='329mm';
    }

    let ruta =__dirname;
    ruta = ruta.substr(0,ruta.lastIndexOf('/'));
    ruta = ruta.substr(0,ruta.lastIndexOf('/'));

    pDatos.html=true;
    pDatos.ruta=ruta;
    pDatos.numeracion=numeracion;
    pDatos.mensaje="Prohibida la reproducción."

    // console.log("revisando los valores de congifuracion", ruta,"\n",numeracion,"\n",tipoHoja);

    pDatos.doc.plantilla= JSON.parse(pDatos.doc.plantilla)

    ejs.renderFile(rutaPlantilla, pDatos, (pError, pHtml) => {

      if(pHtml){
        const configuracion = {
          filename: rutaDocumento,
          orientation: 'portrait',
          height: alto,
          width: ancho,
          border:{
            top:(membrete=='legal')?"1.7cm":"25mm",
            right:(membrete=='externo' || membrete=='legal')?"1.7cm":"2.5cm",
            bottom:"2.5cm",
            left:"25mm"
          },
          type:'application/pdf',
          footer: {
            height: "8mm",
            contents:(numeracion=='true'||numeracion==true)?'<div style="float:right;"><span style="color: #444;">{{page}}</span></div>':''
          },
          header: {
            height: "18mm"
          },
          quality: "100"
        };
        pHtml = pHtml.replace('<!DOCTYPE html>','');
        pHtml = pHtml.replace('<html>','');
        pHtml = pHtml.replace('<head>','');
        pHtml = pHtml.replace('<meta charset="utf-8">','');
        pHtml = pHtml.replace('</head>','');
        pHtml = pHtml.replace('<body class="globalHtml">','');
        pHtml = pHtml.replace('</body>','');
        pHtml = pHtml.replace('</html>','');
        pDatos.html=pHtml;
        resolve(pDatos)


      }
      else reject((process.env.NODE_ENV=='production')? "No se pudo generar el html del documento":pError);
    });


  });
}


module.exports = {
  funcionCabeceras,
  formatearMensaje,
  verificarJSON,
  insertarVector, // TODO:modificar para que use el historico.
  vectorValido,
  transformarConsulta,
  transformarVectorTexto,
  historico,
  generarPDF,
  historicoVector,
  historicoT,
  historicoVectorT,
  desserializarDeJson,
  convertirLike,
  generarDocumento,
  generarHtml,
  consulta,
  procesarFecha
};
