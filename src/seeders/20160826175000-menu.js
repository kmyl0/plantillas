'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('menu', [
      // --------------------- CONFIGURACION -------------------------------
      {
        nombre: 'CONFIGURACIÓN',
        descripcion: 'Configuracion',
        orden: 1,
        ruta: '',
        icono: 'build',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1

      },
      {
        nombre: 'PLANTILLAS',
        descripcion: 'Bandeja de plantillas de documentos',
        orden: 1,
        ruta: 'plantillas',
        icono: 'settings',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 1
      },
      // --------------------- ADMINISTRACION DE USUARIOS -------------------------------
      {
        nombre: 'ADMINISTRACIÓN',
        descripcion: 'Administración',
        orden: 2,
        ruta: '',
        icono: 'settings',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'USUARIOS',
        descripcion: 'Administración de usuarios',
        orden: 1,
        ruta: 'usuario',
        icono: 'group',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 3
      },
      {
        nombre: 'ROLES',
        descripcion: 'Administración de roles',
        orden: 2,
        ruta: 'rol',
        icono: 'credit_card',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 3
      },
      {
        nombre: 'MENÚS',
        descripcion: 'Administración de menús',
        orden: 3,
        ruta: 'menu',
        icono: 'menu',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 3
      },
      // --------------------- DOCUMENTOS -------------------------------
      {
        nombre: 'DOCUMENTOS',
        descripcion: 'Documentos',
        orden: 3,
        ruta: '',
        icono: 'folder',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1
      },
      {
        nombre: 'MIS DOCUMENTOS',
        descripcion: 'Bandeja de documentos',
        orden: 2,
        ruta: 'documentos',
        icono: 'description',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 7
      },
      {
        nombre: 'APROBAR DOCUMENTOS',
        descripcion: 'Bandeja de documentos para aprobación',
        orden: 3,
        ruta: 'aprobacion',
        icono: 'description',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 7
      },
      {
        nombre: 'IMPRIMIR DOCUMENTOS',
        descripcion: 'Bandeja de documentos para impresión',
        orden: 4,
        ruta: 'impresion',
        icono: 'description',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 7
      },
      {
        nombre: 'DERIVADOS',
        descripcion: 'Bandeja de documentos derivados',
        orden: 0,
        ruta: 'aprobacion',
        icono: 'description',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 7
      },
      {
        nombre: 'EN CURSO',
        descripcion: 'Bandeja de documentos en curso',
        orden: 0,
        ruta: 'en_curso',
        icono: 'description',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 7
      },
      {
        nombre: 'MONITOREO',
        descripcion: 'Bandeja de monitoreo de solicitud de documentos',
        orden: 0,
        ruta: 'monitoreo',
        icono: 'description',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion:1,
        fid_menu_padre: 7
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
