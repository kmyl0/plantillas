console.log("ejecucion test monitor")
describe("Ruta: ejemplo de consumo monitor normal", () => {
  var id_monitor = null;
  describe("GET /", () => {
    it("Test operacion GET monitor", done => {
      request.get("/api/v1/monitoreo/monitor/")
      .expect(200)
      .end((err, res) => {
        console.log("err->",err);
        // console.log("res.body->",res.body);
        const expected = "CODIGO";
        expect(res.body.datos.resultado[0].codigo).to.eql(expected);
        done(err);
        });
    });
  });

});
