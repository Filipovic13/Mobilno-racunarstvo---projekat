<?php
// middleware/sessionInit.php

function startSession()
{
    // Set secure session attributes
    // ini_set('session.cookie_samesite', 'None'); // Allow cross-site cookies
    // ini_set('session.cookie_secure', false);    // Set to true if using HTTPS, false for localhost (HTTP)

    // Start session only if not already started
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
}
