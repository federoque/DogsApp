const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

let dogsRouter = require('./Dogs')
let {temperamentsRouter} = require('./Temperaments')
let createDogRouter = require('./CreateDog')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/dogs', dogsRouter);
router.use('/temperament', temperamentsRouter);
router.use('/dog', createDogRouter);

module.exports = router;
