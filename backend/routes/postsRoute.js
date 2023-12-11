import express from "express";
import { Post } from "../models/postModel.js";

const router = express.Router();

// Crear un nuevo posteo
router.post("/", async (request, response) => {
	try {
		if (
			!request.body.titulo ||
			!request.body.descripcion ||
			!request.body.imagen ||
			!request.body.comentarios.usuario ||
			!request.body.comentarios.contenido
		) {
			return response.status(400).send({
				message: "La operación se completó exitosamente!",
			});
		}

		const nuevoPost = {
			titulo: request.body.titulo,
			descripcion: request.body.descripcion,
			imagen: request.body.imagen,
			comentarios: {
				usuario: request.body.comentarios.usuario,
				contenido: request.body.comentarios.contenido
			},
		};

		const post = await Post.create(nuevoPost);

		return response.status(201).send({
			message: "La operación se completó exitosamente!",
			data: post
		})

		// return response.status(201).send(post);

	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Obtener todos los posteos
router.get("/", async (request, response) => {
	try {
		const posts = await Post.find({});
		return response.status(200).json({
			count: posts.lenght,
			data: posts,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Obtener posteo por id
router.get("/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const post = await Post.findById(id);
		return response.status(200).json(post);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Actualizar posteos
router.put("/:id", async (request, response) => {
	try {
		if (
			!request.body.titulo ||
			!request.body.descripcion ||
			!request.body.imagen ||
			!request.body.comentarios.usuario ||
			!request.body.comentarios.contenido
		) {
			return response.status(400).send({
				message: "La operación se completó exitosamente!",
			});
		}

		const { id } = request.params;

		const result = await Post.findByIdAndUpdate(id, request.body);

		if (!result) {
			return response
				.status(404)
				.json({ message: "El posteo no fue encontrado!" });
		}
		return response
			.status(200)
			.json({ message: "La operación se completó exitosamente!" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Route para eliminar un posteo
router.delete("/:id", async (request, response) => {
	try {
		const { id } = request.params;

		const result = await Post.findByIdAndDelete(id);

		if (!result) {
			return response
				.status(404)
				.json({ message: "El posteo no fue encontrado!" });
		}
		return response
			.status(200)
			.json({ message: "La operación se completó exitosamente!" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

export default router;
