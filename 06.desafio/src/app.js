import express from 'express';
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from 'mongoose';
import __dirname from './utils.js';
import {engine} from 'express-handlebars';
import {Server} from "socket.io";

import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import sessionsRouter from "./routes/sessions.routes.js"
import chatRouter from './routes/chat.routes.js';
import viewRouter from './routes/views.routes.js';
import messageModel from './dao/models/message.model.js';


const PORT = 8080;
const app = express();
let messages =[];


const MONGO = "mongodb+srv://TomasEze:Okaylol45@database.o3db6qd.mongodb.net/ecommerce"

const conection = mongoose.connect(MONGO)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:"CoderSecret",
    resave:false,
    saveUninitialized:false
}))
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

const io = new Server(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views" , __dirname + "/views")



app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/chat", chatRouter)
app.use('/api/sessions', sessionsRouter);
app.use("/" , viewRouter)


io.on("connection", (socket)=>{

    socket.on("chat-message", async (data)=>{
        messages.push(data);
        io.emit("messages", messages);
        const message =  new messageModel({
            message: data.message,
            user: data.username,
            timestamp: new Date()
        });
        await message.save();
    })
    socket.on("new-user", (username)=>{
        socket.emit("messages", messages);
        socket.broadcast.emit("new-user", username);
    })
})