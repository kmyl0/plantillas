const Promise = require('bluebird');
const Uuid = require('uuid');
const Archivo = require('../../lib/archivos');

module.exports = {


  actualizarDocumento: (pDocumento, pDatos, pModeloHistorial) =>
    new Promise((resolve, reject) =>
    pDocumento.update(pDatos)
    .then(pDoc => {
      const flag=(pDatos.estado == 'DERIVADO' && pDatos.via_actual == pDatos._usuario_modificacion)? false:true;

      if(flag ){
        pModeloHistorial.create({
          id_documento:pDoc.id_documento,
          accion:pDatos.estado,
          observacion:(pDatos.observaciones)?pDatos.observaciones:'',
          _usuario_creacion:pDatos._usuario_modificacion,
        })
        .then(pResultado => resolve(pResultado))
      }
      else resolve();

    })
    .catch(pError => reject(pError))
  ),
  cerrarDocumento:(pModeloDocumento, pModeloHistorial,pDocumento, pUsuario) => {
    const datosActualizar = {
      estado:'CERRADO',
      _usuario_modificacion:pUsuario,
    };

    return new Promise((resolve, reject) => {
      if(pDocumento.grupo){
          pModeloDocumento.findAll({
              where: {
                grupo: pDocumento.grupo,
                estado: {$ne:'ELIMINADO'},
              },
              order: '_fecha_creacion ASC',
          })
          .then( pRespuesta =>  resolve(Promise.each(pRespuesta, (it) => module.exports.actualizarDocumento(it, datosActualizar, pModeloHistorial) ) ))
          .catch( pError => reject(pError))
      }else {
        resolve(true)
      }

    })
  },

  buscarHijos:(pModeloDocumento,pDocumento) =>
  new Promise((resolve, reject) => pModeloDocumento.findAll({
    where:{documento_padre:pDocumento.dataValues.id_documento},
  })
  .then(pResultado => {(pResultado.length > 0)?resolve(true):resolve(false)})
  .catch(pError => reject(pError))
  ),

  eliminarDocumento: (pIdUsuario, pIdDocumento, pModelo, pModeloHistorial) => {
    const condicion={};
    if(pIdUsuario!=null || pIdUsuario!=undefined) condicion._usuario_creacion=pIdUsuario
    if(pIdDocumento!=null || pIdDocumento!=undefined) condicion.id_documento=pIdDocumento
    return new Promise((resolve, reject) => pModelo.findOne({where:condicion})
    .then(pResultado => {

      if(pResultado != null){
        if(pResultado.estado=='NUEVO' || pResultado.estado=='RECHAZADO'){
          return module.exports.actualizarDocumento(pResultado,
          {
            estado:'ELIMINADO',
            _usuario_modificacion: pIdUsuario,
            documento_padre: -pResultado.documento_padre,
          }, pModeloHistorial)
        }
        else throw new Error("La modificacion no esta disponible en este momento.");
      }
      else throw new Error("El documento solicitado no existe");
    })
    .then(() => resolve())
    .catch(pError => reject(pError)))

  },

  documento_enviar: (modeloHistorialFlujo, doc, tr, pDirector) =>
  new Promise( (resolve, reject) => {
    const via = JSON.parse(doc.via);
    const para = JSON.parse(doc.para);
    let viaActual = 0, i;
    const form = JSON.parse(doc.plantilla);

    let aprobarPorDireccion = false;
    for (let f = 0; f < form.length; f++) {
      if (form[f].type == "datosGenerales" && form[f].templateOptions) {
        aprobarPorDireccion = form[f].templateOptions.aprobarPorDireccion;
        break;
      }
    }

    if (aprobarPorDireccion && via.length==0) {
        viaActual = pDirector;
    } else {
        if (via.length>0) {
            viaActual = via[0];
        } else {
            viaActual = para[0];
        }
    }

    doc.update({
      via_actual: viaActual,
      estado: 'ENVIADO',
      usuario_modificacion: doc._usuario_creacion,
    }, tr)
    .then(doc =>
      modeloHistorialFlujo.create({
        id_documento:doc.id_documento,
        accion: 'ENVIADO',
        observacion: '',
        estado: 'ACTIVO',
        _usuario_creacion: doc._usuario_creacion,
      }, tr)
    )
    .then( resu =>  resolve(resu))
    .catch( e => reject(e));
  }),

  documento_crear: (modeloHistorialFlujo, idDocumento, idUsuario, tr) =>
  new Promise( (resolve, reject) => {
    modeloHistorialFlujo.create({
      id_documento:idDocumento,
      accion:'CREADO',
      observacion:'',
      _usuario_creacion:idUsuario,
    }, tr)
    .then( resu =>  resolve(resu))
    .catch( e => reject(e));
  }),


  actualizarGrupo: (modeloDocumento, doc, tr) =>
  new Promise( (resolve, reject) => {
    if(doc.documento_padre){
      modeloDocumento.findById(doc.documento_padre)
      .then( doc_padre => doc.update({grupo: doc_padre.grupo}, tr))
      .then( resu =>  resolve(resu))
      .catch( e => reject(e));
    }else {
      doc.update({grupo: doc.id_documento}, tr)
      .then( resu =>  resolve(resu))
      .catch( e => reject(e));
    }
  }),

  /**
   * Método que crea fisicamente los base64 que se le envien.
   * @param  {VECTOR} pVector Contiene un vector de objetos, los cuales traen consigo un base64.
   * @param  {TEXTO} pRuta   Cadena de texto con la ruta destino.
   * @return {VECTOR}        Retorna el vector de objetos actualizados, sin base64.
   */
  crearExternos: (pVector, pRuta) => {

    const externos = pVector.map(pItem => {

      const data = pItem.base64;

      if(data!=undefined){
        const tipo = pItem.filetype.substr(pItem.filetype.indexOf('/')+1,pItem.filetype.length);

        pItem.nombre_privado= `${Uuid.v4()}.${tipo}`;
        pItem.nombre_publico=`${pItem.filename}`;
        pItem.url= `${pRuta.substr(1,pRuta.length)}/${pItem.nombre_privado}`;
        delete pItem.base64;

        return Archivo.crearArchivo(pRuta, new Buffer(data, "base64"), pItem.nombre_publico, tipo, pItem.nombre_privado, true)
        .then(pRespuesta => Promise.resolve())
        .catch(pError => Promise.reject(pError))
      }
      else {
        return Promise.resolve();
      }

    });

    return Promise.all(externos)
    .then(() => Promise.resolve(pVector))
    .catch(pError => Promise.reject(pError))
  },
  /**
   * Función que verifica la existencia de archivos externos,
   * si hay los crea fisicamente en le servidor.
   * @param  {OBJETO} pDatos Objeto que contiene los datos de un documento. Entre los cuales se encuentran documetos externos.
   * @param  {TEXTO} pRuta  Cadena de texto que contiene la ruta donde se almacena los documentos.
   * @return {TEXTO}        Retorna un objeto transformado en texto en caso de que existan, de lo contrario nada.
   */
  verificarExternos: (pDatos, pRuta) => {

    let tieneAdjuntos=false;
    let documentos=[];

    return new Promise((resolve, reject) => {

      if(pDatos.plantilla_valor){
        const valores= JSON.parse(pDatos.plantilla_valor);

        for (const i in valores) {
          if(i.search('archivo') > -1){
            tieneAdjuntos=true;
            documentos=documentos.concat(valores[i]);
          }
        }
        if(tieneAdjuntos){
          module.exports.crearExternos(documentos, pRuta)
          .then(pRespuesta => resolve(JSON.stringify(valores)))
          .catch(pError => reject(pError))
        }
        else{
          resolve();
        }
      }
      else {
        resolve();
      }



    })

  },

  validarPeticionGet:(pModeloDocumento, pModeloHistorial, pDocumento, pUsuario) => {
    console.log("Iniciando las validaciones de la peticion");
    return new Promise((resolve, reject) => {

      if(pDocumento.estado != 'NUEVO'){

        const via = JSON.parse(pDocumento.via);
        const para = JSON.parse(pDocumento.para);
        const de = JSON.parse(pDocumento.de);
        module.exports.obtenerDocumentos(pModeloDocumento, pModeloHistorial, pDocumento)
        .then(pDocumentos => {
          pDocumentos.forEach((pDoc, pIndice) => {

            switch (pDocumento.estado) {
              case 'CERRADO':
                pUsuario.roles.forEach(pRol => {
                  switch (pRol.rol.nombre) {
                    case 'OPERADOR':
                      if(pDoc._usuario_creacion == pUsuario.id_usuario ||
                        de.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                    case 'JEFE':
                      if(via.indexOf(pUsuario.id_usuario) > -1 ||
                        para.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario ||
                        pDoc._usuario_creacion == pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                    case 'SECRETARIA':
                      resolve(true)
                    break;
                    case 'CORRESPONDENCIA':
                      if(via.indexOf(pUsuario.id_usuario) > -1 ||
                        para.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario ||
                        pDoc._usuario_creacion == pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                  }
                })
              break;
              case 'ENVIADO':
                pUsuario.roles.forEach(pRol => {
                  // console.log("El rol del usuario es ====> ", pRol.rol.nombre);
                  switch (pRol.rol.nombre) {
                    case 'OPERADOR':
                      if(pDoc._usuario_creacion == pUsuario.id_usuario ||
                        de.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                    case 'JEFE':
                      if(via.indexOf(pUsuario.id_usuario) > -1 ||
                        para.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario ||
                        pDoc._usuario_creacion == pUsuario.id_usuario ){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                    case 'SECRETARIA':
                      if(pDoc._usuario_creacion == pUsuario.id_usuario ||
                        de.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                    case 'CORRESPONDENCIA':
                      if(via.indexOf(pUsuario.id_usuario) > -1 ||
                        para.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario ||
                        pDoc._usuario_creacion == pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;


                  }
                })
              break;
              case 'RECHAZADO':
                pUsuario.roles.forEach(pRol => {
                  switch (pRol.rol.nombre) {
                    case 'OPERADOR':
                      if(pDoc._usuario_creacion == pUsuario.id_usuario ||
                        de.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                    case 'JEFE':
                      if(via.indexOf(pUsuario.id_usuario) > -1 ||
                        para.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario ||
                        pDoc._usuario_creacion == pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                    case 'SECRETARIA':
                      if(pDoc._usuario_creacion == pUsuario.id_usuario ||
                        de.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                    case 'CORRESPONDENCIA':
                      if(via.indexOf(pUsuario.id_usuario) > -1 ||
                        para.indexOf(pUsuario.id_usuario) > -1 ||
                        pDocumento.via_actual==pUsuario.id_usuario){
                        resolve(true);
                      }
                      else resolve(false)
                    break;
                  }
                })
              break;
              case 'DERIVADO':
              pUsuario.roles.forEach(pRol => {
                switch (pRol.rol.nombre) {
                  case 'OPERADOR':
                    if(pDoc._usuario_creacion == pUsuario.id_usuario ||
                      de.indexOf(pUsuario.id_usuario) > -1 ||
                      pDocumento.via_actual==pUsuario.id_usuario){
                      resolve(true);
                    }
                    else resolve(false)
                  break;
                  case 'JEFE':
                    if(via.indexOf(pUsuario.id_usuario) > -1 ||
                      para.indexOf(pUsuario.id_usuario) > -1 ||
                      pDocumento.via_actual==pUsuario.id_usuario){
                      resolve(true);
                    }
                    else resolve(false)
                  break;
                  case 'CORRESPONDENCIA':
                    if(via.indexOf(pUsuario.id_usuario) > -1 ||
                      para.indexOf(pUsuario.id_usuario) > -1 ||
                      pDocumento.via_actual==pUsuario.id_usuario){
                      resolve(true);
                    }
                    else resolve(false)
                  break;
                  case 'SECRETARIA':
                    resolve(true)
                  break;
                }
              })
              break;


            }
          })
        })
        .catch(pError => {
          console.log("Error en la obtencion de los documentos desde el global", pError);
          resolve(false);
        })

      }
      else if(pDocumento.estado == 'NUEVO'){
        resolve((pDocumento._usuario_creacion == pUsuario.id_usuario)? true:false);
      }
      else resolve(false);
    })

  },
  obtenerDocumentos: (pModeloDocumento, pModeloHistorial, pDocumento) =>
    new Promise((resolve, reject) =>
      module.exports.obtenerIdDocumentos(pModeloDocumento, pDocumento.grupo)
      .then(pIds => pModeloHistorial.findAll({where:{id_documento:{$in:pIds}}})
        .then(pDocumentos => {
          resolve(pDocumentos);
        })
      )
      .catch(pError => {
        console.log("Error al buscar en el historial", pError);
        reject(pError);
      })
  ),
  obtenerIdDocumentos:(pModeloDocumento, pGrupo) => {
    const documentos=[];
    return new Promise((resolve, reject) => {
      pModeloDocumento.findAll({
        attributes:['id_documento'],
        where:{grupo:pGrupo},
      })
      .then(pDocumentos => {
        if(pDocumentos.length > 0){
          return pDocumentos.forEach((pDoc, pIndice) => {
            documentos.push(pDoc.id_documento);
            if(pIndice == pDocumentos.length-1) resolve(documentos);
          });
        }
        else resolve([]);
      })
      .catch(pError => {
        console.log("Error al buscar los ids del grupo", pError);
        reject(pError)
      })
    }) // fin iteracion.

  },
}
