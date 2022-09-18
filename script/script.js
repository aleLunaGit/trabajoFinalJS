alert("Bienvenido")

// CLASES

class Clientes {
    constructor(nombre, apellido, dni, monto, plazo, veraz) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.dni = dni,
            this.monto = monto,
            this.plazo = plazo,
            this.veraz = veraz
    }
}

// OBJETOS NUEVOS

let registroClientes = []

const cliente1 = new Clientes("Daniel", "Aramayo", 12864871, 40000, 12, 3)
const cliente2 = new Clientes("Jose", "Cortez", 32321542, 250000, 24, 1)
const cliente3 = new Clientes("David", "Hernandez", 22456123, 78000, 36, 1)
const cliente4 = new Clientes("Miguel", "Luna", 34568815, 50000, 6, 2)
const cliente5 = new Clientes("Enrique", "Sosa", 41654789, 150000, 12, 2)

// DOM

let nameP = document.getElementById("nameP")
let surP = document.getElementById("surP")
let dniP = document.getElementById("dniP")
let verazP = document.getElementById("verazP")
let montoP = document.getElementById("montoP")
let plazoP = document.getElementById("plazoP")
let clienteLog = document.getElementById("cliente")
let ultCliente = document.getElementById("ultCl")
let buscarDNI = document.getElementById("buscarP")
let DNI = document.querySelector(`#dni`)
let ocultarR = document.getElementById(`ocultarR`)
let reg = document.createElement(`div`)
let cotizacion = document.getElementById(`cotizacionReal`)

// BOTONES

let btnSoli = document.getElementById("guardarP")
btnSoli.addEventListener("click", solicitarP)

let btnLog = document.getElementById("registroP")
btnLog.addEventListener("click", registroC)

let btnP = document.getElementById("btnP")
btnP.addEventListener("click", buscarP)

let btnOcultar = document.getElementById(`ocultarR`)
btnOcultar.addEventListener("click", ocultarReg)

// FUNCIONES

// SOLICITAR

function solicitarP() {
    nombre = nameP.value;
    apellido = surP.value;
    dni = parseInt(dniP.value);
    veraz = parseInt(verazP.value);
    monto = parseInt(montoP.value);
    plazo = parseInt(plazoP.value);

    aDevolverV = ""
    aDevolverP = ""

    analizarV();
    analizarP();

    let interesTotal = aDevolverV + aDevolverP
    let aDevolver = monto + interesTotal

    console.log(`Interés por plazo: ${aDevolverP}`)
    console.log(`Interés por veraz: ${aDevolverV}`)
    console.log(`Interés total: ${interesTotal}`)

    let nuevoCl = new Clientes(nombre, apellido, dni, monto, plazo, veraz)

    registroClientes.push(nuevoCl)
    localStorage.setItem("registroClientes", JSON.stringify(registroClientes))
    console.log(registroClientes)

    let ultSol = document.createElement("div")

    ultSol.innerHTML = `<p> Nombre: ${nuevoCl.nombre} </p>
    <p> Apellido: ${nuevoCl.apellido} </p>
    <p> DNI: ${nuevoCl.dni} </p>
    <p> Monto: ${nuevoCl.monto} </p>
    <p> Veraz: ${nuevoCl.veraz} </p>
    <p> Plazo: ${nuevoCl.plazo} </p>`

    ultCliente.appendChild(ultSol)

    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Estamos procesando tu solicitud',
        text: `Sr/a ${nuevoCl.nombre} su préstamo de ${nuevoCl.monto} está siendo procesado. Su préstamo a devolver es de ${aDevolver}(${interesTotal} de interés) en ${nuevoCl.plazo} cuotas`,
        showConfirmButton: false,
        timer: 5500
    })

    console.log(`Felicitaciones ${nuevoCl.nombre} su préstamo de ${nuevoCl.monto} fue depositado con éxito en su cuenta. Su préstamo a devolver es de ${aDevolver}(${interesTotal} de interés) en ${nuevoCl.plazo} cuotas`)
}

