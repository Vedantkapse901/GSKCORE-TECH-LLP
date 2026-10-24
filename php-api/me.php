<?php
require_once __DIR__ . '/auth.php';

json_out(['loggedIn' => is_admin_logged_in()]);
