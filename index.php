<?php
$hasError = isset($_GET['error']) && $_GET['error'];
$cardClass = 'login-glass-card' . ($hasError ? ' error' : '');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/public/assets/img/UNI.png">
    <title>UNI | EARPFI</title>
    <!-- Normalizer -->
    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Glass Login CSS -->
    <link rel="stylesheet" href="./public/assets/css/login.css">
</head>
<body class="glass-page">

    <div class="<?= $cardClass ?>">
        <!-- Logo + University name -->
        <div class="login-glass-card__header">
            <img src="./public/assets/img/logo2.png" alt="UNI Logo" class="login-glass-card__logo">
            <div class="login-glass-card__titles">
                <span class="login-glass-card__uni">UNIVERSIDAD NACIONAL DE INGENIERÍA</span>
                <span class="login-glass-card__faculty">FACULTAD DE INGENIERÍA</span>
            </div>
        </div>

        <!-- Subtitle -->
        <div class="login-glass-card__subtitle">
            <p class="login-glass-card__subtitle-main">INTRANET EARPFIM</p>
            <p class="login-glass-card__subtitle-desc">Sistema de Planificación de Recursos Académicos y Empresariales</p>
        </div>

        <!-- Form -->
        <form class="login-glass-card__form" action='./app/controller/controlador.php' method="post">
            <div class="form-login__user">
                <label for="usuario">Usuario</label>
                <input type="text" name="usuario" id="usuario" placeholder="Ingrese su usuario">
            </div>
            <div class="form-login__password">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" placeholder="Ingrese su contraseña">
            </div>
            <div class="form-login__btn">
                <button type="submit" name="btn" class="form-login__btn--modif">INICIAR SESIÓN</button>
            </div>
        </form>

        <!-- Error message -->
        <div class="login-glass-card__error">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Usuario o contraseña incorrectos. Inténtalo de nuevo.</span>
        </div>
    </div>

<script>
window.addEventListener('mouseover', initLandbot, { once: true });
window.addEventListener('touchstart', initLandbot, { once: true });
var myLandbot;
function initLandbot() {
if (!myLandbot) {
    var s = document.createElement('script');s.type = 'text/javascript';s.async = true;
    s.addEventListener('load', function() {
    var myLandbot = new Landbot.Livechat({
        configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2079622-22VYARWVP0QTVFJS/index.json',
    });
    });
    s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
}
}
</script>

    <!-- Bootstrap JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
