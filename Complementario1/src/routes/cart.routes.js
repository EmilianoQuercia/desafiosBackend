import { Router } from "express";
import ManagerMongoDb from "../dao/ManagerMongoDb.js";


const router = Router();
const cartManager = new ManagerMongoDb.CartManager();

router.get('/cart', async (req, res) => {
    try{
        const cart = await cartManager.getCart()
        res.send(cart)
    }
    catch (err){
        res.status(500).send(err.message)
    }
})

router.post('/cart', async (req, res) => {
    try{
        const response = await cartManager.createCart([])
        res.send(response)
    }
    catch (err){
        res.status(500).send(err.message)
    }
})

router.put('/cart/:id', async (req, res) => {
    const {id} = req.params;
    const newProduct = req.body

    try {
        const response = await cartManager.addProductToCart(id, newProduct);
        res.send(response);
      } catch (err) {
        res.status(500).send(err.message);
      }
})
router.delete('/cart/product/:id', async (req, res) => {
    const {id} = req.params;
    const newProduct = req.body

    try {
        const response = await cartManager.removeProductFromCart(id, newProduct);
        res.send(response);
      } catch (err) {
        res.status(500).send(err.message);
      }
})

router.delete('/cart/:cid' , async (req,res)=>{
    const {cid} = req.params;
    try {
        const response = await cartManager.deleteCart(cid);
        res.send({
            message: 'Cart deleted successfully',
            id: cid
        })
    }
    catch (err) {
        req.status(500).send(err.message)
    }
})

export default router