import { Router } from "express";
import CartManager from "../cartManager.js";

const router = Router();

const carts = new CartManager('../carrito.json')


router.post('/', async (req,res)=>{
    const add = await carts.createCart()
    res.send({
        status: 'ok',
        message: 'Carrito creado con exito'
    })
    
})

router.post('/:cid/products/:pid',async(req,res)=>{
    const cartId = Number(req.params.cid)
    const productId = Number(req.params.pid)
    const addProduct = await carts.addProductToCart(cartId,productId)
    res.send({
        status: 'ok',
        message: addProduct
    })
})

router.get('/:cid', async (req,res)=>{
    const cid = Number(req.params.cid)
    const cartById = await carts.getProductsCart(cid)
    res.send({
        status: 'ok',
        Cart: cartById
    })
})



export default router