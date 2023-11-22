
//AQUI IRAN LAS RUTAS
import cors from 'cors';
import express from 'express';
import PostRouter from './routes/post.js';


const app = express();
app.use(express.json()); //toma solicitudes entrantes como objeto json

//HACER PETICIONES DESDE FRONTENT AL SERVIDOR BACKEND

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));


//rutas

app.use(PostRouter)






export default app;