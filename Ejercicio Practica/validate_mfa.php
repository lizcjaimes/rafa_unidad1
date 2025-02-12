<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars(trim($_POST['username']));
    $mfa_answer = htmlspecialchars(trim($_POST['mfa_answer']));

    $stmt = $conn->prepare("SELECT security_answer_hash FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($security_answer_hash);
        $stmt->fetch();

        if (password_verify($mfa_answer, $security_answer_hash)) {
            echo json_encode(['success' => true]); 
        } else {
            echo json_encode(['success' => false]); 
        }
    } else {
        echo json_encode(['success' => false]); 
    }

    $stmt->close();
    $conn->close();
}
?>
