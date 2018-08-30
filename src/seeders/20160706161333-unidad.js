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
        nombre: 'Recursos Humanos',
        abreviacion: 'RRHH',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Auditoria Interna',
        abreviacion: 'AI',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Seguridad de la Información',
        abreviacion: 'SI',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'OyM',
        abreviacion: 'OM',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Departamento de Informática y Comunicaciones',
        abreviacion: 'DIC',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Departamento Juridico Legal',
        abreviacion: 'DJL',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Departamento Administrativo Financiero',
        abreviacion: 'DAF',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Departamento de Seguros',
        abreviacion: 'DSE',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Contabilidad',
        abreviacion: 'JCO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Servicios Generales, Activos Fijos y Almacenes',
        abreviacion: 'JSG',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Tesoreria',
        abreviacion: 'STE',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Archivo',
        abreviacion: 'SAR',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Jefatura de Cartera',
        abreviacion: 'JCA',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Regional Santa Cruz',
        abreviacion: 'RSC',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'Regional Cochabamba',
        abreviacion: 'RCB',
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
