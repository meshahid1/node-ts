import express from "express";
import config from "config";
import log from "./logger";
import routes from "./routes";
import connect from "./db/connect";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.listen(port, ()=> {
    log.info(`Server running on http://${host}:${port}`);
    connect()
    routes(app)
})
