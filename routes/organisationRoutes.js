import express from 'express';
import { logOut, login, registerOrg,loadOrg, OrgList,sendOrgmail } from '../controllers/organisationControllers.js';
import { isOrgAuthenticated } from '../middleware/auth.js';

const router=express.Router();

router.post('/register',registerOrg);
router.post('/login',login);
router.get('/logout',logOut);
router.get("/org/details",isOrgAuthenticated,loadOrg)
router.get("/list",OrgList);


router.get("/sendMail",sendOrgmail)
export default router;