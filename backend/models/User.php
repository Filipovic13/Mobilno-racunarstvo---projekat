<?php
//models/User.php
require_once '../config/database.php';
require_once '../middleware/sessionInit.php';

class User
{
    private $id;
    private $username;
    private $email;
    private $password;

    public function __construct($id = null, $username = null, $email = null, $password = null)
    {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public static function register($username, $email, $password)
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $email]);
        $existingUser = $stmt->fetch();

        if ($existingUser) {
            return ['success' => false, 'message' => 'Email or username is already taken.'];
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashedPassword]);

        return ['success' => true, 'message' => 'Registration successful'];
    }

    public static function login($email, $password)
    {

        $pdo = Database::getInstance();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            // Set the session variable for user ID
            startSession();
            $_SESSION['user_id'] = $user['id']; // Set session here
            //file_put_contents("output.log", "models/User.php .... posle login: " . $_SESSION['user_id'] . PHP_EOL, FILE_APPEND);

            return ['success' => true, 'message' => 'Login successful', 'user_id' => $user['id'], 'username' => $user['username'], 'email' => $user['email']];
        } else if (!$user) {
            return ['success' => false, 'message' => 'Invalid email'];
        } else {
            return ['success' => false, 'message' => 'Invalid password'];
        }
    }

    public static function logout()
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            $_SESSION = []; // Clear session variables
            session_unset();
            session_destroy(); // Destroy the session
        }

        return ['success' => true, 'message' => 'Logout successful'];
    }


    public static function findById($id)
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $user = $stmt->fetch();
        return $user ? new User($user['id'], $user['username'], $user['email']) : null;
    }

    public static function findByEmail($email)
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(); // Fetch the user details
    }
}
