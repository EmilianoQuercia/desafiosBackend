import fs from 'fs';


class CartManager{
    constructor(path){
        this.path = path
        this.carts = []
    }

    fileExists(){
        return  fs.existsSync(this.path)
    }

    createCart(){
        return new Promise((resolve, reject)=>{
            if(this.fileExists()){
                console.log('El archivo existe')
                fs.readFile(this.path, (err,data)=>{
                    if(err){
                        console.log('No se pudo leer el archivo')
                    }
                    this.carts = JSON.parse(data)
                    const cart = {
                        products: []
                    }
                    const lastID = this.carts.reduce((max,prod)=>(prod.id>max?prod.id:max),0)
                    this.carts.push({id: lastID + 1,...cart})
                    
                    fs.writeFile(this.path, JSON.stringify(this.carts),(err)=>{
                        if(err){
                            console.log('Error al escribir el archivo')
                        }
                        resolve()
                    })
                });
               
            }else{
                console.log('Archivo Creado')
                fs.writeFile(this.path, JSON.stringify([{id: this.carts.length + 1, products: []}]),(err)=>{
                    if(err){
                        console.log('Error al escribir el archivo')
                    }
                    resolve()
                })
            }
        })  
    }

    addProductToCart(cid,pid){
        return new Promise((resolve, reject)=>{
            fs.readFile(this.path,(err,data)=>{
                if (err){
                    reject(err)
                }
                if (pid < 0){
                    return resolve({error:'no hay ID con numeros negativos'})
                }
                this.carts = JSON.parse(data)
                const cartId = this.carts.find(c=> c.id === cid)
                if (cartId){
                    console.log(cartId)
                    const productId = cartId.products.find(p=>p.id === pid)
                    if (productId){
                        productId.quantity += 1
                        fs.writeFile(this.path, JSON.stringify(this.carts),(err)=>{
                            if(err){
                                console.log('Error al escribir el archivo')
                            } 
                        })
                        resolve('Se agrego un producto ya existente') 
                    }else{
                        cartId.products.push({id: pid, quantity: 1})
                        fs.writeFile(this.path, JSON.stringify(this.carts),(err)=>{
                            if(err){
                                console.log('Error al escribir el archivo')
                            } 
                        })
                        resolve('Productos agregados al carrito') 
                    }
                   
                }else{
                    console.log('el carrito al que intenta agregar productos no existe')
                    resolve({warning: 'el carrito al que intenta agregar productos no existe'})
                }
            })
        })
    }

    getProductsCart(id){
        return new Promise((resolve,reject)=>{
            fs.readFile(this.path,'utf-8',(err,data)=>{
                if (err){
                    reject(err)
                }
                this.carts = JSON.parse(data)
                const cartId = this.carts.find(c=> c.id === id)
                if (cartId){
                    resolve(cartId)
                }else{
                    resolve({warning: 'Cart by ID: NOT FOUND'})
                }
            })
        })
    }
}

// const cart = new CartManager('../../carrito.json')
// // cart.createCart()
// cart.addProductToCart(4,4)

export default CartManager

