import express from 'express'; 
import { createGroup, joinGroup } from '../controllers/group.js'; 
const router = express.Router();   

router.post('/groups', createGroup); 
//router.get('/groups/:inviteLink', joinGroup);   //qua c'è un errore

export default router;