import express from "express";
import { PrismaClient } from "@prisma/client";
const userRoutes = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con Usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Usuarios obtenidos exitosamente
 *         content:
 *           application/json:
 *             example:
 *               users: [/* lista de usuarios * /]
 */

userRoutes.route("/users").get(async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({ users });
});

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Obtener un usuario por dirección de correo electrónico
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Dirección de correo electrónico del usuario a obtener
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               user: { /* datos del usuario * / }
 *       404:
 *         description: No se encontró el usuario con el correo electrónico proporcionado
 */
//get a single user by email
userRoutes.route("/users/:email").get(async (req, res) => {
  const { email } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(404).json({
      message: "Ningun usuario asociado al correo electronico " + email,
    });
  } else {
    return res.status(200).json({ user });
  }
});

//get a single user by id
userRoutes.route("/user/id/:id").get(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return res.status(404).json({
      message: "Ningun usuario asociado al id " + id,
    });
  } else {
    return res.status(200).json({ user });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               user: { /* datos del usuario creado * / }
 */
userRoutes.route("/users").post(async (req, res) => {
  //create a new user
  const { name, email } = req.body;
  let user = null;
  console.log("AAAAAAAAaaaAAAAAAAAAA");
  console.log(req.body);
  //verificamos si el usuario ya existe
  user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  //SI EXISTE RETORNA  EL USUARIO
  if (user) {
    return res.status(200).json({ user });
  } else {
    user = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
  }
  res.status(200).json({ user });
});

export { userRoutes };
