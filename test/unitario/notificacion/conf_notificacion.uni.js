console.log("ejecucion test conf_notificacion")
describe("Ruta: ejemplo de consumo conf_notificacion normal", () => {
  var id_conf_notificacion = null;
  describe("GET /", () => {
    it("Test operacion GET conf_notificacion", done => {
      request.get("/api/v1/notificacion/conf_notificacion/")
      .expect(200)
      .end((err, res) => {
        console.log("err->",err);
        console.log("res.body->",res.body.datos.resultado.length);
        const expected = [];
        id_conf_notificacion = res.body.datos.resultado[0].id_conf_notificacion;
        expect(res.body.datos.resultado).to.not.eql(expected);
        done(err);
        });
    });
  });
  describe("PUT /", () => {
    it("Test operacion PUT conf_notificacion", done => {
      request.put("/api/v1/notificacion/conf_notificacion/"+id_conf_notificacion)
      .type('json')
      //TODO: se debe cambiar el json conforme a los campos de la tabla testeada
      .send('{"enviado": true}')
      .expect(200)
      .end((err, res) => {
        const expected = true;
        console.log("err->", err);
        // console.log("res.body->",res.body);
        expect(res.body.datos.enviado).to.eql(expected);
        done(err);
        });
    });
  });
});
