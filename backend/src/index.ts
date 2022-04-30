import "reflect-metadata";
import {createConnection } from "typeorm";
import * as express from "express";
import { getRoutes } from "./routes";
import cors = require("cors");

createConnection().then(async connection => {

    const app = express();

    app.use(express.json());

    app.use(cors());

    app.use(getRoutes());

    app.listen(3000, () => {
        console.log('Listening on port 3000 ...');
    });
}).catch(error => console.log(error));