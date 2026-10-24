<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int) $_GET['id'] : null;

if ($method === 'GET') {
  $rows = $db->query('SELECT * FROM services ORDER BY created_at ASC')->fetchAll();
  json_out($rows);
}

if ($method === 'POST') {
  require_admin();
  $b = json_body();
  $name = trim($b['name'] ?? '');
  $description = trim($b['description'] ?? '');
  if ($name === '' || $description === '') {
    json_out(['error' => 'name and description are required'], 400);
  }

  $stmt = $db->prepare('INSERT INTO services (name, title, description, icon) VALUES (?, ?, ?, ?)');
  $stmt->execute([$name, $b['title'] ?? null, $description, $b['icon'] ?? null]);
  json_out(['ok' => true, 'id' => $db->lastInsertId()], 201);
}

if ($method === 'DELETE') {
  require_admin();
  if (!$id) json_out(['error' => 'id is required'], 400);
  $db->prepare('DELETE FROM services WHERE id = ?')->execute([$id]);
  json_out(['ok' => true]);
}

json_out(['error' => 'Method not allowed'], 405);
