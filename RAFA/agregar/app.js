let listaProyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const descripcionInput = document.querySelector('#descripcion');
const fechaInput = document.querySelector('#fecha');
const estadoInput = document.querySelector('#estado');
const divProyectos = document.querySelector('.div-proyectos');

let editando = false;
let idEditando = null;

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (nombreInput.value === '' || descripcionInput.value === '' || fechaInput.value === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (editando) {
        editarProyecto();
    } else {
        const nuevoProyecto = {
            id: Date.now(),
            nombre: nombreInput.value,
            descripcion: descripcionInput.value,
            fecha: fechaInput.value,
            estado: estadoInput.value
        };

        listaProyectos.push(nuevoProyecto);
        guardarProyectos();
    }

    mostrarProyectos();
    formulario.reset();
    editando = false;
}

function mostrarProyectos() {
    divProyectos.innerHTML = '';

    listaProyectos.forEach(proyecto => {
        const { id, nombre, descripcion, fecha, estado } = proyecto;

        const divProyecto = document.createElement('div');
        divProyecto.classList.add('proyecto');
        divProyecto.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Descripción:</strong> ${descripcion}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Estado:</strong> ${estado}</p>
            <button class="btn-editar" onclick="cargarProyecto(${id})">Editar</button>
            <button class="btn-eliminar" onclick="eliminarProyecto(${id})">Eliminar</button>
        `;
        divProyecto.dataset.id = id;

        divProyectos.appendChild(divProyecto);
    });
}

function cargarProyecto(id) {
    const proyecto = listaProyectos.find(proyecto => proyecto.id === id);

    nombreInput.value = proyecto.nombre;
    descripcionInput.value = proyecto.descripcion;
    fechaInput.value = proyecto.fecha;
    estadoInput.value = proyecto.estado;

    editando = true;
    idEditando = id;
}

function editarProyecto() {
    listaProyectos = listaProyectos.map(proyecto => {
        if (proyecto.id === idEditando) {
            return {
                ...proyecto,
                nombre: nombreInput.value,
                descripcion: descripcionInput.value,
                fecha: fechaInput.value,
                estado: estadoInput.value
            };
        }
        return proyecto;
    });

    guardarProyectos();
    mostrarProyectos();
    formulario.reset();
    editando = false;
    idEditando = null;
}

function eliminarProyecto(id) {
    listaProyectos = listaProyectos.filter(proyecto => proyecto.id !== id);
    guardarProyectos();
    mostrarProyectos();
}

// Función para guardar en LocalStorage
function guardarProyectos() {
    localStorage.setItem('proyectos', JSON.stringify(listaProyectos));
}

// Cargar proyectos al iniciar
document.addEventListener('DOMContentLoaded', mostrarProyectos);
