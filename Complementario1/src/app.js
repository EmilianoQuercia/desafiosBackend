import  express  from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js";

const app = express();
const PORT = 8080

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views','./src/views');
app.use(express.static('public'))

const server = app.listen(PORT, () => { console.log(`Server listening on ${PORT}`)})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://emilianoquercia:MongoDb1986@cluster0.zfmpslu.mongodb.net/ecommerce?retryWrites=true&w=majority', (err)=>{
    if(err){
        console.log('No se puede conectar a la base de dato ', err.message)
        process.exit();
    }else{
        console.log('Servidor Mongo levantado con exito')
    }
})

app.use('/', productRouter);
app.use('/', cartRouter);