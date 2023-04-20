import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';


import path from 'path';
import * as url from 'url';
const __dirname=url.fileURLToPath(new URL('.',import.meta.url));
console.log(__dirname);

//database
import connectDB from './database/mongodb.js';
//storage
import connectCloud from './database/cloudinary.js';

//routes
import organisationRoutes from './routes/organisationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import articlesRoutes from './routes/articlesRoutes.js';

dotenv.config({path:'./config/.env'});
const app=express();
app.use(express.json());
app.use(bodyParser.json({extender:true}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());
app.use(morgan('tiny'));


/**
 * Routes or API
 */
app.use('/api/v1/organisations',organisationRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/articles',articlesRoutes)
// app.use('/api/v1/all',allRoutes)
app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./client/build/index.html"));
})



const port=process.env.PORT || 3023;

/**
 * start function to initiate the server
 */
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        console.log('mongoDb connected');
        await connectCloud();
        console.log("cloud connected!")
        await app.listen(port,()=>console.log(`Server is listening to port no. ${port}`));

    }catch(err){
        console.log(err)
    }
}

start();