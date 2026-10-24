<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int) $_GET['id'] : null;

if ($method === 'GET') {
  $rows = $db->query('SELECT * FROM projects ORDER BY created_at DESC')->fetchAll();
  json_out($rows);
}

if ($method === 'POST') {
  require_admin();
  $b = json_body();
  foreach (['company_name', 'name', 'category', 'description', 'website_url'] as $field) {
    if (trim($b[$field] ?? '') === '') json_out(['error' => "$field is required"], 400);
  }

  $stmt = $db->prepare(
    'INSERT INTO projects (company_name, name, category, description, status, website_url, logo_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  $stmt->execute([
    $b['company_name'], $b['name'], $b['category'], $b['description'],
    $b['status'] ?? 'Completed', $b['website_url'], $b['logo_url'] ?? null,
  ]);
  json_out(['ok' => true, 'id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT') {
  require_admin();
  if (!$id) json_out(['error' => 'id is required'], 400);
  $b = json_body();

  $stmt = $db->prepare(
    'UPDATE projects SET company_name=?, name=?, category=?, description=?, status=?, website_url=?, logo_url=?
     WHERE id=?'
  );
  $stmt->execute([
    $b['company_name'], $b['name'], $b['category'], $b['description'],
    $b['status'] ?? 'Completed', $b['website_url'], $b['logo_url'] ?? null, $id,
  ]);
  json_out(['ok' => true]);
}

if ($method === 'DELETE') {
  require_admin();
  if (!$id) json_out(['error' => 'id is required'], 400);
  $db->prepare('DELETE FROM projects WHERE id = ?')->execute([$id]);
  json_out(['ok' => true]);
}

json_out(['error' => 'Method not allowed'], 405);
