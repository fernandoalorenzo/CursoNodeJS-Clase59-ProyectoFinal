import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config/db.js";
import mongoose from "mongoose";
import { Post } from "./models/postModel.js";
import postsRoute from "./routes/postsRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

// app.get("/", (request, response) => {
//   console.log(request);
//   return response.status(234).send("CRUD de Posts");
// });

app.use("/posts", postsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Aplicación conectada a la Base de Datos");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
