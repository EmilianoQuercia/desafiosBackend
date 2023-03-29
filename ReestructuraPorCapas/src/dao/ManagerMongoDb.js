import { productModel } from "../models/product.model.js";
import { cartModel } from "../models/cart.model.js";
import ticketModel from "../models/ticket.model.js";
import { generarId } from "../utils/utils.js";
import registroModel from "../models/registro.model.js";



class ProductManger {

    async getAllProducts() {
        try {
            const products = await productModel.find();
            return products;
        }
        catch (err) {
            throw err;
        }
    }


    async getProduct(queryList) {
        const { query, sort } = queryList

        try {
            if (queryList) {
                const productsParams = await productModel.paginate(query ? { category: query } : {}, { limit: queryList.limit || 10, page: queryList.page || 1 });
                if (sort === 'asc') {
                    const productsParamas = await productModel.aggregate([
                        {
                            $sort: { price: 1 }
                        }
                    ])
                    return productsParamas
                }
                if (sort === 'desc') {
                    const productsParamas = await productModel.aggregate([
                        {
                            $sort: { price: -1 }
                        }
                    ])
                    return productsParamas
                }
                return productsParams;
            }
        }
        catch (err) {
            throw err;
        }
    }

    async createProduct(product) {
        try {
            const newProduct = new productModel(product);
            await newProduct.save();
            return product;
        } catch (err) {
            throw err;
        }
    }

    async updateProduct(id, product) {
        try {
            const update = await productModel.findByIdAndUpdate(id, product);
            return update;
        }
        catch (err) {
            throw err;
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProd = await productModel.findByIdAndDelete(id);
            return deleteProd;
        }
        catch (err) {
            throw err;
        }
    }
}

class CartManager {

    async getCart() {
        try {
            const cart = await cartModel.find();
            return JSON.stringify(cart, null, '\t');
        }
        catch (err) {
            throw err;
        }
    }

    async getCartUser(id) {
        try {
            const cart = await cartModel.find({ user: id });
            return JSON.stringify(cart, null, '\t');
        }
        catch (err) {
            throw err;
        }
    }


    async createCart(cart) {
        try {
            const newCart = new cartModel(cart);
            await newCart.save();
            return cart;
        }
        catch (err) {
            throw err;
        }
    }

    async addProductToCart(cid, pid, quantity) {
        try {
            const cartId = await cartModel.findById(cid);
            let productId = cartId.products.find(p => p.product.toString() === pid.toString())
            if (productId) {
                productId.quantity = quantity
            } else {
                cartId.products.push({ product: pid, quantity: quantity });
            }
            const cartUpdate = await cartModel.updateOne({ _id: cid }, cartId)
            return cartUpdate
        }
        catch (err) {
            throw err;
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            const cartId = await cartModel.findById(cid);
            const findproduct = cartId.products
            const productCart = findproduct.findIndex(p => p.product.toString() === pid.toString())

            findproduct.splice(productCart, 1)
            const update = { products: findproduct }
            const updateCart = await cartModel.findByIdAndUpdate(cid, update);
            return updateCart
        } catch (err) {
            throw err;
        }
    }

    async deleteAllProductCart(id) {
        try {
            const deleteProduct = { products: [] }
            const cart = await cartModel.findByIdAndUpdate(id, deleteProduct);
            return cart;
        } catch (err) {
            throw err;
        }
    }

    async createTicket(id) {
        // try {
        const cartUser = await this.getCartUser(id);
        const cart = JSON.parse(cartUser)
        const productCart = cart[0].products.map(p => {
            return {
                product: p.product._id,
                quantity: p.quantity
            }
        })

        let arraySinStock = [];
        let arrayConStock = [];
        let total = 0;
        //Validacion Stock
        await Promise.all(
            productCart.map(async p => {
                const product = await productModel.findOne({ _id: p.product })
                if (product.stock < p.quantity) {
                    arraySinStock.push(product)
                    return
                }
                // product.stock = product.stock - p.quantity
                // await product.save()
                product.quantity = p.quantity
                arrayConStock.push({ ...product, price: product.price * p.quantity})
            })
        )
        //Suma total precio productos
        total = arrayConStock.reduce((acc, p) => {
            return (acc + p.price);
        }, 0);
        console.log(total)

        //Creacion ticket
        const user = await registroModel.findOne({ _id: id })
        console.log(user)
        const ticket = new ticketModel({
            code: generarId(),
            amount: total,
            purchaser: user.email,
        });
        await ticket.save();
        
        return ticket
        
    }


}

export default { ProductManger, CartManager }