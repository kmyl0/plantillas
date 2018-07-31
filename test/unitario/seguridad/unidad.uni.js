console.log("ejecucion test unidad")
describe("Ruta: ejemplo de consumo unidad normal", () => {
  var id_unidad = null;
  describe("GET /", () => {
    it("Test operacion GET unidad", done => {
      request.get("/api/v1/seguridad/unidad/")
      .expect(200)
      .end((err, res) => {
        console.log("err->",err);
        // console.log("res.body->",res.body);
        const expected = [];
        expect(res.body.datos.resultado.codigo).to.not.eql(expected);
        done(err);
        });
    });
  });
  
});
