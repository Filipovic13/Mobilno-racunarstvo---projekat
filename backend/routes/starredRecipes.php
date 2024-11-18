<?php
//routes/StarredRecipes.php

require '../header/cors.php';

require '../middleware/auth.php'; // Middleware for authentication checks
require_once '../models/StarredRecipe.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Handle GET request to retrieve all starred recipes
    $response = StarredRecipe::getAllStarred();
    echo json_encode($response);
} elseif ($method === 'POST') {
    // Handle POST request for starring/un-starring recipes
    $data = json_decode(file_get_contents("php://input"), true); // Decode JSON input
    file_put_contents("output.log", "Action: " . $data['action'] . PHP_EOL . "Id: " . $data['recipe_id'] . PHP_EOL, FILE_APPEND);

    // Check if action is set and handle accordingly
    if (isset($data['action']) && $data['action'] === 'star' && isset($data['recipe_id'])) {
        $recipeId = $data['recipe_id'];
        $response = StarredRecipe::star($recipeId);
        echo json_encode($response);
    } else {
        // Handle missing action
        echo json_encode(['success' => false, 'message' => 'Invalid action parameter.']);
    }
} else if ($method === 'DELETE') {

    $action = $_GET['action'] ?? '';
    $recipeId = $_GET['id'] ?? '';

    if (isset($action) && $action === 'unstar' && isset($recipeId)) {
        $recipeId = $recipeId;
        $response = StarredRecipe::unstar($recipeId);
        echo json_encode($response);
    } else {
        // Missing parameters
        echo json_encode([
            "success" => false,
            "message" => "Invalid or missing parameters for deletion."
        ]);
    }
} else {
    // Handle unsupported request methods
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
