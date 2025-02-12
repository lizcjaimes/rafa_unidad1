document.addEventListener("DOMContentLoaded", () => {
    const recoveryForm = document.getElementById("recoveryForm");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    recoveryForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("recoveryUser").value.trim();
        const respuesta = document.getElementById("respuesta").value.trim().toLowerCase();

        const usuarioEncontrado = usuarios.find(user => user.username === username);

        if (usuarioEncontrado) {
            if (respuesta === usuarioEncontrado.respuesta.toLowerCase()) {
                alert(`Tu contraseña es: ${usuarioEncontrado.password}`);
                window.location.href = "login.html";
            } else {
                alert("Respuesta incorrecta.");
            }
        } else {
            alert("Usuario no encontrado.");
        }
    });

    // Mostrar la pregunta de seguridad al escribir el usuario
    document.getElementById("recoveryUser").addEventListener("input", (e) => {
        const usuario = usuarios.find(user => user.username === e.target.value);
        const preguntaLabel = document.getElementById("preguntaLabel");

        if (usuario) {
            preguntaLabel.textContent = `Pregunta de seguridad: ${usuario.pregunta}`;
            preguntaLabel.style.display = "block";
        } else {
            preguntaLabel.textContent = "";
        }
    });
});
