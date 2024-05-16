import express from 'express'
import listAll from '../controllers/ecoponto/listAll.js';
import getById from '../controllers/ecoponto/getById.js';
import create from '../controllers/ecoponto/create.js';
import update from '../controllers/ecoponto/update.js';
import remove from '../controllers/ecoponto/remove.js';
const router = express.Router();

// Rotas do ecoponto /ecoponto

router.get('/', listAll)

router.get('/:id', getById)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', remove)

export default router