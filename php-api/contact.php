<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_out(['error' => 'Method not allowed'], 405);
}

$b = json_body();
$name = trim($b['name'] ?? '');
$email = trim($b['email'] ?? '');
$subject = trim($b['subject'] ?? '');
$message = trim($b['message'] ?? '');

if ($name === '' || $message === '') {
  json_out(['error' => 'name and message are required'], 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_out(['error' => 'A valid email is required'], 400);
}

$stmt = get_db()->prepare(
  'INSERT INTO contact_submissions (name, email, subject, message) VALUES (?, ?, ?, ?)'
);
$stmt->execute([$name, $email, $subject ?: null, $message]);

json_out(['ok' => true], 201);
