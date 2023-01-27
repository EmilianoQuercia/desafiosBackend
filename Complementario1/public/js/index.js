
const socket = io();

//Elementos del Dom
let message = document.getElementById('message');
let userName = document.getElementById('userName');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', () => {
    socket.emit('mensaje', {
        message: message.value,
        userName: userName.value
    })
    
})


message.addEventListener('keypress', ()=>{
    socket.emit('escribiendo', userName.value)
})

socket.on('mensajeServidor', (data)=>{
    actions.innerHTML = ''
    output.innerHTML += `<p>
       <strong>${data.userName}</strong>: ${data.message} 
    </p>`
})

socket.on('escribiendo', (data)=>{
    actions.innerHTML= `<p><em>${data} esta escribiendo...</em></p>`
})