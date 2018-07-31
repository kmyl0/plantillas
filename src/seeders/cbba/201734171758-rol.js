 'use strict'
  module.exports = {
    up: function(queryInterface, Sequelize){

      return queryInterface.bulkInsert('rol',
        [{"id_rol":1,"nombre":"ADMIN","descripcion":"Administrador","peso":0,"estado":"ACTIVO","_usuario_creacion":1,"_usuario_modificacion":2,"_fecha_creacion":"2016-12-20T22:57:39.994Z","_fecha_modificacion":"2016-12-20T22:57:39.994Z"},{"id_rol":4,"nombre":"SECRETARIA","descripcion":"Secretaria","peso":0,"estado":"ACTIVO","_usuario_creacion":1,"_usuario_modificacion":2,"_fecha_creacion":"2016-12-20T22:57:39.994Z","_fecha_modificacion":"2016-12-20T22:57:39.994Z"},{"id_rol":5,"nombre":"CONFIGURADOR","descripcion":"Configurador","peso":0,"estado":"ACTIVO","_usuario_creacion":1,"_usuario_modificacion":2,"_fecha_creacion":"2016-12-20T22:57:39.994Z","_fecha_modificacion":"2016-12-20T22:57:39.994Z"},{"id_rol":3,"nombre":"OPERADOR","descripcion":"Operador Administrativo Financiero","peso":0,"estado":"ACTIVO","_usuario_creacion":1,"_usuario_modificacion":123,"_fecha_creacion":"2016-12-20T22:57:39.994Z","_fecha_modificacion":"2017-01-11T23:45:06.001Z"},{"id_rol":2,"nombre":"JEFE","descripcion":"Jefe/Responsable de Area o Unidad","peso":0,"estado":"ACTIVO","_usuario_creacion":1,"_usuario_modificacion":123,"_fecha_creacion":"2016-12-20T22:57:39.994Z","_fecha_modificacion":"2017-01-11T23:45:14.812Z"}]
      );
    },

    down: function(queryInterface, Sequelize){

    }
  }
  