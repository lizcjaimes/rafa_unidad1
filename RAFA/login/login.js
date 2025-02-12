document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Datos simulados de usuarios (normalmente esto vendría de una base de datos)
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
        {
            username: "admin",
            password: "admin123",
            role: "admin",
            pregunta: "color favorito",
            respuesta: "azul"
        },
        {
            username: "usuario",
            password: "usuario123",
            role: "usuario",
            pregunta: "ciudad natal",
            respuesta: "madrid"
        }
    ];

    // Guardar usuarios si no están en localStorage
    if (!localStorage.getItem("usuarios")) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        
        const usuarioEncontrado = usuarios.find(user => user.username === username && user.password === password);

        if (usuarioEncontrado) {
            localStorage.setItem("usuarioAutenticado", username);
            localStorage.setItem("rolUsuario", usuarioEncontrado.role);

            // Redirigir según el rol
            if (usuarioEncontrado.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "dashboard.html";
            }
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
});
