<?php

// -----------------------------------------------------------------------
// SECURITY NOTE — Password migration required
// -----------------------------------------------------------------------
// The `clave` column currently stores PLAINTEXT passwords.
// Before going live, an administrator must re-hash every password with:
//
//   $hash = password_hash($plaintext_password, PASSWORD_BCRYPT);
//   UPDATE usuario SET clave = '$hash' WHERE id_usuario = ?;
//
// Until that migration is done this controller supports BOTH formats:
//   • If the stored value starts with '$2y$' it is a bcrypt hash → use password_verify().
//   • Otherwise it is still plaintext → compare directly (legacy fallback).
// Remove the plaintext branch once all passwords have been migrated.
// -----------------------------------------------------------------------

// session_start() must come before any output
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once('../model/conexion.php');

// Only handle POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /index.php');
    exit;
}

$usuario   = $_POST['usuario']   ?? '';
$contrasena = $_POST['password'] ?? '';

// Prepared statement — eliminates SQL injection
$stmt = $conn->prepare("SELECT * FROM usuario WHERE id_usuario = ?");
if (!$stmt) {
    error_log('Prepare failed: ' . $conn->error);
    header('Location: /index.php?error=1');
    exit;
}

$stmt->bind_param('s', $usuario);
$stmt->execute();
$result = $stmt->get_result();

$loginOk = false;
$userRole = 'usuario';

if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $storedClave = $row['clave'] ?? '';

    // Determine whether the stored value is a bcrypt hash or legacy plaintext
    if (str_starts_with($storedClave, '$2y$') || str_starts_with($storedClave, '$2b$')) {
        // Modern: bcrypt hash
        $loginOk = password_verify($contrasena, $storedClave);
    } else {
        // Legacy: plaintext comparison — migrate ASAP (see note above)
        $loginOk = ($contrasena === $storedClave);
    }

    if ($loginOk) {
        // Regenerate session ID to prevent session fixation
        session_regenerate_id(true);

        $_SESSION['usuario_id'] = $row['id_usuario'] ?? $usuario;
        $_SESSION['nombre']     = $row['nombre'] ?? ($row['id_usuario'] ?? 'Usuario');
        $userRole               = $row['rol'] ?? 'usuario';
        $_SESSION['rol']        = $userRole;
    }
}

$stmt->close();
$conn->close();

if ($loginOk) {
    if (strtolower($userRole) === 'administrador') {
        header('Location: ../view/administrador.php');
    } else {
        header('Location: ../view/usuario.php');
    }
    exit;
} else {
    header('Location: /index.php?error=1');
    exit;
}
