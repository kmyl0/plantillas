'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('unidad', [
      {
        nombre: 'Gerencia General',
        abreviacion: 'GG',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Gerencia de Informatica y Comunicaciones',
        abreviacion: 'GIC',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Gerencia Comercial',
        abreviacion: 'GCO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Gerencia Adminsitrativa Financiera',
        abreviacion: 'GAF',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Gerencia de Asuntos Administrativos',
        abreviacion: 'GAA',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Jefatura de Infraestructura',
        abreviacion: 'JIN',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Jefatura de XXX',
        abreviacion: 'JXX',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Seccion de Redes',
        abreviacion: 'SRE',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Seccion de Desarrollo',
        abreviacion: 'SDE',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
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
