import express from 'express';
import { loadUser, logOut, login, registerUser } from '../controllers/userControllers.js';
import {isUserAuthenticated} from '../middleware/auth.js'

const router=express();

router.post("/register",registerUser);
router.post("/login",login);
router.get("/logout",logOut);
router.get("/details",isUserAuthenticated,loadUser)






export default router