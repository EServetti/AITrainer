import express from "express"
import dotenv from "dotenv"
import indexRouter from "./router/index_router"
import errorHandler from "./middlewares/errorHandler"
import cors from "cors"
import pathHandler from "./middlewares/pathHandler"
import cluster from "cluster"
import cookieParser from "cookie-parser"
dotenv.config()

const port = process.env.PORT || 3000
const server = express()
const startCb = () => {
    console.log(`Server running on port ${port}`);
}

if(cluster.isPrimary) {
for (let i=1; i<=2; i++) {
const worker = cluster.fork()
worker.on('error', (err) => {
  console.error(`Worker ${worker.process.pid} encountered an error: ${err.message}`);
});
}
console.log("proceso primario");
} else {
console.log("proceso worker "+process.pid);
server.listen(port, startCb)
}




//Middlewares

const corsOptions = {
    origin: 'https://ai-trainer-app.vercel.app',
    credentials: true
  };

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true
// };

server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(cors(corsOptions))
server.use(express.json())
server.use(express.urlencoded({extended: true}))






//Routers
server.use(indexRouter)
server.use(errorHandler)
server.use(pathHandler)