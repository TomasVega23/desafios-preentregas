import express from 'express';
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

import { cartRouter } from "./routes/cart.routes.js";
import { productRouter } from "./routes/products.routes.js";
import  viewsRoute  from "./routes/views.routes.js";
import  socketProducts  from "./socket/socketProducts.js";


const PORT = 8080;

const app = express();

const httpServer = app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views");

//Rutas
app.use("/", viewsRoute);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);



socketProducts(socketServer)

