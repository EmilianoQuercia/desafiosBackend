import express  from "express";

const router = express.Router()

router.get('/home', (req,res)=>{
    res.render('home',{})
})

router.get('/realtimeproducts', (req,res)=>{
    res.render('realTimeProducts', {})
})

export default router