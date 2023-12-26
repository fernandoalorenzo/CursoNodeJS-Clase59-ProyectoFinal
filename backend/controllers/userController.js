import User from "../models/userModel.js";

// Crear un nuevo usuario
const createUser = async (request, response) => {
	try {
		const user = await User.create(request.body);

		return response.status(201).send({
			message: "El usuario fue creado exitosamente!",
			data: user,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Obtener todos los usuarios
const getUsers = async (request, response) => {
	try {
		const users = await User.find({});
		return response.status(200).json({
			count: users.lenght,
			data: users,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
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

// Login de usuario
const loginUser = async (request, response) => {
	try {
		const { email, password } = request.body;

		// Buscar al usuario por el correo registrado
		const user = await User.findOne({ email });

		// Si el usuario no existe
		if (!user) {
			return response
				.status(404)
				.json({ message: "Usuario no encontrado" });
		}

		// Verificar la contraseña
		if (user.password !== password) {
			return response
				.status(401)
				.json({ message: "Contraseña incorrecta" });
		}

		// Aquí puedes agregar la lógica para almacenar información en localStorage si lo deseas
		// Por ejemplo, response.cookie('token', 'token_value', { httpOnly: true });

		return response
			.status(200)
			.json({ message: "Inicio de sesión exitoso", user });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Exportamos todas las rutas
export { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser };
