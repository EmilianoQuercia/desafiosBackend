import express from 'express';
import ProductManager from './productManager.js';


const app = express();
const PORT = 8080

app.use(express.urlencoded({extended:true}))


const products = new ProductManager('../productos.json')


app.get('/products',async (req,res)=>{

    const limit = req.query.limit
    const allProduct = await products.getProduct()

    if (limit){
        const productLimit = allProduct.splice(0,Number(limit))
        res.send(productLimit)
        return
    }
    res.send(allProduct)

})

app.get('/products/:pid',async (req,res)=>{
    const id = req.params.pid
    const byId = await products.getProductById(Number(id))  
    res.send(byId)

})


app.listen(PORT,()=>console.log(`Servidor arriba en el puerto ${PORT}`))