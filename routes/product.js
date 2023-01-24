import express from 'express';
const router = express.Router();
import controller from '../controllers/productcontrollers.js';
import { deleteOne } from '../controllers/productcontrollers.js';

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', deleteOne);



export default router;
