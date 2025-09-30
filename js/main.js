const containerCards = document.getElementById('containerCars')
const buyVehicle = document.getElementById('button_buy');
const containerVehicle = document.getElementById('vehicle_item');
const btnCreateVehicle = document.getElementById('buttonCreateVehicle');
const containerButtonsCard = document.getElementById('cont_buttons');
const carInfo = document.getElementById('carInfo');
const carGeneralInfo = document.getElementById('bodyCard');
const form = document.getElementById('vehiculo-form');
const inputFoto = document.getElementById('foto');
const inputNombre = document.getElementById('nombre');
const inputMarca = document.getElementById('marca');
const inputModelo = document.getElementById('modelo');
const inputKilometraje = document.getElementById('kilometraje');
const inputPrecio = document.getElementById('precio');
const buttonCarProduct = document.getElementById('btn_products');
const side_bar = document.getElementById('side-bar')
const containerBtnCar = document.getElementById('containerBtnCar');
const countProducts = document.getElementById('car-count');
const contProducts = document.getElementById('cont_products');
const totalPriceContainer = document.getElementById('containerTotalPrice');
const totalPrice = document.getElementById('totalPrice')
let total = 0


function createNewVehicle(foto, nombre, marca, modelo, kilometraje, precio) {
    // creo el elemento padre de la tarjeta
    const containerTarget = document.createElement('div');
    containerTarget.classList.add('col-md-6', 'item-vehiculo');
    // creo el elemento hijo que contiene todo el cuerpo de la informacion con la foto 
    const bodyCard = document.createElement('div');
    bodyCard.classList.add('card', 'h-100');
    // creamos la imagen
    const img = document.createElement('img');
    img.classList.add("fotos");
    img.src = foto;
    document.body.appendChild(img);
    // creamos el contenedor de toda la informacion del vehiculo
    const carInfo = document.createElement('div');
    carInfo.classList.add('card-body');
    // creamos el h4 que contiene el nombre del vehiculo
    const nameVehicle = document.createElement('h3');
    nameVehicle.classList.add('card-title');
    nameVehicle.textContent = 'Nombre: ' + nombre
    // creamos el campo para la marca del vehiculo
    const brandVehicle = document.createElement('h4');
    brandVehicle.classList.add('card-subtitle', 'mb-2');
    brandVehicle.textContent = 'Marca: ' + marca
    // creamos el campo para el modelo del vehiculo
    const modelVehicle = document.createElement('h4');
    modelVehicle.classList.add('card-text');
    modelVehicle.textContent = 'Modelo: ' + modelo
    // creamos el campo para el kilometraje del vehiculo
    const kmVehicle = document.createElement('h4');
    kmVehicle.classList.add('card-km');
    kmVehicle.textContent = 'Recorrido: ' + kilometraje + ' km'
    // creamos el campo para el precio del vehiculo
    const priceVehicle = document.createElement('h4');
    priceVehicle.classList.add('text-success');
    priceVehicle.textContent = 'Precio: $' + precio
    // creamos el contenedor de los dos botones, comprar y eliminar
    const containerButtons = document.createElement('div');
    containerButtons.classList.add('d-flex', 'justify-content-between', 'mt-3')
    // creamos el boton de comprar
    const buttonBuy = document.createElement('button');
    buttonBuy.classList.add('btn', 'btn-success')
    buttonBuy.id = 'button_buy'
    buttonBuy.textContent = 'Comprar';
    // creamos el boton de eliminar
    const buttonDeleteCard = document.createElement('button');
    buttonDeleteCard.classList.add('btn', 'btn-danger')
    buttonDeleteCard.id = 'button_delete'
    buttonDeleteCard.textContent = 'Eliminar';

    containerTarget.appendChild(bodyCard)
    bodyCard.appendChild(img)
    bodyCard.appendChild(carInfo)
    carInfo.appendChild(nameVehicle);
    carInfo.appendChild(brandVehicle)
    carInfo.appendChild(modelVehicle)
    carInfo.appendChild(kmVehicle)
    carInfo.appendChild(priceVehicle)
    carInfo.appendChild(containerButtons)
    containerButtons.appendChild(buttonBuy)
    containerButtons.appendChild(buttonDeleteCard)

    return containerTarget;
}

form.addEventListener('submit', (m) => {
    m.preventDefault()
    let foto = inputFoto.value.trim();
    const nombre = inputNombre.value.trim();
    const marca = inputMarca.value.trim();
    const modelo = inputModelo.value.trim();
    const kilometraje = inputKilometraje.value.trim();
    const precio = inputPrecio.value.trim();

    if (!nombre || !marca || !modelo || !kilometraje || !precio) {
        alert('Todos los campos son obligatorios');
    } else {
        if (foto === '') {
            foto = 'https://fotos.quecochemecompro.com/jeep-compass/jeep-compass-trasera.jpg?size=1200x800'
        }
        const newVehicle = createNewVehicle(foto, nombre, marca, modelo, kilometraje, precio)
        containerCards.appendChild(newVehicle)
        form.reset()
        eventsToCard(newVehicle)
    }

    //Anteriormente era un solo valor y ahora estamos alimentando un objeto con sus diferentes claves o valores
    const newVehicle = {
        foto : foto,
        nombre : nombre,
        marca : marca,
        modelo : modelo,
        kilometraje : kilometraje,
        precio : precio
    }

    //Capturamos el arreglo existente en el localStorage o lo creamos vacío si no existe previamente
    const vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos")) || [];

    //Agregamos al arreglo[] vehiculosGuardados
    vehiculosGuardados.push(newVehicle);

    localStorage.setItem("vehiculos", JSON.stringify(vehiculosGuardados));
    const vehiculoCreado = localStorage.getItem("vehiculo");


    form.reset();

});

