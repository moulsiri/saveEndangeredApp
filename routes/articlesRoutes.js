import express from 'express';
import { isOrgAuthenticated, isUserAuthenticated } from '../middleware/auth.js';
import { articleList, createArticle } from '../controllers/articlesControllers.js';

const router=express();


router.post('/create',isUserAuthenticated,createArticle);
router.get('/list',articleList);



export default router;