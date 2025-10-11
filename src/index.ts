import express, {Application} from 'express';
import userRoutes from './routes/userRouts';
import itemRouts from './routes/itemRouts';
import mongoose from "mongoose"

const App: Application = express();
App.use(express.json());
App.use('/api/v1/user', userRoutes);
App.use('/api/v1/item', itemRouts);

const mongo  =  mongoose.connect('mongodb://localhost:27017/userDB')
.then(() => {
    console.log("Database connected")
}).catch(() => {
    console.log("Database connection error: ");
});

App.listen(5000, () => {
    console.log("Server is running on port 5000");
});