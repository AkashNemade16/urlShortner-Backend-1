import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/urlRoutes.js';
import userRoutes from './routes/authRoutes.js'


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', postRoutes);
app.use('/user', userRoutes);
app.use('/auth', userRoutes);



const Port = process.env.PORT || 5000;
// const {Port} = config;
const CONNECTION_URL = process.env.MONGO_URI;
// if(process.env.NODE_ENV==='production'){
//     app.use(express.static('build'));
//     app.get('*',(req,res)=>{
//         res.sendFile(path.join(__dirname,'build','index.html'));//relative path
//     });
// }

mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true })
    .then(() => app.listen(Port, () => console.log(`Example app listening at ${Port}`)))
    .catch((err) => err.message)

// app.listen(Port,()=>{
//     console.log(`Example app listening at ${Port}`)
// })


