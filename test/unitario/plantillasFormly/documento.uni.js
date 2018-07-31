console.log("ejecucion test documento")
describe("Ruta: ejemplo de consumo documento normal", () => {
  var id_documento = null;
  describe("GET /", () => {
    it("Test operacion GET documento", done => {
      request.get("/api/v1/plantillasFormly/documento/")
      .expect(200)
      .end((err, res) => {
        console.log("err->",err);
        // console.log("res.body->",res.body);
        const expected = [];
        expect(res.body.datos.resultado).to.not.eql(expected);
        done(err);
        });
    });
  });
  describe("POST /", () => {
    it("Test operacion POST documento", done => {
      request.post("/api/v1/plantillasFormly/documento/")
      .expect(200)
      .type('json')
      //TODO: se debe cambiar el json conforme a los campos de la tabla testeada
      .send(`{
        "nombre": "TEST_INSERT",
        "plantilla": "[]",
        "plantilla_valor": "[]",
        "_usuario_creacion": "1",
        "sw":{
      		"enviar":false,
      		"enviado":false
      	}
      }`)
      .end((err, res) => {
        const expected = "TEST_INSERT";
        console.log("err->", err);
        // console.log("res.body->",res.body);
        id_documento = res.body.datos.id_documento;
        expect(res.body.datos.nombre).to.eql(expected);
        done(err);
        });
    });
  });
  describe("PUT /", () => {
    it("Test operacion PUT documento", done => {
      request.put("/api/v1/plantillasFormly/documento/"+id_documento)
      .type('json')
      //TODO: se debe cambiar el json conforme a los campos de la tabla testeada
      .send(`{
        "nombre": "TEST_UPDATE",
        "_usuario_modificacion": "1",
        "sw":{
      		"enviar":false,
      		"enviado":false
      	}
      }`)
      .expect(200)
      .end((err, res) => {
        const expected = "TEST_UPDATE";
        console.log("err->", err);
        // console.log("res.body->",res.body);
        // expect(res.body.datos.nombre).to.eql(expected);
        done(err);
        });
    });
  });
  
});
