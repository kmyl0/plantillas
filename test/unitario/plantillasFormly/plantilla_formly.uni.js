console.log("ejecucion test plantilla_formly")
describe("Ruta: ejemplo de consumo plantilla_formly normal", () => {
  var id_plantilla_formly = null;
  describe("GET /", () => {
    it("Test operacion GET plantilla_formly", done => {
      request.get("/api/v1/plantillasFormly/plantilla_formly/")
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
    it("Test operacion POST plantilla_formly", done => {
      request.post("/api/v1/plantillasFormly/plantilla_formly/")
      .expect(201)
      .type('json')
      .send(`
        {
        	"nombre": "Documento Test",
          "abreviacion": "DT",
          "plantilla": "[]",
          "plantilla_valor": null,
          "_usuario_creacion":1
        }`)
      .end((err, res) => {
        const expected = "DT";
        console.log("err->", err);
        // console.log("res.body->",res.body);
        id_plantilla_formly = res.body.datos.id_plantilla_formly;
        expect(res.body.datos.abreviacion).to.eql(expected);
        done(err);
        });
    });
  });
  describe("PUT /", () => {
    it("Test operacion PUT plantilla_formly", done => {
      request.put("/api/v1/plantillasFormly/plantilla_formly/"+id_plantilla_formly)
      .type('json')
      //TODO: se debe cambiar el json conforme a los campos de la tabla testeada
      .send(`
        {
          "abreviacion": "DTUP",
          "_usuario_modificacion":1
        }`)
      .expect(200)
      .end((err, res) => {
        const expected = "DTUP";
        console.log("err->", err);
        // console.log("res.body->",res.body);
        expect(res.body.datos.abreviacion).to.eql(expected);
        done(err);
        });
    });
  });
  describe("DELETE /", () => {
    it("Test operacion DELETE plantilla_formly", done => {
      request.delete("/api/v1/plantillasFormly/plantilla_formly/"+id_plantilla_formly)
      .expect(200)
      .end((err, res) => {
        const expected = 'EXITO';
        console.log("err->", err);
        // console.log("res.body->",res.body);
        expect(res.body.tipoMensaje).to.eql(expected);
        done(err);
        });
    });
  });
});
