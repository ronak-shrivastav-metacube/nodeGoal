import express from 'express';
import connectDB from './db/connection';
import {join} from 'path';
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017"

const app = express();
connectDB(DATABASE_URL);

import webRoutes from './routes/web';

app.use(express.static(join(process.cwd(),"public")));
app.set('view engine',"ejs");
app.use(webRoutes);
app.listen(PORT,()=>console.log(`Server listen on port : ${PORT}`))