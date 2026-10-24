<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $rows = $db->query('SELECT * FROM categories ORDER BY name ASC')->fetchAll();
  json_out($rows);
}

if ($method === 'POST') {
  require_admin();
  $body = json_body();
  $name = trim($body['name'] ?? '');
  if ($name === '') json_out(['error' => 'name is required'], 400);

  $stmt = $db->prepare('INSERT IGNORE INTO categories (name) VALUES (?)');
  $stmt->execute([$name]);
  json_out(['ok' => true], 201);
}

json_out(['error' => 'Method not allowed'], 405);
