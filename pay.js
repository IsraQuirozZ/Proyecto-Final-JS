// FORMULARIO DE PAGO
const payForm = document.querySelector("#payForm");
const inputNombre = document.querySelector("#input-nombreT");
const inputNTarjeta = document.querySelector("#input-numeroT");
const inputExpiracion = document.querySelector("#input-expiracion");
const inputCvv = document.querySelector("#input-cvv");

// SIMULADOR TARJETA
const numeroTarjeta = document.querySelector(".numeroTarjeta");
const nombreTarjeta = document.querySelector(".nombreTarjeta");
const expiracion = document.querySelector(".expiracion");
const cvv = document.querySelector(".cvv");
let tarjetaValida = false;
let nombreValido = false;
let expiracionValida = false;
let cvvValido = false;

inputNombre.addEventListener("input", () => {
    if (inputNombre.value === "" || inputNombre.value.length < 5) {
        nombreTarjeta.textContent = "Nombre Del Propietario";
        inputNombre.style.border = "1px solid red";
    } else {
        nombreTarjeta.textContent = inputNombre.value;
        inputNombre.style.border = "1px solid green";
        nombreValido = true;
    }
});
inputNTarjeta.addEventListener("input", () => {
    if (inputNTarjeta.value === "" || inputNTarjeta.value.length < 16) {
        numeroTarjeta.textContent = "#### #### #### ####";
        inputNTarjeta.style.border = "1px solid red";
    } else if (inputNTarjeta.value.length > 16) {
        numeroTarjeta.textContent = "#### #### #### ####";
        inputNTarjeta.style.border = "1px solid red";
    } else {
        numeroTarjeta.textContent = espaciarNum(inputNTarjeta.value);
        inputNTarjeta.style.border = "1px solid green";
        tarjetaValida = true;
    }
});

const espaciarNum = (valor) => {
    const espaciado = [...valor];
    espaciado.splice(4, 0, " ");
    espaciado.splice(9, 0, " ");
    espaciado.splice(14, 0, " ");
    return espaciado.join("");
};

inputExpiracion.addEventListener("input", () => {
    const actualYear = new Date().getFullYear();
    if (inputExpiracion.value === "" || inputExpiracion.value.length !== 4) {
        inputExpiracion.style.border = "1px solid red";
        expiracion.textContent = "**/**";
    } else if (
        inputExpiracion.value.slice(0, 2) > 12 ||
        inputExpiracion.value.slice(0, 2) < 1 ||
        inputExpiracion.value.slice(2) < String(actualYear).slice(2)
    ) {
        inputExpiracion.style.border = "1px solid red";
        expiracion.textContent = "**/**";
    } else {
        inputExpiracion.style.border = "1px solid green";
        expiracion.textContent = validarExpiracion(inputExpiracion.value);
        expiracionValida = true;
    }
});
const validarExpiracion = (valor) => {
    const expiracion = [...valor];
    expiracion.splice(2, 0, "/");
    return expiracion.join("");
};

inputCvv.addEventListener("input", () => {
    if (inputCvv.value === "" || inputCvv.value.length !== 3) {
        cvv.textContent = "###";
        inputCvv.style.border = "1px solid red";
    } else {
        cvv.textContent = inputCvv.value;
        inputCvv.style.border = "1px solid green";
        cvvValido = true;
    }
});

payForm.onsubmit = (e) => {
    e.preventDefault();
    if (tarjetaValida && nombreValido && expiracionValida && cvvValido) {
        swal("LISTO!", "Gracias por su compra.", "success").then((res) => {
            if (res === null || res === true) {
                location.href = "tienda.html";
            }
        });
        payForm.reset();
    } else if (
        inputNombre.value === "" ||
        inputNTarjeta.value === "" ||
        inputExpiracion.value === "" ||
        inputCvv.value === ""
    ) {
        swal("UPS!", "Porfavor complete el formulario...", "error");
    } else {
        swal("UPS!", "Algo salió mal, verifique su información", "warning");
    }
};