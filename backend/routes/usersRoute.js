import express from "express";
import {
	createUser,
	deleteUser,
	getUserById,
	getUsers,
	updateUser,
} from "../controllers/userController.js";

const usersRouter = express.Router();

// DEFINIMOS LAS RUTAS PARA CRUD DE USUARIOS
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/", createUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
