import express from "express";
import cors from "cors";
import postsRouter from "./routes/postsRoute.js";
import commentsRouter from "./routes/commentsRoute.js";
import usersRouter from "./routes/usersRoute.js";
import connect from "./config/db.js";
import User from "./models/userModel.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/users", usersRouter);

// CONEXION A LA BASE DE DATOS
connect();

app.post('users/login', async (req, res) => {
  // const { email, password } = req.body;
  const user = await User.findOne({
    id: req.body._id,
    email: req.body.email,
    nombre: req.nombre,
    password: req.body.password
  });
  if (user) 
  {
    const token = jwt.sign({
      id: user._id,
      email: user.email,
      nombre: user.name,
      poassword: user.password
    },
      'clavesecreta.1234', {
        expiresIn: '1h'
    });

    return res.status(200).send('El usuario existe');
    console.log(email, password);
  } else {
    return res.status(400).send('El usuario no existe');
  }
});

// SERVIDOR
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}!`)
});
