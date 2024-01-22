import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Crear un nuevo usuario
const createUser = async (request, response) => {
	try {
		// verifica si el correo que intenta registrar existe
		const existUser = await User.findOne({ email: request.body.email });
		if (existUser) {
			return response
				.status(400)
				.json({ message: "El correo ya está registrado." });
		}

		const user = await User.create(request.body);

		return response.status(201).send({
			message: "El usuario fue creado exitosamente!",
			data: user,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: "Error interno del servidor" });
	}
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Obtener un usuario por Id
const getUserById = async (request, response) => {
	try {
		const { id } = request.params;
		const user = await User.findById(id);
		return response.status(200).json(user);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Actualizar usuarios
const updateUser = async (request, response) => {
	try {
		const { id } = request.params;
		const result = await User.findByIdAndUpdate(id, request.body);

		if (!result) {
			return response
				.status(404)
				.json({ message: "El usuario no fue encontrado!" });
		}
		return response
			.status(200)
			.json({ message: "El usuario fue actualizado exitosamente!" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Eliminar un usuario
const deleteUser = async (request, response) => {
	try {
		const { id } = request.params;
		const result = await User.findByIdAndDelete(id);
		if (!result) {
			return response
				.status(404)
				.json({ message: "El usuario no fue encontrado!" });
		}
		return response
			.status(200)
			.json({ message: "El usuario fue eliminado exitosamente!" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Login
const loginUser = async (req, res) => {
	try {
		const { email, password, id, nombre, rol } = req.body;

		// Verificar si el usuario existe en la base de datos
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "El email no está registrado" });
		}

		// Verificar que la contraseña coincida
		const passwordOk = await bcrypt.compare(password, user.password);
		if (!passwordOk) {
			return res.status(401).json({ message: "La contraseña es incorrecta" });
		}

		// Generar el token JWT
		const token = jwt.sign({ id: user._id, nombre: nombre, email: email, rol: rol }, "process.env.SECRET", {
			expiresIn: "1h",
		});

		// Devolver el token y la info del usuario logueado
		res.status(200).json({ token, user: { nombre: user.nombre, email: user.email, id: user._id } });

		// console.log("Usuario: ", user)
		// console.log("Token: ", token)
	} catch (error) {
		console.error("Error en el inicio de sesión:", error);
		res.status(500).json({ message: "Error interno del servidor" });
	}
};

// Exportamos todas las rutas
export { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser };
