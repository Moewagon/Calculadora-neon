const productos = {
    "Sandwich": 20,
    "Botella de agua": 10,
    "Caramelo": 10,
    "Hamburguesa": 20,
    "Churros": 15,
    "Donut": 15,
    "Kebab": 20,
    "Junk": 15,
    "Galletas de la suerte": 5,
    "Café": 15,
    "Cola": 15,
    "Sprunk": 15,
    "Crush": 15,
    "Zumo de frutas": 15,
    "Te": 15,
    "Batido": 25,
    "Burrito": 30,
    "Tarta de queso": 20,
    "Coulant de chocolate": 20,
    "Helado": 20,
    "Chicle": 15,
    "Pasta boloñesa": 30,
    "Pocky": 5,
    "Bizcocho del gato": 15,
    "Bubble tea": 15,
    "Mochi": 15,
    "Cerveza": 15,
};


let pedido = [];
let pedidosGuardados = [];
let ticketCount = 0;

const selectProducto = document.getElementById("producto");
for (const producto in productos) {
    const option = document.createElement("option");
    option.value = producto;
    option.text = producto;
    selectProducto.add(option);
}

function agregarProducto() {
    const producto = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);

    pedido.push({ producto, cantidad });

    actualizarResumen();
}

function eliminarProducto(index) {
    pedido.splice(index, 1);
    actualizarResumen();
}

function actualizarResumen() {
    const resumenDiv = document.getElementById("resumen");
    resumenDiv.innerHTML = "<h3>Resumen del Pedido</h3>";

    pedido.forEach((item, index) => {
        const subtotal = productos[item.producto] * item.cantidad;
        resumenDiv.innerHTML += `${item.producto}: ${item.cantidad} x ${productos[item.producto]} = ${subtotal}`;
        resumenDiv.innerHTML += `<span class="eliminar" onclick="eliminarProducto(${index})"> Eliminar</span><br>`;
    });
}

function calcularTotal() {
    const total = calcularSumaTotal();

    // Crear el div desplegable con los datos del ticket actual
    const ticketDiv = document.createElement("div");
    ticketDiv.className = "ticket";
    ticketDiv.innerHTML = `<h3>Ticket ${++ticketCount} - ${obtenerHoraActual()}</h3><p>Total a Pagar: <b>${total}$</b></p><p>${formatProductos()}</p><button onclick="eliminarTicket(this, ${ticketCount})">Eliminar Ticket</button>`;

    // Agregar el nuevo div en el mismo lugar que el anterior
    document.body.insertBefore(ticketDiv, document.querySelector('.ticket'));

    // Mover los divs existentes hacia abajo
    const tickets = document.querySelectorAll('.ticket');
    for (let i = 1; i < tickets.length; i++) {
        tickets[i].style.top = `${i * 230}px`; // Ajusta la distancia entre los divs
    }

    // Limpiar el ticket actual
    pedidosGuardados.push({ pedido: [...pedido], total, hora: obtenerHoraActual() });
    pedido = [];
    actualizarResumen();
}

function formatProductos() {
    return pedido.map(item => `${item.cantidad} ${item.producto}`).join(', ');
}

function calcularSumaTotal() {
    return pedido.reduce((total, item) => total + productos[item.producto] * item.cantidad, 0);
}

function obtenerHoraActual() {
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
}

function eliminarTicket(boton, ticketNumero) {
    // Eliminar el ticket del array de tickets guardados
    pedidosGuardados.splice(ticketNumero - 1, 1);

    // Eliminar el ticket del DOM
    const ticketDiv = boton.parentNode;
    ticketDiv.parentNode.removeChild(ticketDiv);

    // Ajustar las posiciones de los tickets restantes
    const tickets = document.querySelectorAll('.ticket');
    for (let i = 1; i <= tickets.length; i++) {
        tickets[i - 1].style.top = `${i * 230}px`; // Ajusta la distancia entre los divs
    }
}

function toggleMenu() {
    const container = document.getElementById('container');
    const navbar = document.querySelector('.navbar');
    container.classList.toggle('menu-open');
    navbar.classList.toggle('menu-open');
}
