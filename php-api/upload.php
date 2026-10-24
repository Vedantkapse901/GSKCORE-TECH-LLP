<?php
require_once __DIR__ . '/auth.php';

require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_out(['error' => 'Method not allowed'], 405);
}

if (empty($_FILES['logo']) || $_FILES['logo']['error'] !== UPLOAD_ERR_OK) {
  json_out(['error' => 'No valid file uploaded'], 400);
}

$file = $_FILES['logo'];
$maxBytes = 2 * 1024 * 1024; // 2MB
if ($file['size'] > $maxBytes) {
  json_out(['error' => 'File too large (max 2MB)'], 400);
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$allowed = ['image/png' => 'png', 'image/jpeg' => 'jpg', 'image/webp' => 'webp', 'image/svg+xml' => 'svg'];
if (!isset($allowed[$mime])) {
  json_out(['error' => 'Only PNG, JPG, WEBP, or SVG images are allowed'], 400);
}

if (!is_dir(UPLOADS_DIR)) {
  mkdir(UPLOADS_DIR, 0755, true);
}

$filename = bin2hex(random_bytes(16)) . '.' . $allowed[$mime];
$destination = UPLOADS_DIR . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
  json_out(['error' => 'Failed to save file'], 500);
}

json_out(['ok' => true, 'url' => UPLOADS_URL . '/' . $filename]);
