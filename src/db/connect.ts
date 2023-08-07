import mongoose, { ConnectOptions } from "mongoose";
import config from "config";
import log from "../logger"

const connect = () => {
    const dbUrl = config.get("dbUrl") as string;

    return mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => log.info('mongodb connected'))
    .catch((err) => log.error(err))
}

export default connect