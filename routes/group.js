import express from 'express'; 
import { createGroup, joinGroup } from '../controllers/group.js'; 
const router = express.Router();   

router.post('/createGroup', createGroup); 
router.put('/joinGroup', joinGroup);

export default router;