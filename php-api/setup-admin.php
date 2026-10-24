<?php
// One-time setup page: creates the first admin account.
// Visit this file once in your browser, create your account, then DELETE
// this file from the server — it refuses to run once an admin exists, but
// there's no reason to leave it reachable.

require_once __DIR__ . '/db.php';

$db = get_db();
$count = (int) $db->query('SELECT COUNT(*) AS c FROM admin_users')->fetch()['c'];

$message = '';
$done = false;

if ($count > 0) {
  $message = 'An admin account already exists. Delete this file — it will not create another one.';
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = trim($_POST['username'] ?? '');
  $password = $_POST['password'] ?? '';

  if ($username === '' || strlen($password) < 8) {
    $message = 'Username is required and password must be at least 8 characters.';
  } else {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $db->prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)');
    $stmt->execute([$username, $hash]);
    $done = true;
    $message = 'Admin account created. Delete this file now, then log in from /admin.';
  }
}
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Admin Setup</title></head>
<body style="font-family: sans-serif; max-width: 420px; margin: 60px auto;">
  <h1>Create admin account</h1>
  <?php if ($message): ?>
    <p style="padding: 12px; background: <?= $done ? '#d4edda' : '#f8d7da' ?>;">
      <?= htmlspecialchars($message) ?>
    </p>
  <?php endif; ?>
  <?php if (!$done && $count === 0): ?>
    <form method="post">
      <p><label>Username<br><input type="text" name="username" required style="width:100%"></label></p>
      <p><label>Password (min 8 chars)<br><input type="password" name="password" required minlength="8" style="width:100%"></label></p>
      <button type="submit">Create account</button>
    </form>
  <?php endif; ?>
</body>
</html>
