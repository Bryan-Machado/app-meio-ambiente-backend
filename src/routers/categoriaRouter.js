import express from 'express'
import listAll from '../controllers/categoria/listAll.js';
import getById from '../controllers/categoria/getById.js';
import create from '../controllers/categoria/create.js';
import update from '../controllers/categoria/update.js';
import remove from '../controllers/categoria/remove.js';
const router = express.Router();

// Rotas da categoria /categoria

router.get('/', listAll)

router.get('/:id', getById)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', remove)

export default router