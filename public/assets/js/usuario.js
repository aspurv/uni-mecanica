// Seleccionar los elementos del DOM por sus respectivos ID
const abrir = document.getElementById("abrir-menu");
const cerrar = document.getElementById("cerrar-menu");
const menu = document.getElementById("menu");
const header = document.getElementById("header");
const mostrarContenido = document.getElementById("contenido");

// EventListeners para abrir/cerrar menú lateral
if (abrir && cerrar && menu && header && mostrarContenido) {
    abrir.addEventListener("click", () => {
        menu.classList.add("abierto");
        header.classList.add("completo");
        cerrar.classList.add("activo");
        abrir.classList.add("desactivado");
        mostrarContenido.classList.add("completo");
    });

    cerrar.addEventListener("click", () => {
        menu.classList.remove("abierto");
        header.classList.remove("completo");
        cerrar.classList.remove("activo");
        abrir.classList.remove("desactivado");
        mostrarContenido.classList.remove("completo");
    });
}

// Submenú General
const contentGeneral = document.getElementById("c-general");
const general = document.getElementById("sec-general");
const btnAngle = document.getElementById("img-two-general");

let menuAbierto = false;

if (general && contentGeneral && btnAngle) {
    general.addEventListener("click", () => {
        if (menuAbierto) {
            contentGeneral.style.display = 'flex';
            btnAngle.classList.add("activo");
            menuAbierto = false;
        } else {
            contentGeneral.style.display = 'none';
            btnAngle.classList.remove("activo");
            menuAbierto = true;
        }
    });
}

// Celdas interactivas (si existen en la vista)
const td = document.querySelector("td");
const message = document.querySelector(".message");
let iniciarC = false;

if (td && message) {
    td.addEventListener("click", () => {
        if (iniciarC) {
            td.classList.add("activo");
            message.classList.add("activo");
            iniciarC = false;
        } else {
            td.classList.remove("activo");
            message.classList.remove("activo");
            iniciarC = true;
        }
    });
}

const textCuadro = document.getElementById("textCuadro");
const btnCuadro = document.getElementById("btnCuadro");

if (btnCuadro && textCuadro && td) {
    btnCuadro.addEventListener("click", () => {
        var info = textCuadro.value;
        td.innerHTML = info;
    });
}

// Toggle lateral
function sidebarToggle() {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");

    if (sidebar && content) {
        if (sidebar.style.width === "250px") {
            sidebar.style.width = "0";
            content.style.marginLeft = "0";
        } else {
            sidebar.style.width = "250px";
            content.style.marginLeft = "250px";
        }
    }
}

// Función para mostrar la página de horario de clases
function mostrarHorario() {
    const contenido = document.querySelector('.conteiner-contenido > #contenido');
    const horarioPage = document.getElementById('horario-page');
    if (contenido && horarioPage) {
        contenido.style.display = 'none';
        horarioPage.style.display = 'block';
        horarioPage.style.marginLeft = 'auto';
        horarioPage.style.marginRight = 'auto';
    }
}

// Función para mostrar la sección principal y ocultar las páginas específicas
function mostrarSeccionPrincipal() {
    const contenido = document.querySelector('.conteiner-contenido > #contenido');
    const horarioPage = document.getElementById('horario-page');
    if (contenido) {
        contenido.style.display = 'block';
    }
    if (horarioPage) {
        horarioPage.style.display = 'none';
    }
}

