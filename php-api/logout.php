<?php
require_once __DIR__ . '/auth.php';

start_admin_session();
$_SESSION = [];
session_destroy();

json_out(['ok' => true]);
