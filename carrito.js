let lSInfo = JSON.parse(localStorage.getItem("carrito"));

// MOSTRAR CANTIDAD DE PRODUCTOS Y TOTAL
function cartInfo(arr) {
    const productsQuantity = document.querySelector(".productsQuantity");
    const total = document.querySelector(".total");
    let totalAPagar = 0;
    if (arr.length !== 0) {
        arr.forEach((product) => {
            totalAPagar += product.price;
        });
        productsQuantity.textContent = `Productos: ${arr.length}`;
        total.textContent = `Total: €${totalAPagar}`;
    } else {
        productsQuantity.textContent = `Productos: 0`;
        total.textContent = `Total: €0`;
    }
}

const productHtml = (arr) => {
    const container = document.querySelector(".cartContainer");
    container.innerHTML = ""; // Borramos todo y lo volvemos a cargar
    arr.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "productCard";
        productCard.innerHTML = `
            <img src="../img/slider1.jpg" alt="${product.name}" />
            <div class="productCartInfo">
                <h2>${product.name}</h2>
                <p>$${product.price}</p>
            </div>
            <button class="btn deleteBtn" id="productBtn-${product.id}">Delete</button>
        `;
        container.appendChild(productCard);
    });
    cartInfo(arr);
};
productHtml(lSInfo || []);

// BORRAR ELEMENTO
function deleteFromCart(arr) {
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((button) => {
        button.onclick = () => {
            const id = button.id.slice(11);
            const filterProduct = arr.filter((product) => {
                return product.id !== id;
            });
            lSInfo = filterProduct;
            localStorage.setItem("carrito", JSON.stringify(lSInfo));
            productHtml(lSInfo);
            deleteFromCart(lSInfo);
        };
    });
}
deleteFromCart(lSInfo);

// BORRAR TODO DEL CARRITO
const deleteCart = document.querySelector(".deleteAll");

deleteCart.onclick = () => {
    localStorage.removeItem("carrito");
    const container = document.querySelector(".cartContainer");
    container.innerHTML = "";
    cartInfo([]);
    lSInfo = [];
};

// ACTIVAR EL CAMPO DE PAGO
const payBtn = document.querySelector("#payBtn");
const payScreen = document.querySelector(".payScreen");
payBtn.onclick = () => {
    if (lSInfo === null || lSInfo.length === 0) {
        swal("Info!", "No hay nada que pagar.", "info");
        payScreen.classList.add("hidden");
    } else {
        payScreen.classList.remove("hidden");
        payInfo(lSInfo);
    }
};

function payInfo(arr) {
    const productsQuantity2 = document.querySelector(".productsQuantity2");
    const total2 = document.querySelector(".total2");
    let totalAPagar2 = 0;
    lSInfo.forEach((product) => {
        totalAPagar2 += product.price;
    });
    productsQuantity2.innerHTML = `Prod: ${arr.length}`;
    total2.innerHTML = `Total: €${totalAPagar2}`;
}

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
        localStorage.removeItem("carrito");
        lSInfo = [];
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