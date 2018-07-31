'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuario_rol', [
        /*
        "1";"admin"
        */
    /*
       "1";"ADMIN"
       "2";"JEFE"
       "3";"OPERADOR"
       "4";"SECRETARIA"
    */

   /*
    "1";;"CONFIGURACIÓN"
    "2";1;"PLANTILLAS"
    "3";;"ADMINISTRACIÓN"
    "4";3;"USUARIOS"
    "5";3;"ROLES"
    "6";3;"MENÚS"
    "7";;"DOCUMENTOS"
    "8";7;"MIS DOCUMENTOS"
    "9";7;"APROBAR DOCUMENTOS"
    "10";7;"IMPRIMIR DOCUMENTOS"
    */

    {"fid_usuario":1,"fid_rol":1,"estado":"ACTIVO","_usuario_creacion":1,"_usuario_modificacion":2,"_fecha_creacion":"2016-12-16T14:47:33.405Z","_fecha_modificacion":"2016-12-16T14:47:33.405Z"},

    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
