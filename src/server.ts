import express from "express"
import dotenv from "dotenv"
import indexRouter from "./router/index_router"
import errorHandler from "./middlewares/errorHandler"

dotenv.config()

const port = process.env.PORT || 3000
const server = express()
const startCb = () => {
    console.log(`Server running on port ${port}`);
}

server.listen(port, startCb)


//Middlewares
server.use(express.json())
server.use(express.urlencoded({extended: true}))

//Routers
server.use(indexRouter)
server.use(errorHandler)