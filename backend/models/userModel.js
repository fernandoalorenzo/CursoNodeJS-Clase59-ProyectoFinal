import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
		},
		nombre: {
			type: String,
			required: true,
		},
		apellido: [
			{
				type: String
			},
		],
		rol: {
			type: String,
			default: "user",
			enum: ["user", "admin"],
		}
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("Users", userSchema);
export default User;
