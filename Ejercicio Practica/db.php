<?php
$host = 'localhost';
$db = 'mfa_system'; 
$user = 'root';    
$password = ''; 


$conn = new mysqli($host, $user, $password, $db);


if ($conn->connect_error) {
    die('Error de conexión a la base de datos: ' . $conn->connect_error);
}

// Configuración de codificación para mayor seguridad
$conn->set_charset('utf8mb4');
?>
