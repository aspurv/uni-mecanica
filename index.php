<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/public/assets/img/UNI.png">
    <title>UNI | EARPFI</title>
    <!-- Normalizer -->
    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css">
    <!-- CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./public/assets/css/login.css">
</head>
<body>


    <!-- Comienzo del contenedor del login -->
    <header class="header">
        <div class="header__imagen">
            <a href="#"><img src="./public/assets/img/logo2.png" alt="logo" width="60" height="70"></a>
        </div>

        <div class="header--titulo">
            <label>UNIVERSIDAD NACIONAL DE INGENIERÍA</label>
            <label>FACULTAD DE INGENIERÍA</label>
    </header>

    <!-- Creacion de subtitulo de formulario -->
    <div class="content__text row">
        <h4>
            <p>INTRANET EARPFIM</p>
            <p class="opacidad">Sistema de Planificación de Recursos Académicos y Empresariales</p>
        </h4>
    </div>
    <!-- Creación de formulario -->
    <div class="form-login">
        <form action='./app/controller/controlador.php' method="post">
            <div class="form-login__user">
                <label for="">Usuario</label>
                <input type="text" name="usuario" id="usuario" placeholder="Ingrese su usuario">
            </div>
            <div class="form-login__password">
                <label for="">Contraseña</label>
                <input type="password" name="password" id="password" placeholder="Ingrese su contraseña">
            </div>
            <div class="form-login__btn">
                <button type="submit" name="btn" class="form-login__btn--modif">INICIAR SESION</button>
            </div>
        </form>
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