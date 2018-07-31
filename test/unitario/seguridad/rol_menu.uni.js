console.log("ejecucion test rol_menu")
describe("Ruta: ejemplo de consumo rol_menus normal", () => {
  describe("GET /", () => {
    it("Test de operacion GET Rol_menu", done => {
      request.get("/api/v1/seguridad/rol/1/menu")
      .expect(200)
      .end((err, res) => {
        done(err);
        });
    });
  });




});
