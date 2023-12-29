// Seleccionar los elementos del DOM por sus respectivos ID
const abrir = document.getElementById("abrir-menu");
const cerrar = document.getElementById("cerrar-menu");
const menu = document.getElementById("menu");
const header = document.getElementById("header");
const mostrarContenido = document.getElementById("contenido");

// Agregar un EventListener al elemento con ID "abrir" que realiza algunas acciones cuando se hace clic en él
abrir.addEventListener("click", () => {
    menu.classList.add("abierto");
    header.classList.add("completo");
    cerrar.classList.add("activo");
    abrir.classList.add("desactivado");
    mostrarContenido.classList.add("completo");
});

// Agregar un EventListener al elemento con ID "cerrar" que realiza algunas acciones cuando se hace clic en él
cerrar.addEventListener("click", () => {
    menu.classList.remove("abierto");
    header.classList.remove("completo");
    cerrar.classList.remove("activo");
    abrir.classList.remove("desactivado");
    mostrarContenido.classList.remove("completo");
});

// Seleccionar elementos adicionales del DOM por sus respectivos ID
const contentGeneral = document.getElementById("c-general");
const general = document.getElementById("sec-general");
const btnAngle = document.getElementById("img-two-general");

let menuAbierto = false;

// Agregar un EventListener al elemento con ID "general" que realiza acciones basadas en el estado de la variable "menuAbierto"
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

// Seleccionar elementos adicionales del DOM por sus respectivos selectores
const td = document.querySelector("td");
const message = document.querySelector(".message");

let iniciarC = false;

// Agregar un EventListener al elemento "td" que alterna entre agregar y eliminar clases basadas en el estado de la variable "iniciarC"
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

// Seleccionar más elementos del DOM por sus respectivos ID
const textCuadro = document.getElementById("textCuadro");
const btnCuadro = document.getElementById("btnCuadro");

// Agregar un EventListener al elemento con ID "btnCuadro" que toma el valor del elemento con ID "textCuadro" y lo coloca dentro del elemento "td" cuando se hace clic en él
btnCuadro.addEventListener("click", () => {
    var info = textCuadro.value;
    td.innerHTML = info;
});

// 
function sidebarToggle(){
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");

    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
        content.style.marginLeft = "0";
    } else {
        sidebar.style.width = "250px";
        content.style.marginLeft = "250px";
    }
}

// Función para mostrar la página de horario de clases
function mostrarHorario() {
    document.querySelector('.conteiner-contenido > #contenido').style.display = 'none';
    document.getElementById('horario-page').style.display = 'block';
    document.getElementById('horario-page').style.marginLeft = 'auto';
    document.getElementById('horaio-page').style.marginRight = 'auto';

}

// Función para mostrar la sección principal y ocultar las páginas específicas
function mostrarSeccionPrincipal() {
    document.querySelector('.conteiner-contenido > #contenido').style.display = 'block';
    document.getElementById('horario-page').style.display = 'none';
}

