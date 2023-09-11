import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js"; // Asegúrate de reemplazar con la ubicación correcta de tu archivo index.js
const expect = chai.expect;

chai.use(chaiHttp);

describe("Cases Routes", () => {
  // Datos de prueba para un usuario
  const testUser = {
    name: "UsuarioPrueba",
    email: "usuariotest@example.com",
    authorId: "4722caf7-c73c-4a44-a87e-5012f7f59f7c",
  };

  // Datos de prueba para un caso
  const testCase = {
    title: "Caso de Prueba",
    description: "Descripción del caso de prueba",
    type: "Tipo de Prueba",
    authorId: "4722caf7-c73c-4a44-a87e-5012f7f59f7c",
    id: "8f83e61e-5fed-411a-af7e-719c9677130c",
  };

  describe("GET /cases", () => {
    it("debe devolver todos los casos", (done) => {
      chai
        .request(app)
        .get("/cases")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.cases).to.be.an("array");
          done();
        });
    });

    it("debe devolver un caso por ID", (done) => {
      chai
        .request(app)
        .get(`/cases/${testCase.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.case_).to.be.an("object");
          done();
        });
    });

    it("debe devolver un error 404 si no se encuentra un caso por ID", (done) => {
      const invalidId = 999999;
      chai
        .request(app)
        .get(`/cases/${invalidId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal(
            "No se encontró el caso con el ID proporcionado"
          );
          done();
        });
    });
  });

  describe("GET /cases/user/:id", () => {
    it("debe devolver todos los casos de un usuario por ID", (done) => {
      chai
        .request(app)
        .get(`/cases/user/${testUser.authorId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.cases).to.be.an("array");
          done();
        });
    });

    it("debe devolver un error 404 si no se encuentran casos para el ID de usuario", (done) => {
      const invalidUserId = 999999;
      chai
        .request(app)
        .get(`/cases/user/${invalidUserId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal(
            "No se encontraron casos para el ID de usuario"
          );
          done();
        });
    });
  });

  describe("GET /cases/user/email/:email", () => {
    it("debe devolver un error 404 si no se encuentra el usuario por correo electrónico", (done) => {
      const invalidEmail = "correo_invalido@example.com";
      chai
        .request(app)
        .get(`/cases/user/email/${invalidEmail}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("No se encontró el usuario");
          done();
        });
    });

    it("debe devolver un error 404 si no se encuentran casos para el ID de usuario", (done) => {
      const nonExistentUserEmail = "usuario_no_existente@example.com";
      chai
        .request(app)
        .get(`/cases/user/email/${nonExistentUserEmail}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("No se encontró el usuario");
          done();
        });
    });
  });
});
