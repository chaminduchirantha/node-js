import express, {Application} from 'express';
import userRoutes from './routes/userRouts';
import itemRouts from './routes/itemRouts';
import authRouts from './routes/authRouts';
import mongoose from "mongoose"
import path from 'path';
import dotenv from "dotenv";


// load .env located in src/ (if you keep .env in src)
dotenv.config({ path: path.join(__dirname, '.env') });


const App: Application = express();
App.use(express.json());
App.use('/api/v1/user', userRoutes);
App.use('/api/v1/item', itemRouts);
App.use('/api/v1/auth', authRouts);

const mongo  =  mongoose.connect('mongodb://localhost:27017/userDB')
.then(() => {
    console.log("Database connected")
}).catch(() => {
    console.log("Database connection error: ");
});

App.listen(5000, () => {
    console.log("Server is running on port 5000");
});