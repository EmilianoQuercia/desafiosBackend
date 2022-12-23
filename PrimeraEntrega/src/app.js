import express from 'express'
import products from './routes/product.router.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products',products)




app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en https://localhost:${PORT}`)
})