'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('conf_notificacion', [


    {"fid_usuario":1,"celular":1234567,"canal":"CORREO","enviado":false,"observado":false,"aprobado":false,"derivado":false,"_usuario_creacion":1,"_usuario_modificacion":2,"_fecha_creacion":"2016-12-16T14:47:33.405Z","_fecha_modificacion":"2016-12-16T14:47:33.405Z"},


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
