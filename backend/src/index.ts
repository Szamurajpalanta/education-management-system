import "reflect-metadata";
import {createConnection } from "typeorm";
import * as express from "express";
import { getRoutes } from "./routes";
import cors = require("cors");

const students = [
    {
        "id": "KAPA01",
        "name": "Adorján",
        "circle": "üzemmérnök-informatikus"
    },
    {
        "id": "JNT7U9",
        "name": "Kiss Endre Farkas",
        "circle": "programtervező informatikus"
    }
]

createConnection().then(async connection => {

    const app = express();

    app.use(express.json());

    app.use(cors());

    app.use(getRoutes());

    app.get('/test', (req, res) =>{
        res.send(students);
    });

    app.listen(3000, () => {
        console.log('Listening on port 3000 ...');
    });
}).catch(error => console.log(error));