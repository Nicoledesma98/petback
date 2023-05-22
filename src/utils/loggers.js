import winston from "winston";

const customLevelOpt = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5,
    },
    colors: {
         debug: "blueBG",
         http: "cyanBG",
         info: "greenBG",
         warning: "yellowBG",
         error: "redBG" ,
         fatal: "blackBG" 
    }    
}
winston.addColors(customLevelOpt.colors)

/// logger para desarrollo
const developLogger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ color: customLevelOpt.colors }), //Color correspondiente segun el tipo de logger   
                winston.format.simple()
            )
        })
    ]
})

// {"level":"info","message":"GET es /loggerTest/ - 18:36:52"}
// {"level":"info","message":"GET es /user/ - 18:37:02"}
///logger para produccion 
const producLogger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: [
        new winston.transports.File({ filename: 'errors.log', level: 'error', format: winston.format.simple()}),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ color: customLevelOpt.colors }), //Color correspondiente segun el tipo de logger   
                winston.format.simple()
            )
        })
    ]
})
export const addLogger = (req, res, next) => {
    req.logger = producLogger
    req.logger.info(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

 function getLogger()  {
    if (process.env.ENVIRONMENT === "production") {
        console.log('estas conectado en production')
        return producLogger
    }
    console.log('estas conectado en desarrollo')
        return developLogger

}
export default getLogger