import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		titulo: 
		{
			type: String,
			required: true,
		},
		descripcion:
		{
			type: String,
			required: true,
		},
		imagen:
		{
			type: String,
			required: true,
		},
		comentarios:
		{
			usuario:
			{
				type: String,
				required: false,
			},
			contenido:
			{
				type: String,
				required: false,
			}
		}
	}
);

export const Post = mongoose.model("Posts", postSchema);
