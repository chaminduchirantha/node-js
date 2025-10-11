import mongoose, { Document, Schema } from 'mongoose';

interface Iuser extends Document {
    name: string;
    email: string;
    age?: number;
}

const userSchema = new Schema<Iuser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: false }

},
{ timestamps: true}
);
export const User = mongoose.model<Iuser>('User', userSchema);