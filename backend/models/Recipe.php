<?php
//models/Recipe.php

require_once '../config/database.php';

class Recipe
{
    private $id;
    private $user_id;
    private $recipe_name;
    private $num_of_ingredients;
    private $num_of_servings;
    private $num_of_cal;
    private $details;
    private $image_url;

    public function __construct($id = null, $user_id = null, $recipe_name = null, $num_of_ingredients = null, $num_of_servings = null, $num_of_cal = null, $details = null, $image_url = null)
    {
        $this->id = $id;
        $this->user_id = $user_id;
        $this->recipe_name = $recipe_name;
        $this->num_of_ingredients = $num_of_ingredients;
        $this->num_of_servings = $num_of_servings;
        $this->num_of_cal = $num_of_cal;
        $this->details = $details;
        $this->image_url = $image_url;
    }


    public static function getAll()
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query("SELECT * FROM recipes");
        return $stmt->fetchAll();
    }

    public static function getById($id)
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetchAll();
    }

    public static function getRecipesByUser($userId)
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE user_id = ?");
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public static function create($userId, $recipeName, $numOfIngredients, $numOfServings, $numOfCalories, $details, $imageUrl)
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare("INSERT INTO recipes (user_id, recipe_name, num_of_ingredients, num_of_servings, num_of_cal, details, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)");
        if ($stmt->execute([$userId, $recipeName, $numOfIngredients, $numOfServings, $numOfCalories, $details, $imageUrl])) {
            return ['success' => true, 'message' => 'Recipe created successfully'];
        } else {
            return ['success' => false, 'message' => 'Problem occured while adding new recipe'];
        }
    }

    public static function delete($id)
    {

        $pdo = Database::getInstance();;
        $stmt = $pdo->prepare("DELETE FROM recipes WHERE id = ?");
        if ($stmt->execute([$id])) {
            return ['success' => true, 'message' => 'Recipe deleted successfully'];
        } else {
            return ['success' => false, 'message' => 'Failed to delete recipe'];
        }
    }
}
