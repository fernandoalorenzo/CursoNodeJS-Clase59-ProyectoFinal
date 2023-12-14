import express from "express";
import cors from "cors";
import postsRoute from "./routes/postsRoute.js";
import connect from "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/posts", postsRoute);

// CONEXION A LA BASE DE DATOS
connect();

// SERVIDOR
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}!`)
});
