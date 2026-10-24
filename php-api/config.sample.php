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
