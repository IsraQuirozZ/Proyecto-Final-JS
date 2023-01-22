const productsLayout = document.querySelector(".productsLayout");
const tituloEquipo = document.querySelector(".tituloEquipo");

function productCards(products) {
    products.forEach((product) => {
        const productContainer = document.createElement("div");
        productContainer.className = "productContainer";
        productContainer.innerHTML = `
            <img src="../img/slider1.jpg" alt="${product.category}" class="productImg">
            <div class="productInfo">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <div class="productPriceDetails">
                    <p>€${product.price}</p>
                    <button class="btn productBtn" id="productBtn-${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productsLayout.appendChild(productContainer);
    });
}

// TODOS LOS PRODUCTOS
const all = document.querySelector("#todo");
all.onclick = () => {
    tituloEquipo.innerHTML = "EQUIPO DE TATUAJE";
    productsLayout.innerHTML = "";
    // all.style.backgroundColor = "var(--colorHover)";
    // all.style.color = "white";
    fetch("https://63cc79e55c6f2e1d84c724ec.mockapi.io/tienda/products")
        .then((res) => res.json())
        .then((data) => {
            productCards(data);
            addToCart(data);
        });
};

// FILTRADO POR OFERTAS
const offer = document.querySelector("#ofertas");
offer.onclick = () => {
    tituloEquipo.innerHTML = "OFERTAS";
    productsLayout.innerHTML = "";
    // offer.style.backgroundColor = "var(--colorHover)";
    // offer.style.color = "white";
    fetch("https://63cc79e55c6f2e1d84c724ec.mockapi.io/tienda/products")
        .then((res) => res.json())
        .then((data) => {
            const byOffer = data.filter((product) => product.offer);
            const filteredProducts = [];
            byOffer.forEach((product) => {
                filteredProducts.push(product);
            });
            productCards(filteredProducts);
            addToCart(data);
        });
};

// FILTRO POR CATEGORÍA MÁQUINA
const maquinas = document.querySelector("#maquinas");
maquinas.onclick = () => {
    productsLayout.innerHTML = "";
    tituloEquipo.innerHTML = "MÁQUINAS";
    fetch("https://63cc79e55c6f2e1d84c724ec.mockapi.io/tienda/products")
        .then((res) => res.json())
        .then((data) => {
            const byMaquinas = data.filter(
                (product) => product.category === "maquinas"
            );
            const filteredProducts = [];
            byMaquinas.forEach((product) => {
                filteredProducts.push(product);
            });
            productCards(filteredProducts);
            addToCart(data);
        });
};

// FILTRO POR CATEGORÍA PIELES
const pieles = document.querySelector("#pieles");
pieles.onclick = () => {
    productsLayout.innerHTML = "";
    tituloEquipo.innerHTML = "PIELES";
    fetch("https://63cc79e55c6f2e1d84c724ec.mockapi.io/tienda/products")
        .then((res) => res.json())
        .then((data) => {
            const byPieles = data.filter((product) => product.category === "pieles");
            const filteredProducts = [];
            byPieles.forEach((product) => {
                filteredProducts.push(product);
            });
            productCards(filteredProducts);
            addToCart(data);
        });
};

// FILTRO POR CATEGORÍA TINTA
const tintas = document.querySelector("#tintas");
tintas.onclick = () => {
    productsLayout.innerHTML = "";
    tituloEquipo.innerHTML = "TINTAS";
    fetch("https://63cc79e55c6f2e1d84c724ec.mockapi.io/tienda/products")
        .then((res) => res.json())
        .then((data) => {
            const byTintas = data.filter((product) => product.category === "tintas");
            const filteredProducts = [];
            byTintas.forEach((product) => {
                filteredProducts.push(product);
            });
            productCards(filteredProducts);
            addToCart(data);
        });
};

// BUSQUEDA DE PRODUCTO
// const formBusqueda = document.querySelector("#formBusqueda");
// const inputBusqueda = document.querySelector("#input-busqueda");

// CARRITO

let carrito = [];

function addToCart(arr) {
    const productBtn = document.querySelectorAll(".productBtn");
    productBtn.forEach((button) => {
        button.onclick = () => {
            const id = button.id.slice(11);
            console.log(id);
            const filterProduct = arr.find((elemento) => {
                return elemento.id === id;
            });
            carrito.push(filterProduct);
            console.log(carrito);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        };
    });
}

const selectedProducts = JSON.parse(localStorage.getItem("carrito"));
carrito = selectedProducts || [];

// Al cargar la página se mostrarán todos los productos
window.onload = () => {
    fetch("https://63cc79e55c6f2e1d84c724ec.mockapi.io/tienda/products")
        .then((res) => res.json())
        .then((data) => {
            productCards(data);
            addToCart(data);
        });
};