import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		titulo: {
			type: String,
			required: true,
		},
		descripcion: {
			type: String,
			required: true,
		},
		imagen: {
			type: String,
			required: true,
		},
		comentarios: [
			{
				usuario: {
					type: String,
					required: true,
				}, 
				contenido: {
					type: String,
					required: true,
				},
			}
		],
	},
	{
		timestamps: true,
	}
);

export const Post = mongoose.model("Posts", postSchema);
