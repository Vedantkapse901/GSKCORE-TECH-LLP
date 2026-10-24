<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/lib/PHPMailer/Exception.php';
require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

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
if (defined('NOTIFY_EMAIL') && NOTIFY_EMAIL && defined('SMTP_USER') && SMTP_USER) {
  try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->Port = SMTP_PORT;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER;
    $mail->Password = SMTP_PASS;
    $mail->SMTPSecure = SMTP_SECURE === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;

    $mail->setFrom(SMTP_USER, 'GSKCORE TECH Website');
    $mail->addAddress(NOTIFY_EMAIL);
    $mail->addReplyTo($email, $name);

    $mail->Subject = 'New website enquiry: ' . ($subject ?: $name);
    $mail->Body = "You have a new enquiry from the GSKCORE TECH website.\n\n"
      . "Name: {$name}\n"
      . "Email: {$email}\n"
      . "Subject: " . ($subject ?: '(none)') . "\n\n"
      . "Message:\n{$message}\n";

    $mail->send();
  } catch (PHPMailerException $e) {
    error_log('contact.php: PHPMailer failed — ' . $e->getMessage());
  }
}

json_out(['ok' => true], 201);
