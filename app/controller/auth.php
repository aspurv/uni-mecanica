<?php
/**
 * auth.php — Session guard
 * Include this at the top of every protected view.
 * Redirects unauthenticated requests to the login page.
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['usuario_id'])) {
    header('Location: /index.php');
    exit;
}
