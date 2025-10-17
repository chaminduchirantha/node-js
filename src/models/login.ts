import mongoose, { Document, Schema } from "mongoose";

export interface Ilogin extends Document {
  email: string;
  password: string;
}

const loginSchema = new Schema<Ilogin>({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Login = mongoose.model<Ilogin>("Login", loginSchema);
