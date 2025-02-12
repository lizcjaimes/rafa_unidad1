document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login_email').value.trim();
    const password = document.getElementById('login_password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Correo o contraseña incorrectos.");
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));

    alert("Inicio de sesión exitoso.");
    window.location.href = user.role === 'admin' ? "dashboard_admin.html" : "dashboard_user.html";
});
