import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router()
const products = new ProductManager('../productos.json')

router.get('/', async (req,res)=>{
    const limit = Number(req.query.limit)
    const allProduct = await products.getProduct()

    if (limit){
        const productLimit = allProduct.splice(0,limit)
        return res.send({
            status:'ok',
            product: productLimit
        })
    }
    res.send({
        status:'ok',
        products: allProduct
    })
})

router.get('/:pid', async(req,res)=>{
    const id = Number(req.params.pid);
    const byId = await products.getProductById(id)

    res.send({
        status: 'ok',
        productByID: byId
    })
})

router.post('/',async(req,res)=>{
    const product = req.body;
    const add = await products.addProduct(product)
    res.send({
        status: 'ok',
        message: 'Producto agregado',
        post: add,
        productAdd: product
    });
});

router.put('/:pid', async (req,res)=>{
    const id = Number(req.params.pid)
    const product = req.body;
    const update = await products.updateProduct({id,...product})
    res.send({
        status: 'ok',
        message: 'Producto Actualizado',
        updateProduct: update
    });
});

router.delete('/:pid', async(req,res)=>{
    const id = Number(req.params.pid)
    const deleteProduct = await products.deleteProductById(id)

    res.send({
        status: "ok",
        message: `Producto con ID:${id}  eliminado`
    })
})



export default router