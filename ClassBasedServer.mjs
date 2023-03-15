import express from 'express';
import rateLimit from 'express-rate-limit'
import { PrismaClient } from '@prisma/client'
import logger from './logger.mjs';
import { rateLimitterParams } from './Config/index.mjs';
import studentRoute from './routes/student.route.mjs';
import bookRoute from './routes/book.route.mjs';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(express.static("public"))
const __filename = import.meta.url;
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient()
const limiter = rateLimit(rateLimitterParams)

class Library {
    constructor(app, port, dirname){
        this.app = app;
        this.port = port;
        this.app.use(express.json());
        logger.info('Application started');
    }

    ApplyRateLimiter(){
        this.app.use(limiter);
        logger.info('Rate Limitter Successfully implimented!');
    }

    curdInit(){
        // Base Api 
        this.app.get("/", async(req, res)=> {
            logger.info('Startup Api Call Succesfull!');
            res.send({msg: "Awesome we are Live 😎"});
        })

        this.app.get("/doc", (req, res) => {
            fs.readFile("public/doc.html", "utf-8", (err, data) => {
                if (err) {
                  return res.status(404).send("Failed");
                }
                res.header("Content-Type", "text/html");
                res.send(data+"");
            });
        })

        this.app.use("/student", studentRoute)
        this.app.use("/book", bookRoute)

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Server is Stated! on", this.port);
        })
    }
}

// const fileReader = new FileReader();
// fileReader.read('public/doc.html').then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const library = new Library(app, PORT, __dirname);
library.curdInit();
library.ApplyRateLimiter();
library.listen();