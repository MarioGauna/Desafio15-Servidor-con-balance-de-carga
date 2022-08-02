import {Router} from 'express';
import { fork } from 'child_process';
const router = Router();

router.get('/info', (_req, res) => {
    const processInfo = {
        Argumentos:process.argv,
        Plataforma: process.platform,
        Version: process.version,
        Carpeta_proyecto: process.cwd(),
        Path: process.execPath,
        ProcessID: process.pid,
        Memoria_Reservada: process.memoryUsage.rss()
    };
    
    res.status(200).json(processInfo);
})

const randomGen = fork('./utils/generador.js')

router.get('/api/random', (req, res) => {
    
    const cant = req.query.cant || 50000;
    
    randomGen.on('message', (resultado) => {
        res.status(200).json(resultado);
    })
    randomGen.send(cant);
    
})

export default router;