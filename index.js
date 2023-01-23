//Carrusel -- SWIPER
//   <!-- Initialize Swiper -->
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Formulario de contacto
const contactForm = document.querySelector("#formContacto");
const inputNombre = document.querySelector("#input-nombre");
const inputApellido = document.querySelector("#input-apellido");
const inputEmail = document.querySelector("#input-email");
const submitBtn = document.querySelector("#input-submit");

// Solo nos sirve para comprobar si está bienco mal todo dentro del input o
inputNombre.oninput = () => {
    if (inputNombre.value === "" || inputNombre.value.length < 2) {
        inputNombre.style.border = "1px solid var(--colorHover)";
    } else {
        inputNombre.style.border = "1px solid rgb(11, 240, 163)";
    }
};
inputApellido.oninput = () => {
    if (inputApellido.value === "" || inputApellido.value.length < 3) {
        inputApellido.style.border = "1px solid var(--colorHover)";
    } else {
        inputApellido.style.border = "1px solid rgb(11, 240, 163)";
    }
};
inputEmail.oninput = () => {
    if (
        inputEmail.value !== "" &&
        inputEmail.value.length > 10 &&
        inputEmail.value.includes(".")
    ) {
        inputEmail.style.border = "1px solid rgb(11, 240, 163)";
    } else {
        inputEmail.style.border = "1px solid var(--colorHover)";
    }
};

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
        inputNombre.value === "" ||
        inputApellido.value === "" ||
        inputEmail.value === ""
    ) {
        swal("UPS!", "Please fill the form...", "error");
    } else if (
        inputNombre.value.length < 2 ||
        inputApellido.value.length < 3 ||
        inputEmail.value.length < 10
    ) {
        swal("UPS!", "Check your info...", "warning");
    } else {
        swal("GENIAL", "Te contactaremos lo más pronto posible.", "success");
        contactForm.reset();
    }
});