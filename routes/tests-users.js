// Importa las bibliotecas necesarias
import chai from "chai";
import chaiHttp from "chai-http";
import { PrismaClient } from "@prisma/client";
import app from "../index.js"; // Reemplaza "tu_app" con la ubicación de tu archivo de aplicación
// Configura chai y chai-http
chai.use(chaiHttp);
const expect = chai.expect;

// Inicializa una instancia de PrismaClient para las pruebas
const prisma = new PrismaClient();

// Pruebas unitarias para las rutas GET
describe("GET /users", () => {
  before(async () => {
    // Crea algunos usuarios de prueba en la base de datos de prueba
    await prisma.user.createMany({
      data: [
        {
          name: "Usuario1",
          email: "usuario1@example.com",
          password: "password1",
        },
        {
          name: "Usuario2",
          email: "usuario2@example.com",
          password: "password2",
        },
      ],
    });
  });

  after(async () => {
    // Limpia la base de datos después de las pruebas
    await prisma.user.deleteMany();
  });

  it("debe devolver todos los usuarios", async () => {
    const res = await chai.request(app).get("/users");
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("users").to.be.an("array");
    expect(res.body.users).to.have.lengthOf.at.least(2); // Asegúrate de que haya al menos 2 usuarios
  });

  it("debe devolver un usuario por su dirección de correo electrónico", async () => {
    const email = "usuario1@example.com";
    const res = await chai.request(app).get(`/users/${email}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("user").to.be.an("object");
    expect(res.body.user.email).to.equal(email);
  });

  it("debe devolver un error 404 si no se encuentra un usuario por su dirección de correo electrónico", async () => {
    const email = "usuario_inexistente@example.com";
    const res = await chai.request(app).get(`/users/${email}`);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property("message");
  });
});

// Pruebas unitarias para la ruta POST
describe("POST /users", () => {
  after(async () => {
    // Limpia la base de datos después de las pruebas
    await prisma.user.deleteMany();
  });

  it("debe crear un nuevo usuario", async () => {
    const newUser = {
      name: "NuevoUsuario",
      email: "nuevo_usuario@example.com",
      password: "nuevo_password",
    };
    const res = await chai.request(app).post("/users").send(newUser);
    console.log(newUser);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("user").to.be.an("object");
    expect(res.body.user.email).to.equal(newUser.email);
  });
});
