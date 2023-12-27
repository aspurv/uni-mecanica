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
	<?php
	include ("conexion.php");
	?>
	<!-- Inico del menu de la aplicacion web -->
	<div class="website">
		<div class="container-menu">
			<div class="menu" id="menu">
				<div class="header-menu">
					<a href="index.html"><img src="/public/assets/img/UNI.png" alt="Uni"></a>
					<div class="title-menu-h">
						<label>UNI EARPFIM</label>
						<label>DOCENTE</label>
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
											<li><a href="horarioDC.html" onclick="mostrarHorario(mostrarSeccionPrincipal())"><img src="/public/assets/img/pen-solid.svg" alt="M.H.C">Administración Horario</a></li>
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
						<label>Obregon Ramos, Maximo</label>
					</div>
				</div>
				<div class="settings" onclick="sidebarToggle()">
					<img src="/public/assets/img/tres-puntos.png" alt="settings">
				</div>
			</header>

			<!-- ------------------------- -->
			<div class="contenido" id="contenido">
				<h1>BIENVENIDO AL EARPFIM <br> <span>ZONA USUARIO</span></h1>
				<img src="/public/assets/img/tuerca.gif" alt="tuerca">
			</div>
		</div>
	</div>


	<script src="/public/assets/js/index.js"></script>
</body>

</html>