const tablaBody = document.querySelector('#tablaVehiculos tbody')

document.addEventListener('DOMContentLoaded', () => {
    const vehiculosGuardadosEnCarrito = JSON.parse(localStorage.getItem("vehiculosCard")) || [];

    vehiculosGuardadosEnCarrito.forEach((vehiculo) => {
        const trBody = document.createElement('tr');

        const tdFoto = document.createElement('td');
        const img = document.createElement('img');
        img.src = vehiculo.foto;
        img.style.width = '100px';
        tdFoto.appendChild(img);
        

        const tdNombre = document.createElement('td');
        tdNombre.textContent = vehiculo.nombre;

        const tdMarca = document.createElement('td');
        tdMarca.textContent = vehiculo.marca;

        const tdModelo = document.createElement('td');
        tdModelo.textContent = vehiculo.modelo;

        const tdKilometraje = document.createElement('td');
        tdKilometraje.textContent = vehiculo.kilometraje;

        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = vehiculo.precio;

        tablaBody.appendChild(trBody);
        trBody.appendChild(tdFoto);
        trBody.appendChild(tdNombre);
        trBody.appendChild(tdMarca);
        trBody.appendChild(tdModelo);
        trBody.appendChild(tdKilometraje);
        trBody.appendChild(tdPrecio);


    })
})