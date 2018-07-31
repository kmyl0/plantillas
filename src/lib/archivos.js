/**
  Archivo con funciones y metodos para el manejo de archivos.
 */

const fs = require('fs');
const Promise=require('bluebird');
const Uuid = require('uuid');

module.exports={

  /**
    Función que crea un archivo, valida la ruta, si no existe la ruta la crea.
    @param {pRuta} Texto Cadena de texto que contiene la ruta destino para el archivo.
    @param {pData} Data Informacion a ser escrita en el archivo.
    @param {pNombrePublico} Texto Cadena de texto que contiene el nombre del archivo mas su extension.
    @param {pSobreEscribir} Boleano Es usado para sobreescribir un archivo.
    @example Ejemplo de uso.
    var files=require('../../lib/archivos');
    let ruta=RutaAdjuntos+"prueba2/1/2/3/4/5/6/7/8/9/10/11/12";
    let data="Hola mundo desde un txt5!!!"
    let nombre="archivo5.txt";
    let privado="c1afac81-2465-4315-b3d6-d8c14a9316f0.txt"

    files.crearArchivo(ruta,data,nombre,privado,false)
    .then(pRespuesta=>{
      console.log("Archivo creado", pRespuesta);
    })
    .catch(pError=>{
      console.log("Error al crear ", pError);
    });
   */
  crearArchivo:(pRuta, pData, pNombrePublico,pTipo, pNombrePrivado, pSobreEscribir)=>{

    // Declara e inicializa variables locales.
    let rutaOrigen=null,indiceBarra=null,dir=null,indiceBarraFin=null,temp=null;
    let nombreGenerado=pNombrePrivado? pNombrePrivado:Uuid.v4()+pNombrePublico.substring(pNombrePublico.lastIndexOf("."),pNombrePublico.length);

    // Instancia una nueva promesa, con sus dos metodos.
    return new Promise((resolve,reject)=>{
      // TODO: Considerar los demas tipos e ruta.
      // Procesa parte inicial de una ruta del tipo ./ruta/...
      indiceBarra=pRuta.indexOf('/');
      temp=pRuta.substring(0,indiceBarra+1);
      pRuta=pRuta.substring(indiceBarra+1,pRuta.length);
      indiceBarra=pRuta.indexOf('/');
      dir=temp+pRuta.substring(0,indiceBarra);

      // Realiza la iteracion mientras la longitud de la ruta sea mayor a 0 y no exista '/'.
      while (pRuta.length>0 && indiceBarra!==-1) {

        // Si no existe la ruta la crea.
        if(!fs.existsSync(dir)) fs.mkdirSync(dir);

        // Actualiza los datos de las variables.
        rutaOrigen=dir;
        pRuta=pRuta.substring(indiceBarra+1,pRuta.length);
        indiceBarra=pRuta.indexOf('/');
        dir=rutaOrigen+"/"+pRuta.substring(0,indiceBarra);
      }

      // Si la longitud de la ruta es mayor a 0.
      if(pRuta.length>0){
        dir+=pRuta;

        // Si no existe la ruta la crea.
        if(!fs.existsSync(dir)) fs.mkdirSync(dir);
      }

      // Almacena la ruta completa del archivo.
      let rutaArchivo=dir+"/"+nombreGenerado;

      // Objeto a enviar.
      let respuesta={nombre_publico:pNombrePublico,nombre_privado:nombreGenerado,data:pData,type:pTipo}

      // Verifica si existe el parametro para sobreescribir el archivo, crea o sobre-escribe el archivo.
      if(pSobreEscribir && pSobreEscribir==true)
        fs.writeFile(rutaArchivo, pData, {flag: 'w+'},(pErrorEscritura)=> pErrorEscritura? reject(pErrorEscritura) : resolve(respuesta));

      // Si no existe el parametro para sobreescribir, verifica la existencia.
      else
        !fs.existsSync(rutaArchivo)?
        fs.writeFile(rutaArchivo, pData, {flag: 'w+'},pErrorEscritura=> pErrorEscritura?  reject(pErrorEscritura) :  resolve(respuesta)) :
        reject("El archivo ya existe.");

    });
  }


}
