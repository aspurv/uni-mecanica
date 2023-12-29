<?php

require_once('../model/conexion.php');

// Obtener los datos del formulario de inicio de sesión
$usuario = $_POST['usuario'];
$contrasena = $_POST['password'];

// Consulta SQL para verificar las credenciales
$sql = "SELECT * FROM usuario WHERE id_usuario = '$usuario' AND clave = '$contrasena'";
$resultado = mysqli_query($conn, $sql);

// Verificar si se encontró un resultado
if (mysqli_num_rows($resultado) == 1) {
    // Las credenciales son válidas, el inicio de sesión es exitoso
    echo "Inicio de sesión exitoso";
    header("location: ../view/usuario.php");
} else {
    // Las credenciales son inválidas, redirigir al index.php con el parámetro de error
    header("location: /index.php");
}

?>
