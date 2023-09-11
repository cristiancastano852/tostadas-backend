import express from "express";
import { PrismaClient } from "@prisma/client";
const assigneeRoutes = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Assignee
 *   description: Operaciones relacionadas con Assignees
 */

/**
 * @swagger
 * /assignee/{id}:
 *   get:
 *     summary: Obtener un Assignee por ID
 *     tags: [Assignee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Assignee a obtener
 *     responses:
 *       200:
 *         description: Asignee obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               assignee: { /* datos del assignee * / }
 *       404:
 *         description: No se encontró el Assignee con el ID proporcionado
 */

/**
 * @swagger
 * /assignee/user/{id}:
 *   get:
 *     summary: Obtener un Assignee por ID de Usuario
 *     tags: [Assignee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario para el cual se desea obtener el Assignee
 *     responses:
 *       200:
 *         description: Asignee obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               assignee: { /* datos del assignee * / }
 *       404:
 *         description: No se encontró un Assignee para el ID de usuario proporcionado
 */

//get assignee by id
assigneeRoutes.route("/assignee/:id").get(async (req, res) => {
  const { id } = req.params;
  const assignee = await prisma.assignee.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json({ assignee });
});

/**
 * @swagger
 * /assignee/user/{id}:
 *   get:
 *     summary: Obtener un Assignee por ID de Usuario
 *     tags: [Assignee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario para el cual se desea obtener el Assignee
 *     responses:
 *       200:
 *         description: Asignee obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               assignee: { /* datos del assignee * / }
 *       404:
 *         description: No se encontró un Assignee para el ID de usuario proporcionado
 */
//get assignee by user id
assigneeRoutes.route("/assignee/user/:id").get(async (req, res) => {
  const { id } = req.params;
  const assignee = await prisma.assignee.findFirst({
    where: {
      userId: parseInt(id),
    },
  });
  res.status(200).json({ assignee });
});

/**
 * @swagger
 * /assignee/case/{id}:
 *   get:
 *     summary: Obtener un Assignee por ID de Caso
 *     tags: [Assignee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del caso para el cual se desea obtener el Assignee
 *     responses:
 *       200:
 *         description: Asignee obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               assignee: { /* datos del assignee * / }
 *       404:
 *         description: No se encontró un Assignee para el ID de caso proporcionado
 */
//get assignee by case id
assigneeRoutes.route("/assignee/case/:id").get(async (req, res) => {
  const { id } = req.params;
  const assignee = await prisma.assignee.findFirst({
    where: {
      caseId: parseInt(id),
    },
  });
  res.status(200).json({ assignee });
});

/**
 * @swagger
 * /assignee/case/ticket/{ticket}:
 *   get:
 *     summary: Obtener un Assignee por Número de Ticket de Caso
 *     tags: [Assignee]
 *     parameters:
 *       - in: path
 *         name: ticket
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de ticket del caso para el cual se desea obtener el Assignee
 *     responses:
 *       200:
 *         description: Asignee obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               assignee: { /* datos del assignee * / }
 *       404:
 *         description: No se encontró un Assignee para el número de ticket de caso proporcionado
 */
//get assigne by case ticket
assigneeRoutes.route("/assignee/case/ticket/:ticket").get(async (req, res) => {
  const { ticket } = req.params;
  const assignee = await prisma.assignee.findFirst({
    where: {
      case: {
        ticket: ticket,
      },
    },
  });
  res.status(200).json({ assignee });
});

/**
 * @swagger
 * /assignee/user/{userId}/case/{caseId}:
 *   get:
 *     summary: Obtener un Assignee por ID de Usuario y ID de Caso
 *     tags: [Assignee]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario para el cual se desea obtener el Assignee
 *       - in: path
 *         name: caseId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del caso para el cual se desea obtener el Assignee
 *     responses:
 *       200:
 *         description: Asignee obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               assignee: { /* datos del assignee * / }
 *       404:
 *         description: No se encontró un Assignee para los IDs de usuario y caso proporcionados
 */

//get assignee by user id and case id
assigneeRoutes
  .route("/assignee/user/:userId/case/:caseId")
  .get(async (req, res) => {
    const { userId, caseId } = req.params;
    const assignee = await prisma.assignee.findFirst({
      where: {
        userId: parseInt(userId),
        caseId: parseInt(caseId),
      },
    });
    res.status(200).json({ assignee });
  });

export { assigneeRoutes };
