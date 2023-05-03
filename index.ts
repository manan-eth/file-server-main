import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

import { PORT } from './config';

import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'
import fileRoutes from './routes/fileRoutes'

const app = express();

/* Middleware to parse the body from requests*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(cookieParser())

app.use('/auth',authRoutes);

app.use('/user',userRoutes);

app.use('/admin',adminRoutes);

app.use('/api/files',fileRoutes)

app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`)
})