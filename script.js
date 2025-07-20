let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let productos = [
   { id: 1, nombre: "Samsung Galaxy A06", precio: 289999 },
   { id: 2, nombre: "Samsung Galaxy A15", precio: 339999 },
   { id: 3, nombre: "Motorola Edge 50", precio: 661156 },
   { id: 4, nombre: "Motorola G24", precio: 369999 },
   { id: 5, nombre: "Motorola G32", precio: 502999 },
   { id: 6, nombre: "Samsung Galaxy S25", precio: 1799000 },
   { id: 7, nombre: "Xiaomi Redmi A3", precio: 189999 },
   { id: 8, nombre: "Xiaomi Redmi Note 11", precio: 424999 },
   { id: 9, nombre: "Samsung Galaxy S24 FE", precio: 1349999 },
   { id: 10, nombre: "Xiaomi Redmi 13", precio: 540999 }
];

const listaCarritoElement = document.getElementById('lista-carrito');
const totalElement = document.getElementById('total');
const contadorCarritoElement = document.getElementById('contador');
const botonVaciar = document.getElementById('boton-vaciar');
const listaProductosSection = document.getElementById('productos');


function cargarCarrito() {
    listaCarritoElement.innerHTML = '';
    let total = 0;
    let contadorUnidades = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        const precioUnitarioFormateado = item.precio.toLocaleString('es-AR');
        const subtotalProducto = item.precio * item.cantidad;
        const subtotalFormateado = subtotalProducto.toLocaleString('es-AR');

        li.innerHTML = 
            `${item.nombre} - $${precioUnitarioFormateado} x ${item.cantidad} = $${subtotalFormateado}
            <div class="cantidad-controles">
                <button class="boton-disminuir" data-id="${item.id}">-</button>
                <button class="boton-aumentar" data-id="${item.id}">+</button>
            </div>`
        ;
        listaCarritoElement.appendChild(li);

        total += subtotalProducto;
        contadorUnidades += item.cantidad;
    });

    totalElement.textContent = total.toLocaleString('es-AR');
    contadorCarritoElement.textContent = contadorUnidades;

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarProductoAlCarrito(idProducto) {
   const productoEncontrado = productos.find(p => p.id === idProducto);

    if (productoEncontrado) {
        const productoEnCarrito = carrito.find(item => item.id === idProducto);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ ...productoEncontrado, cantidad: 1 });
        }
        cargarCarrito();
        console.log(`Producto agregado/cantidad actualizada: ${productoEncontrado.nombre}`);
    } else {
        console.warn(`Producto con ID ${idProducto} no encontrado en la lista de productos.`);
    }
}

function aumentarCantidad(idProducto) {
    const productoEnCarrito = carrito.find(item => item.id === idProducto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
        cargarCarrito();
    }
}

function disminuirCantidad(idProducto) {
    const productoEnCarrito = carrito.find(item => item.id === idProducto);
    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad -= 1;
        } else {
            carrito = carrito.filter(item => item.id !== idProducto);
        }
        cargarCarrito();
    }
}

function vaciarCarrito() {
      carrito = [];
      localStorage.removeItem('carrito');
      cargarCarrito();
      console.log('Carrito vaciado.');
}

listaProductosSection.addEventListener('click', function(valor) {
    if (valor.target.classList.contains('boton-agregar')) {
        const idProducto = parseInt(valor.target.dataset.id);
        agregarProductoAlCarrito(idProducto);
    }
});

listaCarritoElement.addEventListener('click', function(valor) {
    if (valor.target.classList.contains('boton-aumentar')) {
        const idProducto = parseInt(valor.target.dataset.id);
        aumentarCantidad(idProducto);
    } else if (valor.target.classList.contains('boton-disminuir')) {
        const idProducto = parseInt(valor.target.dataset.id);
        disminuirCantidad(idProducto);
    }
});

botonVaciar.addEventListener('click', vaciarCarrito);

document.addEventListener('DOMContentLoaded', cargarCarrito);
