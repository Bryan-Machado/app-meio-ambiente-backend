import express from 'express'
import listAll from '../controllers/marker/listAll.js';
import getById from '../controllers/marker/getById.js';
import create from '../controllers/marker/create.js';
import update from '../controllers/marker/update.js';
import remove from '../controllers/marker/remove.js';
const router = express.Router();

// Rotas do marker /marker

router.get('/', listAll)

router.get('/:id', getById)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', remove)

export default router