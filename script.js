document.addEventListener("DOMContentLoaded", function () {
    const botonesAgregar = document.querySelectorAll(".agregar-carrito");
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total");
    const vaciarCarrito = document.getElementById("vaciar-carrito");
    const productsContainer = document.querySelector(".catalogo-container");
    let carrito = [];



    function procesarProductos(producto) {
        const productDiv = document.createElement("div");
        productDiv.className = "producto";
        productDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button class="agregar-carrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
        `;
    
        // Agrega el producto al contenedor de productos
        productsContainer.appendChild(productDiv);
    
        // Agrega un evento click al botón recién creado
        const boton = productDiv.querySelector(".agregar-carrito");
        boton.addEventListener("click", function () {
            const nombre = boton.getAttribute("data-nombre");
            const precio = parseInt(boton.getAttribute("data-precio"));
            carrito.push({ nombre, precio });
            actualizarCarrito();
    
            // Utiliza SweetAlert2 para mostrar una alerta
            Swal.fire({
                title: 'Producto Agregado',
                text: `${nombre} se ha añadido al carrito.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        });
    }

    fetch("productos.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(procesarProductos);
    })
    .catch((error) => {
        console.error("Error al cargar productos desde el archivo JSON local:", error);
    });

    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;
        carrito.forEach((producto) => {
            const elementoCarrito = document.createElement("li");
            elementoCarrito.innerHTML = `${producto.nombre} - Precio: $${producto.precio}`;
            listaCarrito.appendChild(elementoCarrito);
            total += producto.precio;
        });
        totalCarrito.textContent = total;
    }
    

    // Agregar un producto al carrito
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", function () {
            const nombre = boton.getAttribute("data-nombre");
            const precio = parseInt(boton.getAttribute("data-precio"));
            carrito.push({ nombre, precio });
            actualizarCarrito();

            // Utilizar SweetAlert2 para mostrar una alerta
            Swal.fire({
                title: 'Producto Agregado',
                text: `${nombre} se ha añadido al carrito.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        });
    });

    // Vaciar el carrito
    vaciarCarrito.addEventListener("click", function () {
        // Utilizar SweetAlert2 para mostrar una confirmación
        Swal.fire({
            title: '¿Seguro que deseas vaciar el carrito?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar carrito',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                actualizarCarrito();
                Swal.fire('Carrito Vacío', 'El carrito ha sido vaciado.', 'success');
            }
        });
    });

});