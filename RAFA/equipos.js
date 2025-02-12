let listaEquipos = JSON.parse(localStorage.getItem('equipos')) || [];
let listaProyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const liderInput = document.querySelector('#lider');
const proyectoSelect = document.querySelector('#proyecto');
const integrantesInput = document.querySelector('#integrantes');
const divEquipos = document.querySelector('.div-equipos');

let editando = false;
let idEditando = null;

// Cargar proyectos en el select
function cargarProyectos() {
    proyectoSelect.innerHTML = '<option value="">Seleccione un Proyecto</option>';
    listaProyectos.forEach(proyecto => {
        const option = document.createElement('option');
        option.value = proyecto.id;
        option.textContent = proyecto.nombre;
        proyectoSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarEquipos();
    cargarProyectos();
});

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (nombreInput.value === '' || liderInput.value === '' || proyectoSelect.value === '' || integrantesInput.value === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (editando) {
        editarEquipo();
    } else {
        const nuevoEquipo = {
            id: Date.now(),
            nombre: nombreInput.value,
            lider: liderInput.value,
            proyecto: proyectoSelect.value,
            integrantes: integrantesInput.value.split(',').map(i => i.trim())
        };

        listaEquipos.push(nuevoEquipo);
        guardarEquipos();
    }

    mostrarEquipos();
    formulario.reset();
    editando = false;
}

function mostrarEquipos() {
    divEquipos.innerHTML = '';

    listaEquipos.forEach(equipo => {
        const { id, nombre, lider, proyecto, integrantes } = equipo;
        const proyectoNombre = listaProyectos.find(p => p.id == proyecto)?.nombre || "Proyecto no asignado";

        const divEquipo = document.createElement('div');
        divEquipo.classList.add('equipo');
        divEquipo.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Líder:</strong> ${lider}</p>
            <p><strong>Proyecto Asignado:</strong> ${proyectoNombre}</p>
            <p><strong>Integrantes:</strong> ${integrantes.join(', ')}</p>
            <button class="btn-editar" onclick="cargarEquipo(${id})">Editar</button>
            <button class="btn-eliminar" onclick="eliminarEquipo(${id})">Eliminar</button>
        `;
        divEquipo.dataset.id = id;

        divEquipos.appendChild(divEquipo);
    });
}

function cargarEquipo(id) {
    const equipo = listaEquipos.find(equipo => equipo.id === id);

    nombreInput.value = equipo.nombre;
    liderInput.value = equipo.lider;
    proyectoSelect.value = equipo.proyecto;
    integrantesInput.value = equipo.integrantes.join(', ');

    editando = true;
    idEditando = id;
}

function editarEquipo() {
    listaEquipos = listaEquipos.map(equipo => {
        if (equipo.id === idEditando) {
            return {
                ...equipo,
                nombre: nombreInput.value,
                lider: liderInput.value,
                proyecto: proyectoSelect.value,
                integrantes: integrantesInput.value.split(',').map(i => i.trim())
            };
        }
        return equipo;
    });

    guardarEquipos();
    mostrarEquipos();
    formulario.reset();
    editando = false;
    idEditando = null;
}

function eliminarEquipo(id) {
    listaEquipos = listaEquipos.filter(equipo => equipo.id !== id);
    guardarEquipos();
    mostrarEquipos();
}

// Guardar equipos en LocalStorage
function guardarEquipos() {
    localStorage.setItem('equipos', JSON.stringify(listaEquipos));
}
