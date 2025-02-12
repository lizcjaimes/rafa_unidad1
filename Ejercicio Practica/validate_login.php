<?php
require 'db.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    
    if (empty($email) || empty($password)) {
        die('Por favor, completa todos los campos.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Correo electrónico no válido.');
    }

    
    $stmt = $conn->prepare('SELECT id, username, password FROM usuarios WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            header('Location: dashboard.php');
            exit();
        } else {
            die('Contraseña incorrecta.');
        }
    } else {
        die('El usuario no existe.');
    }

    $stmt->close();
    $conn->close();
} else {
    die('Acceso no autorizado.');
}
?>
