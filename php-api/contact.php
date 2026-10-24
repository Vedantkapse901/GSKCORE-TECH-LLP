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

// Best-effort email notification — the submission is already safely stored
// in the database above, so a mail failure here must never fail the request.
if (defined('NOTIFY_EMAIL') && NOTIFY_EMAIL) {
  // Strip anything that could be used for header injection via crafted input.
  $clean = fn($s) => str_replace(["\r", "\n"], ' ', $s);

  $mailSubject = 'New website enquiry: ' . $clean($subject ?: $name);
  $body = "You have a new enquiry from the GSKCORE TECH website.\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n"
    . "Subject: " . ($subject ?: '(none)') . "\n\n"
    . "Message:\n{$message}\n";

  $fromAddress = defined('NOTIFY_FROM') && NOTIFY_FROM ? NOTIFY_FROM : NOTIFY_EMAIL;
  $headers = "From: GSKCORE TECH Website <{$fromAddress}>\r\n"
    . "Reply-To: {$clean($name)} <{$email}>\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n";

  @mail(NOTIFY_EMAIL, $mailSubject, $body, $headers);
}

json_out(['ok' => true], 201);
