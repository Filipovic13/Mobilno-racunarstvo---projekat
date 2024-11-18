<?php
//models/StarredRecipe.php
require_once '../config/database.php';

class StarredRecipe
{
    public $user_id;
    public $recipe_id;

    public function __construct($user_id = null, $recipe_id = null)
    {
        $this->user_id = $user_id;
        $this->recipe_id = $recipe_id;
    }

    public static function getAllStarred()
    {
        $pdo = Database::getInstance();
        $userId = $_SESSION['user_id'];

        // Step 1: Get all recipe_ids associated with the user_id from starred_recipes
        $stmt = $pdo->prepare("SELECT recipe_id FROM starred_recipes WHERE user_id = ?");
        $stmt->execute([$userId]);
        $recipeIds = $stmt->fetchAll(PDO::FETCH_COLUMN); // Fetch only the recipe_id column

        // Step 2: If there are no starred recipes, return an empty array
        if (empty($recipeIds)) {
            return []; // No starred recipes found
        }

        // Step 3: Prepare a SQL statement to fetch all recipe data based on the recipe_ids
        // Use placeholders for the IN clause
        $placeholders = rtrim(str_repeat('?,', count($recipeIds)), ',');
        $query = "SELECT * FROM recipes WHERE id IN ($placeholders)"; // Adjust the field name based on your actual recipe ID field

        // Step 4: Prepare and execute the statement to get recipe data
        $stmt = $pdo->prepare($query);
        $stmt->execute($recipeIds);

        // Step 5: Fetch and return all the recipe data
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public static function star($recipeId)
    {
        $pdo = Database::getInstance();
        $userId = $_SESSION['user_id'];
        $stmt = $pdo->prepare("INSERT INTO starred_recipes (user_id, recipe_id) VALUES (?, ?)");
        if ($stmt->execute([$userId, $recipeId])) {
            return ['success' => true, 'message' => 'Recipe starred successfully'];
        } else {
            return ['success' => false, 'message' => 'Failed to star the recipe'];
        }
    }

    public static function unstar($recipeId)
    {
        $pdo = Database::getInstance();
        $userId = $_SESSION['user_id'];
        $stmt = $pdo->prepare("DELETE FROM starred_recipes WHERE user_id = ? AND recipe_id = ?");
        if ($stmt->execute([$userId, $recipeId])) {
            return ['success' => true, 'message' => 'Recipe unstarred successfully'];
        } else {
            return ['success' => false, 'message' => 'Failed to unstar the recipe'];
        }
    }
}
