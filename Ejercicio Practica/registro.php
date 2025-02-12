<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $security_question = $_POST['security_question'] ?? '';
    $security_answer = $_POST['security_answer'] ?? '';

    
    if (empty($username) || empty($email) || empty($password) || empty($confirm_password) || empty($security_question) || empty($security_answer)) {
        die('Por favor, completa todos los campos.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Correo electrónico no válido.');
    }

    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/', $password)) {
        die('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.');
    }

    if ($password !== $confirm_password) {
        die('Las contraseñas no coinciden.');
    }

    if (strlen($security_answer) < 3) {
        die('La respuesta de seguridad debe tener al menos 3 caracteres.');
    }

    
    $stmt = $conn->prepare('SELECT id FROM usuarios WHERE username = ?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        die('El nombre de usuario ya está en uso.');
    }

    
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    
    $stmt = $conn->prepare('INSERT INTO usuarios (username, email, password, security_question, security_answer) VALUES (?, ?, ?, ?, ?)');
    $stmt->bind_param('sssss', $username, $email, $hashed_password, $security_question, $security_answer);

    if ($stmt->execute()) {
        echo 'Registro exitoso.';
        header('Location: login.html');
        exit();
    } else {
        echo 'Error al registrar el usuario: ' . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    die('Acceso no autorizado.');
}
?>
