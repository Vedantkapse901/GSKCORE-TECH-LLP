<?php
// Copy this file to config.php and fill in your real values.
// config.php is gitignored — never commit real credentials.

// --- Database (from cPanel > MySQL Databases) ---
define('DB_HOST', 'localhost');
define('DB_NAME', 'cpaneluser_gskcore');   // cPanel prefixes db names with your username
define('DB_USER', 'cpaneluser_dbuser');
define('DB_PASS', 'REPLACE_ME');

// --- CORS: the exact origin(s) your Next.js site is served from ---
// No trailing slash. Add more entries if you test from multiple origins.
define('ALLOWED_ORIGINS', [
  'https://www.gskcoretech.com',
  'https://gskcoretech.com',
  'http://localhost:3000', // remove in production if you want
]);

// --- Where uploaded logos are publicly reachable ---
define('UPLOADS_URL', 'https://api.gskcoretech.com/uploads');
define('UPLOADS_DIR', __DIR__ . '/uploads');

// --- Contact form notifications ---
// Where new enquiries get emailed.
define('NOTIFY_EMAIL', 'gskcoretech@gmail.com');

// --- SMTP (sends via a real mailbox so Gmail doesn't reject it as
// unauthenticated — PHP's bare mail() function fails this on most hosts) ---
define('SMTP_HOST', 'localhost'); // try 'mail.gskcoretech.com' if localhost doesn't work
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls'); // 'tls' for port 587, 'ssl' for port 465
define('SMTP_USER', 'noreply@gskcoretech.com'); // the mailbox you created
define('SMTP_PASS', 'REPLACE_ME'); // that mailbox's password
