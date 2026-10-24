<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_out(['error' => 'Method not allowed'], 405);
}

$body = json_body();
$username = trim($body['username'] ?? '');
$password = $body['password'] ?? '';

if ($username === '' || $password === '') {
  json_out(['error' => 'Username and password are required'], 400);
}

$stmt = get_db()->prepare('SELECT id, password_hash FROM admin_users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
  // Deliberately generic message — don't reveal whether the username exists.
  json_out(['error' => 'Invalid username or password'], 401);
}

start_admin_session();
session_regenerate_id(true);
$_SESSION['admin_id'] = $user['id'];

json_out(['ok' => true]);
