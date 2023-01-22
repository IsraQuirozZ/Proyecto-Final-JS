let lSInfo = JSON.parse(localStorage.getItem("carrito"));

// MOSTRAR CANTIDAD DE PRODUCTOS Y TOTAL
function cartInfo(arr) {
    const productsQuantity = document.querySelector(".productsQuantity");
    const total = document.querySelector(".total");
    let cantidad = 0;
    let totalAPagar = 0;
    if (arr.length !== 0) {
        arr.forEach((product) => {
            cantidad++;
            totalAPagar += product.price;
        });
        productsQuantity.textContent = `Productos: ${cantidad}`;
        total.textContent = `Total: €${totalAPagar}`;
        localStorage.setItem("cantidadProductos", JSON.stringify(cantidad));
        localStorage.setItem("totalAPagar", JSON.stringify(totalAPagar));
    } else {
        localStorage.productsQuantity.textContent = `Productos: 0`;
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
    lSInfo = [];
    const container = document.querySelector(".cartContainer");
    container.innerHTML = "";
    cartInfo([]);
    cantidad = 0;
    totalAPagar = 0;
};