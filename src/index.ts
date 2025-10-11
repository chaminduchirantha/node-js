import express, {Application} from 'express';
import userRoutes from './routes/userRouts';
import mongoose from "mongoose"

const App: Application = express();
App.use(express.json());
App.use('/api/v1/user', userRoutes);

const mongo  =  mongoose.connect('mongodb://localhost:27017/userDB')
.then(() => {
    console.log("Database connected")
}).catch(() => {
    console.log("Database connection error: ");
});

App.listen(5000, () => {
    console.log("Server is running on port 3000");
});