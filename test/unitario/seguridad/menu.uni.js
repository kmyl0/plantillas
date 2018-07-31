console.log("ejecucion test menus")
describe("Ruta: ejemplo de consumo menus normal", () => {
  var id_menu=null;
  describe("GET /", () => {
    it("Test de operacion GET Menu", done => {
      request.get("/api/v1/seguridad/menu/")
      .expect(200)

      .end((err, res) => {
        // console.log("error menu->>",err);
        const expected = [];
        expect(res.body.datos.results).to.not.eql(expected);
        done(err);
        });
    });
  });
  describe("POST /", () => {
    it("Test de operacion POST Menu", done => {
      request.post("/api/v1/seguridad/menu/")
      .expect(201)
      .type('json')
      .send('{"fid_menu_padre": null,"nombre": "MENU_TEST","descripcion": "Test de la creacion de menu","orden": 2,"ruta": "test","icono": "test","method_get": true,"method_post": true,"method_put": true,"method_delete": true,"estado": "INACTIVO","_usuario_creacion": 1,"_usuario_modificacion": 2,"_fecha_creacion": "2016-08-23T14:42:10.565Z","_fecha_modificacion": "2016-08-23T14:42:10.565Z"}')

      .end((err, res) => {
        // console.log("ERROR POST MENU",err);
        id_menu=res.body.datos.id_menu;
        const expected = "MENU_TEST";
        expect(res.body.datos.nombre).to.eql(expected);
        done(err);
        });
    });
  });
  describe("PUT /", () => {
    it("Test de operacion PUT Menu", done => {
      request.put("/api/v1/seguridad/menu/"+id_menu)
      .type('json')
      .send('{"nombre": "MENU_TEST_UPDATED","descripcion": "Test de la creacion de menu actualizado","orden": 2,"ruta": "test","icono": "test","method_get": true,"method_post": false,"method_put": true,"method_delete": true,"estado": "INACTIVO","_usuario_modificacion": 2,"_fecha_modificacion": "2017-08-23T14:42:10.565Z"}')
      .expect(200)
      .end((err, res) => {
        const expected = "MENU_TEST_UPDATED";
        console.log("err->", err);
        // console.log(res.body);
        expect(res.body.datos.nombre).to.eql(expected);
        done(err);
        });
    });
  });
  describe("DELETE /", () => {
    it("Test de operacion DELETE Menu", done => {
      request.delete("/api/v1/seguridad/menu/2")
      .expect(204)
      .end((err, res) => {
        const expected = {};
        expect(res.body).to.eql(expected);
        done(err);
        });
    });
  });
});
