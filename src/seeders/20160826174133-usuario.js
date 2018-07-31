'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuario', [
      {"fid_unidad":null,"usuario":"admin","contrasena":"672caf27f5363dc833bda5099775e891","numero_documento":"12345678","nombres":"Rogers","apellidos":"Salinas","cargo":"PROF. DESARROLLO","email":"example@dominio.org","estado":"ACTIVO","_usuario_creacion":1,"_usuario_modificacion":1,"_fecha_creacion":"2016-12-16T14:47:33.273Z","_fecha_modificacion":"2016-12-16T14:47:33.273Z"},

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
