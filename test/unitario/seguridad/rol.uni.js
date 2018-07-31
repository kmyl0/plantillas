
describe("Ruta: ejemplo de consumo roles normal", () => {
  var id_rol=null;
  describe("GET /", () => {
    it("Test de operacion GET Rol", done => {
      request.get("/api/v1/seguridad/rol/")
      .expect(200)
      .end((err, res) => {
        const expected = "ADMIN";
        expect(res.body.datos.resultado[0].nombre).to.eql(expected);
        done(err);
        });
    });
  });
  describe("POST /", () => {
    it("Test de operacion POST Rol", done => {
      request.post("/api/v1/seguridad/rol/")
      .expect(201)
      .type('json')
      //TODO: se debe cambiar el json conforme a los campos de la tabla testeada
      .send('{"nombre": "test_user","descripcion": "usuario de test","peso": 0,"estado": "ACTIVO","_fecha_creacion": "2004-08-16","_fecha_modificacion": "2004-08-16","_usuario_creacion": 1,"_usuario_modificacion":2,"audit_usuario":{"usuario":1}  }')
      .end((err, res) => {
        id_rol=res.body.datos.id_rol;
        const expected = "test_user";
        // console.log("err->", err);
        // console.log(res.body);
        expect(res.body.datos.nombre).to.eql(expected);
        done(err);
        });
    });
  });
  describe("PUT /", () => {
    it("Test de operacion PUT Rol", done => {
      request.put("/api/v1/seguridad/rol/"+id_rol)
      .type('json')
      //TODO: se debe cambiar el json conforme a los campos de la tabla testeada
      .send('{"nombre": "test_user_updated","audit_usuario":{"usuario":2}}')
      .expect(200)
      .end((err, res) => {
        const expected = "test_user_updated";
        console.log("err->", err);
        // console.log(res.body);
        expect(res.body.datos.nombre).to.eql(expected);
        done(err);
        });
    });
  });
});
