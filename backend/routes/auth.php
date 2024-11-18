<?php
//routes/auth.php
require '../header/cors.php';

require_once '../models/User.php';

// Determine the request method (GET, POST, etc.)
$method = $_SERVER['REQUEST_METHOD'];

// Check if the request is a POST and process JSON input
if ($method === 'POST') {
    // Read JSON input
    $data = json_decode(file_get_contents("php://input"), true); // Decode JSON into an associative array
    //file_put_contents("output.log", "Data received: " . json_encode($data) . PHP_EOL, FILE_APPEND);

    // Check if the 'action' parameter is set
    if (isset($data['action'])) {
        // Handle login action
        if ($data['action'] === 'login') {
            $email = $data['email']; // Get the email from JSON data
            $password = $data['password']; // Get the password from JSON data
            $response = User::login($email, $password); // Call the login method
            echo json_encode($response); // Return the response as JSON

            // Handle register action
        } elseif ($data['action'] === 'register') {
            $username = $data['username']; // Get the username from JSON data
            $email = $data['email']; // Get the email from JSON data
            $password = $data['password']; // Get the password from JSON data
            $response = User::register($username, $email, $password); // Call the register method
            echo json_encode($response); // Return the response as JSON

            // Handle logout action
        } elseif ($data['action'] === 'logout') {
            $response = User::logout(); // Call the logout method
            echo json_encode($response); // Return the response as JSON
        } else {
            // Invalid action
            echo json_encode([
                "success" => false,
                "message" => "Invalid action."
            ]);
        }
    } else {
        // Missing action parameter
        echo json_encode([
            "success" => false,
            "message" => "Invalid action parameter."
        ]);
    }
} else {

    http_response_code(405); // Method Not Allowed
    // Invalid request method
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
