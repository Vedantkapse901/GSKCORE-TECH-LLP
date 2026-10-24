<?php
require_once __DIR__ . '/cors.php';

function start_admin_session(): void {
  if (session_status() === PHP_SESSION_ACTIVE) return;

  // Cross-site cookie (api.* vs the main domain) needs SameSite=None + Secure,
  // which requires HTTPS on both sides.
  session_set_cookie_params([
    'lifetime' => 60 * 60 * 24 * 7, // 7 days
    'path' => '/',
    'domain' => '',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None',
  ]);
  session_start();
}

function is_admin_logged_in(): bool {
  start_admin_session();
  return !empty($_SESSION['admin_id']);
}

function require_admin(): void {
  if (!is_admin_logged_in()) {
    json_out(['error' => 'Unauthorized'], 401);
  }
}
