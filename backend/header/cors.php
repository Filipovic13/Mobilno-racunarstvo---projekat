<?php
//header/cors.php

// Set CORS headers
header('Access-Control-Allow-Origin: http://localhost:8100'); // Your Angular app's origin
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Content-Type: application/json");


// Handle preflight requests (for CORS)
if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    die();
}
