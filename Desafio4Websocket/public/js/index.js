
const socket = io()

const products = []

const allProduct = async () =>{
    const response = await fetch('./productos.json')
    const data = await response.json()
    return data
}

const renderProducts = async () => {
    const product = await allProduct()
    
    products.length<1 && products.push(product)
    
    console.log(products)
    const list = products[0].map((prod)=>{
        return `<div class="card" style="width: 18rem; margin: 5px">
                    <div class="card-body">
                        <h5 class="card-title">${prod.title}</h5>
                        <p class="card-text"> ${prod.description}</p>
                        <p class="card-text">PRECIO: $${prod.price}</p>
                        <p class="card-text">CATEGORIA: ${prod.category}</p>
                     </div>
                 </div>`
    })
    .join(' ')
    document.getElementById('containerCards').innerHTML = list
}

renderProducts()


const addProduct = (e) =>{
    e.preventDefault()
    const prod = {
     title: document.getElementById('nombre').value,
     description: document.getElementById('descripcion').value,
     price: document.getElementById('precio').value,
     category: document.getElementById('categoria').value
    }
    products[0].push(prod)
    // console.log(prod)
    renderProducts()
}


const eliminarProducto = (e) =>{
    e.preventDefault()
    console.log('eliminando')
}

document.getElementById('btnAdd').addEventListener('click',addProduct)
document.getElementById('btnEliminar').addEventListener('click',eliminarProducto)
