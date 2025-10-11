import mongoose, { Document, Schema } from 'mongoose';

interface Iitem extends Document {
    name: string;
    price: string;
    description: string;
    category: string;
}

const itemSchema = new Schema<Iitem>({
    name: { type: String, required: true },
    price: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: false }

},
{ timestamps: true}
);
export const Item = mongoose.model<Iitem>('Item', itemSchema);