<?php require_once '../controller/auth.php'; ?>
<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="/public/assets/img/UNI.png">
	<!-- Estilos CSS -->
	<link rel="stylesheet" href="/public/assets/css/estilos.css">
	<link rel="stylesheet" href="/public/assets/css/menu.css">
	<link rel="stylesheet" href="/public/assets/css/contenido.css">

	<!-- Fonts Google -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=Montserrat:ital,wght@0,100;0,400;0,800;1,300&family=Poppins:wght@500&family=Roboto:wght@500&family=Source+Code+Pro:wght@200&family=Source+Sans+3:ital,wght@0,400;1,800&display=swap" rel="stylesheet">
	<title>UNI | EARPFI</title>
</head>

<body>
	<!-- Inico del menu de la aplicacion web -->
	<div class="website">
		<div class="container-menu">
			<div class="menu" id="menu">
				<div class="header-menu">
					<a href="/index.php"><img src="/public/assets/img/UNI.png" alt="Uni"></a>
					<div class="title-menu-h">
						<label>UNI EARPFIM</label>
						<label>ADMINISTRADOR</label>
					</div>
				</div>
				<div class="links-menu">
					<div class="menu-left">
						<ul>
							<li>
								<div class="content-menu">
									<div class="general" id="sec-general">
										<div class="one">
											<img src="/public/assets/img/briefcase-solid.svg" alt="general">
											<p>General</p>
										</div>
										<div class="two">
											<img id="img-two-general" class="img activo"
												src="/public/assets/img/angle-down-solid.svg" alt="angle">
										</div>
									</div>
									<div class="content-general" id="c-general">
										<ul>
											<li><a href="#" onclick="mostrarHorario()"><img src="/public/assets/img/pen-solid.svg" alt="M.H.C">Administración Horario</a></li>
										</ul>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		
		<div class="conteiner-contenido">
			<header class="header" id="header">
				<div class="one">
					<div class="abrir-menu" id="abrir-menu">
						<span class="line-one"></span>
						<span class="line-two"></span>
						<span class="line-three"></span>
					</div>
					<div class="cerrar-menu" id="cerrar-menu">
						<span class="line-one"></span>
						<span class="line-two"></span>
						<span class="line-three"></span>
					</div>
					<div class="name">
						<label><?= htmlspecialchars($_SESSION['nombre'] ?? 'Usuario') ?></label>
					</div>
				</div>
				<div class="settings">
					<a href="../controller/logout.php" class="btn-logout" title="Cerrar sesión">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
						<span>Cerrar sesión</span>
					</a>
				</div>
			</header>

			<!-- ------------------------- -->
			<div class="contenido" id="contenido">
				<h1>BIENVENIDO AL EARPFIM <br> <span>ZONA ADMINISTRADOR</span></h1>
				<img src="/public/assets/img/tuerca.gif" alt="tuerca">
			</div>
		</div>
	</div>

	<!-- Contenido de la página de asistencia (inicialmente oculto) -->
	<div id="horario-page" style="display: none">
		<iframe src="./horario.html" width="100%" height="1050px"></iframe>
	</div>

	<script src="/public/assets/js/usuario.js"></script>
</body>

</html>