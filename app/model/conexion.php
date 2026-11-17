<?php

// Load environment variables from .env file (no Composer/dotenv required)
$env = [];
$envFile = __DIR__ . '/../../.env';
$exampleFile = __DIR__ . '/../../.env.example';

if (file_exists($envFile)) {
    $parsed = @parse_ini_file($envFile);
    if (is_array($parsed)) {
        $env = $parsed;
    }
} elseif (file_exists($exampleFile)) {
    $parsed = @parse_ini_file($exampleFile);
    if (is_array($parsed)) {
        $env = $parsed;
    }
}

$servername = $env['DB_HOST'] ?? 'localhost';
$username   = $env['DB_USER'] ?? 'root';
$password   = $env['DB_PASS'] ?? '';
$dbname     = $env['DB_NAME'] ?? 'horario';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Don't expose internals to the browser in production
    error_log('DB connection failed: ' . $conn->connect_error);
    die('No se pudo conectar a la base de datos. Contacte al administrador.');
}
