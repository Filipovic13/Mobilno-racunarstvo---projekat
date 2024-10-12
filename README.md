# Cookbook Ionic Application

## Overview

The **Cookbook Ionic Application** is a recipe management application built using the Ionic framework and Angular. It enables users to log in or register, view a collection of recipes, mark their favorite recipes, and contribute by posting their own recipes.

## Features

- **User Authentication**: Users can register for a new account or log in to access their personalized features.
- **Recipe Management**: Users can view all available recipes, star their favorite recipes for easy access, and post their own recipes.
- **Firebase Integration**: All user data and recipes are stored and managed in Firebase, allowing for real-time updates and secure data management.

## Technologies Used

- Angular
- Ionic Framework
- Firebase (for backend services)
- TypeScript
- RxJS

## Workflow

1. **User Registration/Login**:

   - Users can create an account or log in using their credentials.
   - Upon successful authentication, users gain access to their profile and additional features.

2. **Viewing Recipes**:

   - Users can browse a list of recipes displayed on the home page.
   - Each recipe includes details such as ingredients, instructions, and options to star (favorite) them.

3. **Starring Recipes**:

   - Users can mark recipes as favorites, which will be saved in their profile for easy access later.

4. **Posting Recipes**:

   - Users can add their own recipes to the app by filling out a form with the recipe details.
   - New recipes will be stored in the Firebase database and displayed on the home page.

## Project Structure

The project is organized into several key components and modules, each serving a specific purpose:

- **app**: Contains the main application module and routing configuration.
- **auth**: Manages user authentication, including login and registration components.
- **home**: Displays the home page with a list of recipes and user interactions.
- **cooking-history**: Page that displays a brief history of cooking.

### Key Components and Modules

1. **AppModule (`app.module.ts`)**: The root module that bootstraps the application and configures global providers, including the routing setup and HTTP client.

2. **AppRoutingModule (`app-routing.module.ts`)**: Defines the application routes and sets up lazy loading for feature modules. Uses guards to protect routes that require user authentication.

3. **AuthGuard (`auth.guard.ts`)**: A route guard that prevents access to certain routes for unauthenticated users.

4. **AuthService (`auth.service.ts`)**: Handles authentication logic, including login, registration, and logout functionality, utilizing Firebase for user management.

5. **Firebase Configuration**: Firebase is initialized and configured to handle data storage, user authentication, and real-time updates.

### How Angular Works

Angular is a platform and framework for building client-side applications using HTML and TypeScript. The key concepts include:

- **Components**: Angular applications are built using components, which are self-contained units of code that control a view (a part of the user interface). Each component consists of:

  - A TypeScript class that defines the behavior.
  - An HTML template that defines the view.
  - A CSS stylesheet for styling.

- **Modules**: Angular applications are modular, allowing you to organize components into cohesive blocks of functionality. Each Angular app has at least one root module (`AppModule`).

- **Services**: Services are used to encapsulate business logic and data operations. They are typically used for tasks like data fetching, authentication, or shared functionality across components.

- **Routing**: Angular's router enables navigation between different views or components. Routes are defined in the `AppRoutingModule`, and components are loaded lazily for performance optimization.

## Firebase Integration

Firebase is a Backend-as-a-Service (BaaS) platform that provides various services, including real-time databases, authentication, and hosting.

### Setting Up Firebase

To set up Firebase for this application, follow these steps:

1. **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Enable Authentication**: Navigate to the "Authentication" section and enable the desired sign-in methods (e.g., Email/Password).
3. **Create Firestore Database**: Go to the "Firestore Database" section and create a database to store recipes and user data.
4. **Configure Firebase in the App**:
   - Install Firebase SDK:
     ```bash
     npm install firebase @angular/fire
     ```
   - Set up Firebase configuration in your Angular application.

## Installation Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14 or higher). If you don't have it installed, download it from [Node.js Official Website](https://nodejs.org/).

- Check your version with:

  ```
  node -v
  ```

- Angular CLI (installed globally)
  Ionic CLI: Install the Ionic CLI globally using npm:
  `  npm install -g @ionic/cli`

### Setting Up the Project

```
git clone https://github.com/Filipovic13/Mobilno-racunarstvo-projekat
```

### Set Up Firebase:

Create a Firebase project and set up authentication and Firestore as described above.
Add your Firebase configuration details in the appropriate Angular service or environment files.

### Start the Ionic development server:

```
ionic serve
```

Open in Browser: Access your application in the web browser `at http://localhost:8100`.
