<?php
//routes/recipes.php

require '../header/cors.php';

require '../middleware/auth.php'; // Middleware for authentication checks
require_once '../models/Recipe.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Check for specific action in query parameters
    $action = $_GET['action'] ?? '';

    if ($action === 'get_my_recipes') {
        $userId = $_SESSION['user_id']; // Get user ID from session
        $response = Recipe::getRecipesByUser($userId);
        echo json_encode($response);
    } else if ($action === 'get_all') {
        $response = Recipe::getAll();
        echo json_encode($response);
    } else if ($action === 'get_by_id') {
        $recipeId = $_GET['id'];
        $response = Recipe::getById($recipeId);
        echo json_encode($response);
    }
} elseif ($method === 'POST') {
    // Handle POST requests
    $data = json_decode(file_get_contents("php://input"), true); // Decode JSON input

    // Check if action is 'create'
    if (isset($data['action']) && $data['action'] === 'create') {
        $userId = $_SESSION['user_id']; // Get user ID from session
        $recipeName = $data['recipe_name'];
        $numOfIngredients = $data['num_of_ingredients'];
        $numOfServings = $data['num_of_servings'];
        $numOfCalories = $data['num_of_calories'];
        $details = $data['details'];
        $imageUrl = $data['image_url'];

        // Call the controller to create the recipe
        $response = Recipe::create($userId, $recipeName, $numOfIngredients, $numOfServings, $numOfCalories, $details, $imageUrl);
        echo json_encode($response);
    } else {
        // Invalid action
        echo json_encode([
            "success" => false,
            "message" => "Invalid action parameter."
        ]);
    }
} elseif ($method === 'DELETE') {

    $action = $_GET['action'] ?? '';
    $recipeId = $_GET['id'] ?? '';

    // Log to verify the values
    //file_put_contents("output.log", "Action: " . $action . PHP_EOL . "Id: " . $recipeId . PHP_EOL, FILE_APPEND);

    if ($action === 'delete' && isset($recipeId)) {
        $response = Recipe::delete($recipeId);
        echo json_encode($response);
    } else {
        // Missing parameters
        echo json_encode([
            "success" => false,
            "message" => "Invalid or missing parameters for deletion."
        ]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    // Invalid request method
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
