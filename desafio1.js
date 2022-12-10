class ProductManager {
    constructor(){
        this.product = []
    }

    addProduct(
        title, 
        description, 
        price, 
        thumbnail,
        code, 
        stock    
        ){
        const newProduct = {
            id: this.product.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        for (const key in newProduct) {
            if (newProduct[key]=== '' || !newProduct[key]){
                console.log(`Producto id:${newProduct.id} Te falto completar un campo ${key}`);
                return
            }   
        }

        const cod = this.product.find(p=> p.code === newProduct.code)
        if (cod === undefined){
            this.product.push(newProduct)
        }else{
            console.log(`Su Producto ${newProduct.title}, tiene un codigo que ya existe ${newProduct.code}`);
            return
        }
    }

    getProduct(){
        return this.product
    }

    getProductById(id){
        const productId = this.product.find(p=> p.id === id)

        if (productId){
            console.log(productId);
        }else{
            console.log('NOT FOUND');
        }
    }
}

const Producto = new ProductManager()
Producto.addProduct('arroz','largo fino', 80,'sin imagen', 'ar01',25)
Producto.addProduct('tomate','perita', 110,'sin imagen', 'to01',10)
Producto.addProduct('fideo','tallarines', 75,'sin imagen', 'fi01',15)

console.log(Producto.getProduct());

console.log('************** PRODUCTO CON CODIGO REPETIDO **************************************');

Producto.addProduct('yerba','suave', 250,'sin imagen', 'fi01',30)

console.log('************** PRODUCTO POR ID **************************************');

Producto.getProductById(3)

console.log('************** PRODUCTO CON ID QUE NO EXISTE **************************************');

Producto.getProductById(5)


console.log('************** PRODUCTO QUE LE FALTA COMPLETAR ALGUN CAMPO **************************************');

Producto.addProduct('Galletitas','', 150,'sin imagen', 'fi01',30)
Producto.addProduct('Galletitas',150,'sin imagen', 'fi01',30)



