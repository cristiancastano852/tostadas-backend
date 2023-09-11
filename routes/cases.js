import express from "express";
const casesRoutes = express.Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Cases
 *   description: Operaciones relacionadas con Casos
 */

/**
 * @swagger
 * /cases:
 *   get:
 *     summary: Obtener todos los casos
 *     tags: [Cases]
 *     responses:
 *       200:
 *         description: Casos obtenidos exitosamente
 *         content:
 *           application/json:
 *             example:
 *               cases: [/* lista de casos * /]
 */
//get all cases
casesRoutes.route("/cases").get(async (req, res) => {
  const cases = await prisma.case.findMany();
  res.status(200).json({ cases });
});

/**
 * @swagger
 * /cases/{id}:
 *   get:
 *     summary: Obtener un caso por ID
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del caso a obtener
 *     responses:
 *       200:
 *         description: Caso obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               case_: { /* datos del caso * / }
 *       404:
 *         description: No se encontró el caso con el ID proporcionado
 */
//get a single case by id
casesRoutes.route("/cases/:id").get(async (req, res) => {
  const { id } = req.params;
  const case_ = await prisma.case.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!case_) {
    res
      .status(404)
      .json({ message: "No se encontró el caso con el ID proporcionado" });
  } else {
    res.status(200).json({ case_ });
  }
});

/**
 * @swagger
 * /cases/user/{id}:
 *   get:
 *     summary: Obtener todos los casos de un usuario por ID
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario para el cual se desean obtener los casos
 *     responses:
 *       200:
 *         description: Casos obtenidos exitosamente para el usuario
 *         content:
 *           application/json:
 *             example:
 *               cases: [/* lista de casos * /]
 *       404:
 *         description: No se encontraron casos para el ID de usuario proporcionado
 */
//get all cases by user id
casesRoutes.route("/cases/user/:id").get(async (req, res) => {
  const { id } = req.params;
  const cases = await prisma.case.findMany({
    where: {
      authorId: id,
    },
  });
  if (!cases) {
    res
      .status(404)
      .json({ message: "No se encontraron casos para el ID de usuario" });
  } else {
    res.status(200).json({ cases });
  }
});

/**
 * @swagger
 * /cases/ticket/{ticket}:
 *   get:
 *     summary: Obtener un caso por Número de Ticket
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: ticket
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de ticket del caso a obtener
 *     responses:
 *       200:
 *         description: Caso obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               case_: { /* datos del caso * / }
 *       404:
 *         description: No se encontró el caso con el número de ticket proporcionado
 */
//get case by ticket
casesRoutes.route("/cases/ticket/:ticket").get(async (req, res) => {
  const { ticket } = req.params;
  const case_ = await prisma.case.findUnique({
    where: {
      ticket: ticket,
    },
  });
  if (!case_) {
    res
      .status(404)
      .json({ message: "No se encontró el caso con el número de ticket" });
  } else {
    res.status(200).json({ case_ });
  }
});

/**
 * @swagger
 * /cases:
 *   post:
 *     summary: Crear un nuevo caso
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               autor:
 *                 type: integer
 *             required:
 *               - title
 *               - description
 *               - type
 *               - autor
 *     responses:
 *       200:
 *         description: Caso creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               case_: { /* datos del caso creado * / }
 */
//create a new case
casesRoutes.route("/cases").post(async (req, res) => {
  const { title, description, type, authorId } = req.body;

  const ticket = Math.floor(Math.random() * 1000000).toString();
  const case_ = await prisma.case.create({
    data: {
      title: title,
      description: description,
      type: type,
      ticket: ticket,
      authorId: authorId,
      status: "PENDIENTE",
    },
  });

  const asesor = await prisma.user.findFirst({
    where: {
      role: "ASESOR",
    },
  });

  const assignee = await prisma.assignee.create({
    data: {
      caseId: case_.id,
      userId: asesor.id,
    },
  });

  res.status(200).json({ case_ });
});

export { casesRoutes };
