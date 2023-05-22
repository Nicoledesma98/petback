import { Router } from "express";
import getLogger from "../utils/loggers.js"

const logger = getLogger()
const routerLogg = Router()

routerLogg.get('/', (req, res) => {
    req.logger.warning('Alerta!');
    res.send('Logs generados');
  });


export default routerLogg