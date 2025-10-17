import { register } from "module";
import mongoose, { Document, Schema } from "mongoose";

export interface IRegister extends Document {
  username: string;
  email: string;
  password: string;
}

const registerSchema = new Schema<IRegister>({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Register = mongoose.model<IRegister>("Register", registerSchema);
