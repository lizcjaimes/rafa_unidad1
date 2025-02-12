document.addEventListener('DOMContentLoaded', () => {
    const equiposContainer = document.querySelector('.equipos-container');

    // Obtener equipos y proyectos almacenados en LocalStorage
    const equipos = JSON.parse(localStorage.getItem('equipos')) || [];
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

    // Función para obtener el nombre del proyecto asignado
    function obtenerNombreProyecto(idProyecto) {
        const proyecto = proyectos.find(proy => proy.id == idProyecto);
        return proyecto ? proyecto.nombre : 'No asignado';
    }

    // Función para crear tarjetas de equipo
    function crearTarjetaEquipo(equipo) {
        const card = document.createElement('div');
        card.classList.add('equipo-card');

        card.innerHTML = `
            <div class="equipo-titulo"><strong>${equipo.nombre}</strong></div>
            <div class="equipo-lider"><strong>Líder:</strong> ${equipo.lider}</div>
            <div class="equipo-proyecto"><strong>Proyecto:</strong> ${obtenerNombreProyecto(equipo.proyecto)}</div>
            <div class="equipo-integrantes">
                <strong>Integrantes:</strong> ${equipo.integrantes.join(', ')}
            </div>
        `;

        return card;
    }

    // Mostrar los equipos en el contenedor
    equipos.forEach(equipo => {
        const tarjeta = crearTarjetaEquipo(equipo);
        equiposContainer.appendChild(tarjeta);
    });
});