document.addEventListener('DOMContentLoaded', ()=>{
    const vehiculoCreado = localStorage.getItem("vehiculo");
    if (vehiculoCreado) {
        const objetoVehiculo = JSON.parse(vehiculoCreado)
        inputMensaje.innerHTML = "El vehículo es: " + objetoVehiculo.foto + "<br>" + "nombre: " + objetoVehiculo.nombre + "<br>" + "marca: " + objetoVehiculo.marca + "<br>" + "modelo: " + objetoVehiculo.modelo + "<br>" + "Kilometraje: " + objetoVehiculo.kilometraje + "<br>" + "Precio: " + objetoVehiculo.precio;

    }
});


function eventsToCard(containerTarget) {
    const buttonBuy = containerTarget.querySelector('#button_buy')
    const buttonDelete = containerTarget.querySelector('#button_delete');

    buttonDelete.addEventListener('click', () => {
        containerTarget.remove()
    })

    buttonBuy.addEventListener('click', () => {

        const foto = containerTarget.querySelector('img').src;
        const nombre = containerTarget.querySelector('.card-title').textContent.replace('Nombre: ', '');
        const marca = containerTarget.querySelector('.card-subtitle').textContent.replace('Marca: ', '');
        const modelo = containerTarget.querySelector('.card-text').textContent.replace('Modelo:', '');
        const kilometraje = containerTarget.querySelector('.card-km').textContent.replace('Recorrido: ', '').replace(' km', '');
        const precio = containerTarget.querySelector('.text-success').textContent.replace('Precio: $', '');

        const cartItem = addProduct(foto, nombre, marca, modelo, kilometraje, precio)
        contProducts.appendChild(cartItem)
        countProducts.textContent = parseInt(countProducts.textContent) + 1;


        total += parseInt(precio)
        totalPrice.textContent = total
        // for (let i = precio; i <= countProducts; i++) {
        //     i + precio
        // }
    })
}
function addProduct(foto, nombre, marca, modelo, kilometraje, precio) {
    // traigo la informacion que necesito de otra funcion con el valor devuelto de la misma
    const newVehicleProduct = createNewVehicle(foto, nombre, marca, modelo,modelo, kilometraje, precio)

    // creo la tarjeta que va a tener los datos de cada vehiculo a comprar
    const containerTarget = document.createElement('div');
    containerTarget.classList.add('targetProduct');
    // creo la etiqueta img
    const img = document.createElement('img');
    img.src = foto;
    // creo el espacio para las imagenes
    const containerImg = document.createElement('div');
    containerImg.classList.add('col-md-5', 'container-img')
    containerImg.appendChild(img)

    // creo el espacio para la informacion del vehiculo
    const containerInfoVehicle = document.createElement('div')
    containerInfoVehicle.classList.add('col-md-7', 'carInfoProduct');

    // creo el espacio para mostrar el nombre del vehiculo
    const nameVehicleProduct = document.createElement('h4')
    nameVehicleProduct.classList.add('card-title');
    nameVehicleProduct.textContent = 'Vehiculo: ' + nombre
    // creo el espacio para mostrar la marca del vehiculo
    const brandVehicleProduct = document.createElement('h4');
    brandVehicleProduct.classList.add('card-subtitle', 'mb-2')
    brandVehicleProduct.textContent = 'Marca: ' + marca

    const modelVehicleProduct = document.createElement('h4');
    modelVehicleProduct.classList.add('card-text');
    modelVehicleProduct.textContent = 'Modelo: ' + modelo
    // creo el espacio para mostrar el kilometraje del vehiculo
    const mileageCarProduct = document.createElement('h4');
    mileageCarProduct.classList.add('card-km');
    mileageCarProduct.textContent = 'Recorrido: ' + kilometraje + ' km';
    // creo el espacio para mostrar el precio del vehiculo
    const priceVehicleProduct = document.createElement('h4');
    priceVehicleProduct.classList.add('text-success');
    priceVehicleProduct.textContent = 'Precio: $' + precio
    // creo el boton para eliminar la tarjeta
    const buttonDeleteCard = document.createElement('button');
    buttonDeleteCard.classList.add('btn', 'btn-danger')
    buttonDeleteCard.id = 'button_delete'
    buttonDeleteCard.textContent = 'Eliminar';
    buttonDeleteCard.addEventListener('click', () => {
        containerTarget.remove()
        countProducts.textContent = parseInt(countProducts.textContent) - 1
        total -= parseInt(precio)
        totalPrice.textContent = total
    })
    containerInfoVehicle.appendChild(nameVehicleProduct)
    containerInfoVehicle.appendChild(brandVehicleProduct)
    containerInfoVehicle.appendChild(modelVehicleProduct)
    containerInfoVehicle.appendChild(mileageCarProduct)
    containerInfoVehicle.appendChild(priceVehicleProduct)
    containerInfoVehicle.appendChild(buttonDeleteCard)
    containerTarget.appendChild(containerImg)
    containerTarget.appendChild(containerInfoVehicle)

    const newVehicleCard = {
        foto : foto,
        nombre : nombre,
        marca : marca,
        modelo : modelo,
        kilometraje : kilometraje,
        precio : precio
    }

    const vehiculosGuardadosCard = JSON.parse(localStorage.getItem("vehiculosCard")) || [];
    vehiculosGuardadosCard.push(newVehicleCard);

        localStorage.setItem("vehiculosCard", JSON.stringify(vehiculosGuardadosCard));


    return containerTarget;
}

buttonCarProduct.addEventListener('click', () => {
    side_bar.classList.toggle('active');
    containerBtnCar.classList.toggle('classContainerBtnCar');
})