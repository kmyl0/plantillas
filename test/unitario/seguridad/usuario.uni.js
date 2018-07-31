console.log("ejecucion test usuario")
describe("Ruta: ejemplo de consumo usuarios normal", () => {
  var id_usuario=null;
  describe("GET /", () => {
    it("Test de operacion GET Usuario", done => {
      request.get("/api/v1/seguridad/usuario/")
      .expect(200)
      .end((err, res) => {

        const expected = [];


        expect(res.body.datos).to.not.eql(expected);
        done(err);
        });
    });
  });
  describe("POST /", () => {
    it("Test de operacion POST Usuario", done => {
      request.post("/api/v1/seguridad/usuario/")
      .expect(201)
      .type('json')
      .send(`{
         "usuario":"test",
         "contrasena":"test",
         "numero_documento":12345678,
         "nombres":"Juan",
         "apellidos":"Perez Perez",
         "cargo":"tester",
         "email":"test@test.test",
         "_usuario_creacion":1,
         "roles":[1,2]
        }
        `)
      .end((err, res) => {
        id_usuario=res.body.datos.id_usuario;
        const expected = "test";
        // console.log("err->", err);

        expect(res.body.datos.usuario).to.eql(expected);
        done(err);
        });
    });
  });

  describe("PUT /", () => {
    it("Test de operacion PUT Usuario", done => {
      request.put("/api/v1/seguridad/usuario/"+id_usuario)
      .type('json')
      //TODO: se debe cambiar el json conforme a los campos de la tabla testeada

      .send('{"nombres": "TEST_UPDATED","usuario":"test_updated","_fecha_modificacion": "2004-08-16"}')
      // .send('{"nombres": "TEST_UPDATED","apellidos":"Test user update","usuario":"test_updated","_fecha_modificacion": "2004-08-16","audit_usuario":{"usuario":1},"roles":[{"estado": "ACTIVO","_fecha_creacion": "2005-08-16","_fecha_modificacion": "2006-09-16","_usuario_creacion": 1,"_usuario_modificacion":2}]}')
      .expect(200)
      .end((err, res) => {
        const expected = "test_updated";
        console.log("err->", err);
        // console.log(res.body);
        expect(res.body.datos.usuario).to.eql(expected);
        done(err);
        });
    });
  });

});