// CALCULADOR POR VERAZ

function analizarV() {
    if (veraz = 1) {
        aDevolverV = this.monto * 0.05
    } else if (veraz = 2) {
        aDevolverV = this.monto * 0.12
    } else if (veraz = 3) {
        aDevolverV = this.monto * 0.18
    } else if (veraz = 4) {
        aDevolverV = this.monto * 0.20
    } else if (veraz = 5) {
        aDevolverV = this.monto * 0.22
    }
}

// CALCULADOR POR PLAZO

function analizarP() {
    if (plazo <= 6) {
        aDevolverP = this.monto * 0.06
    } else if (plazo <= 12 && plazo > 6) {
        aDevolverP = this.monto * 0.12
    } else if (plazo <= 18 && plazo > 12) {
        aDevolverP = this.monto * 0.16
    } else if (plazo <= 24 && plazo > 18) {
        aDevolverP = this.monto * 0.20
    } else if (plazo <= 32 && plazo > 24) {
        aDevolverP = this.monto * 0.22
    }
}

//VER REG DE CLIENTES

function registroC() {
    for (e of registroClientes) {

        reg.innerHTML += `<p> Nombre: ${e.nombre} </p>
        <p> Apellido: ${e.apellido} </p>
        <p> DNI: ${e.dni} </p>
        <p> Monto: ${e.monto} </p>
        <p> Veraz: ${e.veraz} </p>
        <p> Plazo: ${e.plazo} </p>`

        clienteLog.appendChild(reg)
    }
}

// OCULTAR REGISTRO

function ocultarReg() {
    reg.remove();
}

// BUSCAR POR DNI

function buscarP() {

    setTimeout(() => {
        let timerInterval
        Swal.fire({
            title: 'VERIFICANDO BASE DE DATOS',
            html: 'ESPERA ESTIMADA <b></b> MILISEGUNDOS.',
            timer: 4800,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })
    }, 0);

    setTimeout(() => {
        for (let i = 0; i < registroClientes.length; i++) {

            if (registroClientes[i][`dni`] == dni.value) {
                console.log(`CLIENTE ENCONTRADO`);
                let dniEncontrado = document.createElement(`div`);
                dniEncontrado.innerHTML = `<br><p> El/la cliente ${registroClientes[i][`nombre`]} ${registroClientes[i][`apellido`]} tiene vigente una operación de préstamo </p>`;
                buscarDNI.appendChild(dniEncontrado)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'USUARIO ENCONTRADO',
                    text: `Detalles en la página web`,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                console.log(`CLIENTE NO ENCONTRADO`);
                Swal.fire({
                    icon: 'error',
                    title: 'CLIENTE NO ENCONTRADO',
                    text: 'Revisé el DNI o intente con otro',
                })
            }

        }
    }, 5000);

}

// LOCAL STORAGE + CREACION DE ARRAY

localStorage.getItem("registroClientes") ?
    (registroClientes = JSON.parse(localStorage.getItem("registroClientes")),
        console.log(registroClientes)) :
    (console.log("Primer seteo de storage"),
        registroClientes = [],
        registroClientes.push(cliente1, cliente2, cliente3, cliente4, cliente5),
        localStorage.setItem("registroClientes", JSON.stringify(registroClientes)))

// 

fetch("https://api-dolar-argentina.herokuapp.com/api/dolaroficial")
.then(response => response.json())
.then(data => {

    let cotireal = document.createElement(`p`);
    cotireal.innerHTML = `El precio del dolar actualmente es de ${data.compra} ARS`;
    cotizacion.appendChild(cotireal)
// ACTUALIZAR COTIZACION CADA 10 SEG
    setInterval(() => {
        cotireal.innerHTML = `El precio del dolar actualmente es de ${data.compra} ARS`;
    }, 10000);

})

