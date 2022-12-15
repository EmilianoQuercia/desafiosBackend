// const fs = require('fs');
import fs from 'fs'

 class ProductManager {
    constructor(path){
        this.path = path 
        this.products = []
    }

    fileExists(){
        return fs.existsSync(this.path)
    }

    addProduct(prod){
        return new Promise((resolve,rejects)=>{
            if (this.fileExists()){
                console.log('El archivo Existe')
                fs.readFile(this.path,(error,data)=>{
                    if (error){
                        console.log('No se puede leer el archivo')
                    }
                    this.products = JSON.parse(data)

                    for (const key in prod) {
                        if (prod[key]=== '' || !prod[key]){
                            console.log(`Al Producto ingresado le falto completar un campo: ${key}`);
                            return
                        }   
                    }

                    const cod = this.products.find(p=> p.code === prod.code)
                    if (cod === undefined){
                        this.products.push({id:this.products.length + 1, ...prod} )
                    }else{
                        console.log(`Su Producto ${prod.title}, tiene un codigo que ya existe: ${prod.code}`);
                        return
                    }
                
                    fs.writeFile(this.path,JSON.stringify(this.products),(error)=>{
                        if (error){
                            console.log('Error al escribir el archivo')
                        }
                        resolve()
                    })
                })
            }else{
                fs.writeFile(this.path, JSON.stringify([{id:this.products.length + 1, ...prod}]),(error)=>{
                    if(error){
                        console.log('Error al escribir el archivo')
                    }
                    resolve()
                });
            };

        });
    }

    getProduct(){
        return new Promise((resolve,reject)=>{
            fs.readFile(this.path,'utf-8',(error,data)=>{
                if (error){
                    reject(error)
                }
                this.products = JSON.parse(data)
                resolve(this.products)
            })
        })
    }

    getProductById(id){
        return new Promise((resolve, reject)=>{
            fs.readFile(this.path,'utf-8',(error,data)=>{
                if (error){
                    reject(error)
                }
                this.products = JSON.parse(data)
                const productId = this.products.find(p=> p.id === id)
                if (productId) {
                        resolve(productId)
                    } else {
                        console.log('Product by Id: NOT FOUND');
                    }
            })
        })
    }

    updateProduct({...props}){
        return new Promise((resolve,reject)=>{
            fs.readFile(this.path,"utf-8",(error,data)=>{
                if(error){
                    reject(error)
                }
                this.products = JSON.parse(data)
                const productId = this.products.find(p=> p.id === props.id)
        

                this.products = this.products.map(p =>
                    p.id === props.id ? {...p,...props}:p)
                
                fs.writeFile(this.path, JSON.stringify(this.products),(error)=>{
                    if (error){
                        console.log('Error al escribir el archivo')
                    }
                    resolve({...productId,...props})
                    
                })
    
            
            })
        })
    }

    deleteProductById(id){
        return new Promise ((resolve,reject)=>{
            fs.readFile(this.path, 'utf-8',(error,data)=>{
                if (error){
                    reject(error)
                }
                this.products = JSON.parse(data)
                this.products = this.products.filter(p=> p.id !== id)
                fs.writeFile(this.path, JSON.stringify(this.products),(error)=>{
                    if (error){
                        console.log('Error al escribir el archivo')
                    }
                    resolve()
                })
            })
        })
    }
}

const producto1 = {
    title:"tomate",
    description:"perita",
    price:115,
    thumbnail:"sin imagen",
    code:"to01",
    stock:35
}
const producto2 = {
    title:"cebolla",
    description:"rosada",
    price:115,
    thumbnail:"sin imagen",
    code:"ce01",
    stock:35
}

const product = new ProductManager('../productos.json')

const run = async () =>{
///MUESTRAS LOS PRODUCTOS DE LA BASE DE DATOS
    console.log(await product.getProduct())

///CARGA DOS PRODUCTOS A LA BASE DE DATOS
    // await product.addProduct(producto1)
    // await product.addProduct(producto2)

///BUSCA UN PRODUCTO POR ID Y LO MUESTRA
    const byId = await product.getProductById(3)
    console.log('Product by ID', byId )

///ELIMINA UN PRODUCTO POR ID
    // await product.deleteProductById(7)

///ACTUALIZA UN PRODUCTO POR ID
    const update = await product.updateProduct({id: 6, title:"papa", description:'blanca'})
    console.log('Actualizado',update)
}

// run()

export default ProductManager;