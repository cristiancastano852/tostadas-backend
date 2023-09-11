import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import { PrismaClient } from "@prisma/client";
const expect = chai.expect;
const prisma = new PrismaClient();
chai.use(chaiHttp);

describe("User Routes", () => {
  // Datos de usuario de prueba
  const testUser = {
    name: "UsuarioPrueba",
    email: "usuarioprueba@example.com",
  };

  before(async () => {
    await prisma.user.create({
      data: testUser,
    });
  });

  after(async () => {
    await prisma.user.delete({
      where: {
        email: testUser.email,
      },
    });
  });

  describe("GET /users", () => {
    it("debe devolver todos los usuarios", (done) => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.be.an("array");
          done();
        });
    });

    it("debe devolver un usuario por su dirección de correo electrónico", (done) => {
      chai
        .request(app)
        .get(`/users/${testUser.email}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.user).to.be.an("object");
          expect(res.body.user.email).to.equal(testUser.email);
          done();
        });
    });

    it("debe devolver un error 404 si no se encuentra un usuario por su dirección de correo electrónico", (done) => {
      const email = "correo_invalido@example.com";
      chai
        .request(app)
        .get(`/users/${email}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal(
            "Ningun usuario asociado al correo electronico " + email
          );
          done();
        });
    });
  });

  describe("POST /users", () => {
    it("debe crear un nuevo usuario", (done) => {
      chai
        .request(app)
        .post("/users")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.user).to.be.an("object");
          expect(res.body.user.email).to.equal(testUser.email);
          done();
        });
    });

    it("debe devolver el usuario existente si el correo electrónico ya está registrado", (done) => {
      chai
        .request(app)
        .post("/users")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.user).to.be.an("object");
          expect(res.body.user.email).to.equal(testUser.email);
          done();
        });
    });
  });
});
