import logger from "pino"
import expressPino from "express-pino-logger"
import dayjs from "dayjs"

const log = logger({
    // prettyPrint: true,
    base: {
        pid: false
    },
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    timestamp: () => `,"time": "${dayjs().format()}"`
})
const expressLogger = expressPino({ logger: log });

export default expressLogger.logger
