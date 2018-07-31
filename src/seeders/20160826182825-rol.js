'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rol', [
      {
        nombre: 'ADMIN',
        descripcion: 'Administrador',
        peso: 0,
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:2
      },
      {
        nombre: 'JEFE',
        descripcion: 'Jefe/Responsable de Area o Unidad',
        peso: 0,
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:2
      },
      {
        nombre: 'OPERADOR',
        descripcion: 'Operador Administrativo Financiero',
        peso: 0,
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:2
      },
      {
        nombre: 'SECRETARIA',
        descripcion: 'Secretaria',
        peso: 0,
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:2
      },
      {
        nombre: 'CONFIGURADOR',
        descripcion: 'Configurador',
        peso: 0,
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:2
      },
      {
        nombre: 'CORRESPONDENCIA',
        descripcion: 'Responsable de correspondencia',
        peso: 1,
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:2
      }

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
