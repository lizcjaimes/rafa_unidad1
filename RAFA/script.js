document.addEventListener('DOMContentLoaded', () => {
    const proyectosContainer = document.querySelector('.proyectos-container');

    // Obtener proyectos almacenados en LocalStorage
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

    // Función para crear tarjetas de proyecto
    function crearTarjetaProyecto(proyecto) {
        const card = document.createElement('div');
        card.classList.add('proyecto-card');

        card.innerHTML = `
            <div class="proyecto-titulo"><strong>${proyecto.nombre}</strong></div>
            <div class="proyecto-resumen">${proyecto.descripcion}</div>
            <div class="proyecto-fecha"><strong>Fecha:</strong> ${proyecto.fecha}</div>
            <div class="proyecto-estado"><strong>Estado:</strong> ${proyecto.estado}</div>
        `;

        return card;
    }

    // Mostrar los proyectos en el contenedor 
    proyectos.forEach(proyecto => {
        const tarjeta = crearTarjetaProyecto(proyecto);
        proyectosContainer.appendChild(tarjeta);
    });
    
});

const palanca = document.querySelector(".switch");

if (palanca) {
    palanca.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Guardar estado en localStorage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("modoOscuro", "activado");
        } else {
            localStorage.setItem("modoOscuro", "desactivado");
        }
    });
}

// Aplicar modo oscuro al cargar la página si estaba activado
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("modoOscuro") === "activado") {
        document.body.classList.add("dark-mode");
    }
});

// comprimir barra lateral

const cloud = document.getElementById("home");
const barralateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll(".navegacion span"); // Asegurar que selecciona los spans dentro de la barra

if (cloud && barralateral) {
    cloud.addEventListener("click", () => {
        barralateral.classList.toggle("mini-barra-lateral");

        // Alternar visibilidad de los textos del menú
        spans.forEach((span) => {
            span.classList.toggle("oculto");
        });
    });
}




