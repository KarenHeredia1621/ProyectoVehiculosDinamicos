const bodyTable = document.getElementById("tablaCarrito");

document.addEventListener("DOMContentLoaded", ()=>{
    const vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos"))
    vehiculosGuardados.forEach(vehiculo =>{
        const fila = document.createElement("tr");
        const tdFoto = document.createElement("td");
        const img = document.createElement("img");
img.src = vehiculo.foto;   // Aquí pones la URL que tienes guardada
img.alt = vehiculo.nombre; // Texto alternativo opcional
img.width = 100;           // Opcional: tamaño de la imagen
tdFoto.appendChild(img);

        const tdNombre = document.createElement("td");
        tdNombre.textContent = vehiculo.nombre;

        const tdMarca = document.createElement("td");
        tdMarca.textContent = vehiculo.marca;

        const tdModelo = document.createElement("td");
        tdModelo.textContent = vehiculo.modelo;

        const tdKilometraje = document.createElement("td");
        tdKilometraje.textContent = vehiculo.kilometraje;

        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = vehiculo.precio;

        fila.appendChild(tdFoto);
        fila.appendChild(tdNombre);
        fila.appendChild(tdMarca);
        fila.appendChild(tdModelo);
        fila.appendChild(tdKilometraje);
        fila.appendChild(tdPrecio);
        
        bodyTable.appendChild(fila);
    });
});