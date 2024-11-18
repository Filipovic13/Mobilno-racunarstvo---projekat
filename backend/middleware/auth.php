<?php
// middleware/auth.php

require_once 'sessionInit.php'; // Ensure session is started here
startSession(); // Start session once here

// Debugging output to verify session
//file_put_contents("output.log", "middleware/auth.php: session user_id = " . ($_SESSION['user_id'] ?? 'Not Set') . PHP_EOL, FILE_APPEND);

// Authorization check
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}
