document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const role = document.getElementById('role').value;
    const question = document.getElementById('security_question').value;
    const answer = document.getElementById('security_answer').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        alert("El correo ya está registrado.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    users.push({ username, email, password, role, question, answer });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registro exitoso. Redirigiendo al login...");
    window.location.href = "login.html";
});
