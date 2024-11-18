/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, take, tap, catchError, filter } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from './recipe.model';
import { StarredRecipeService } from './stared/starred-recipes.service';

interface RecipeData {
  id: number;
  user_id: number;
  recipe_name: string;
  num_of_ingredients: number;
  num_of_servings: number;
  num_of_cal: number;
  details: string;
  image_url: string;
}
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  private myRecipesSubject = new BehaviorSubject<Recipe[]>([]);
  private apiUrl =
    'http://localhost/backend_mobilno_racunarstvo/routes/recipes.php';

  // Common header options for JSON content
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private starredRecipeService: StarredRecipeService
  ) {}

  get recipes$() {
    return this.recipesSubject.asObservable();
  }

  get myRecipes$() {
    return this.myRecipesSubject.asObservable();
  }

  // Centralized error handler
  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError('An error occurred; please try again later.');
  }

  // Fetch all recipes (GET with params)
  getAllRecipes(): Observable<Recipe[]> {
    const params = new HttpParams().set('action', 'get_all'); // Query parameter for the action

    return this.http
      .get<{ [key: string]: RecipeData }>(this.apiUrl, {
        params,
        withCredentials: true,
      })
      .pipe(
        map((recipesData) =>
          Object.values(recipesData).map(
            (data) =>
              new Recipe(
                data.id,
                data.user_id,
                data.recipe_name,
                data.num_of_ingredients,
                data.num_of_servings,
                data.num_of_cal,
                data.details,
                data.image_url
              )
          )
        ),
        tap((recipes) => this.recipesSubject.next(recipes)),
        catchError(this.handleError)
      );
  }

  // Fetch user-specific recipes (GET with params)
  getMyRecipes(): Observable<Recipe[]> {
    const params = new HttpParams().set('action', 'get_my_recipes'); // Query parameter for the action

    return this.http
      .get<{ [key: string]: RecipeData }>(this.apiUrl, {
        params,
        withCredentials: true,
      })
      .pipe(
        map((recipesData) => {
          if (!recipesData) return [];
          return Object.values(recipesData).map(
            (data) =>
              new Recipe(
                data.id,
                data.user_id,
                data.recipe_name,
                data.num_of_ingredients,
                data.num_of_servings,
                data.num_of_cal,
                data.details,
                data.image_url
              )
          );
        }),
        tap((recipes) => this.myRecipesSubject.next(recipes)),
        catchError(this.handleError)
      );
  }

  // Add a new recipe (POST with body)
  addRecipe(recipe: Recipe): Observable<any> {
    const requestBody = {
      action: 'create', // Specifying the action in the body
      id: recipe.id,
      user_id: recipe.userId,
      recipe_name: recipe.recipeName,
      num_of_ingredients: recipe.numOfIngredients,
      num_of_servings: recipe.numOfServings,
      num_of_calories: recipe.numOfCal,
      details: recipe.details,
      image_url: recipe.imageUrl,
    };

    return this.http
      .post<{ success: boolean; message: string }>(this.apiUrl, requestBody, {
        headers: this.headers, // JSON headers
        withCredentials: true,
      })
      .pipe(
        switchMap(() => {
          // Refresh all recipes after adding a new one
          return forkJoin([this.getAllRecipes(), this.getMyRecipes()]); // Add both getAllRecipes() and getMyRecipes() here
        }),
        tap(([allRecipes, myRecipes]) => {
          this.recipesSubject.next(allRecipes); // Update all recipes list
          this.myRecipesSubject.next(myRecipes); // Update the user's recipes list (Profile page)
        }),
        catchError(this.handleError)
      );
  }

  // Fetch recipe by ID (GET with params)
  // Fetch recipe by ID (GET with params)
  getRecipeById(recipeId: number): Observable<Recipe> {
    const params = new HttpParams()
      .set('action', 'get_by_id')
      .set('id', recipeId.toString()); // Send recipe ID as query param

    return this.http
      .get<RecipeData | RecipeData[]>(this.apiUrl, {
        params,
        withCredentials: true,
      })
      .pipe(
        map((data) => {
          // Check if `data` is an array and extract the first item if so
          const recipeData = Array.isArray(data) ? data[0] : data;
          console.log('Data fetched by id:', recipeData);

          // Return the Recipe object based on the retrieved data
          return new Recipe(
            recipeData.id,
            recipeData.user_id,
            recipeData.recipe_name,
            recipeData.num_of_ingredients,
            recipeData.num_of_servings,
            recipeData.num_of_cal,
            recipeData.details,
            recipeData.image_url
          );
        }),
        catchError(this.handleError)
      );
  }

  deleteRecipe(recipeId: number): Observable<void> {
    const params = new HttpParams()
      .set('action', 'delete')
      .set('id', recipeId.toString());

    return this.http
      .delete<void>(this.apiUrl, { params, withCredentials: true })
      .pipe(
        tap(() => {
          // Remove the deleted recipe from the recipesSubject
          const updatedRecipes = this.recipesSubject.value.filter(
            (recipe) => recipe.id !== recipeId
          );
          this.recipesSubject.next(updatedRecipes);
        }),
        // Refresh the starred recipes after deletion
        switchMap(() => this.starredRecipeService.refreshStarredRecipes()),
        catchError(this.handleError)
      );
  }

  // Delete a recipe by ID
  // deleteRecipe(id: string) {
  //   return this.http.delete(`${this.apiUrl}?id=${id}`).pipe(
  //     switchMap(() => this.recipes),
  //     take(1),
  //     tap((recipes) => {
  //       this.recipes$.next(recipes.filter((recipe) => recipe.id !== id));
  //     })
  //   );
  // }
  // private _recipes = new BehaviorSubject<Recipe[]>(null);
  // private _mine = new BehaviorSubject<Recipe[]>(null);
  // //event emmiter -> uvek cemo dobiti poslednje emitovanu vr, ne samo buduce promene
  // //aktivniji observable, jer mi pozivamo next emetodu
  // constructor(private http: HttpClient, private authService: AuthService) {}
  // get recipes() {
  //   return this._recipes.asObservable();
  // }

  // get mine() {
  //   return this._mine.asObservable();
  // }
  // // kada dodamo novu stvar na bazu, mi kao povratnu vr  donijamo kljuc za tu novu stvar koju smo doddali
  // // ali takodje zelimo da za povratnu vr dobijemo i tu novu vr sto smo dodali, pa zbog toga vracamo observable
  // addRecipeFB(
  //   recipeName: string,
  //   numOfIngredients: number,
  //   numOfServings: number,
  //   numOfCal: number,
  //   details: string,
  //   imageUrl: string
  // ) {
  //   let generatedId;
  //   let newRecipe: Recipe;
  //   let fetchedUserId: string;
  //   return this.authService.userId.pipe(
  //     take(1),
  //     switchMap((userId) => {
  //       fetchedUserId = userId;
  //       return this.authService.token;
  //     }),
  //     take(1),
  //     //razlika mapa i switchMapa; SwithMap vraca novi observable
  //     switchMap((token) => {
  //       newRecipe = new Recipe(
  //         null,
  //         recipeName,
  //         numOfIngredients,
  //         numOfServings,
  //         numOfCal,
  //         details,
  //         imageUrl,
  //         fetchedUserId
  //       );
  //       return this.http.post<{ name: string }>(
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth${token}`,
  //         newRecipe
  //       );
  //     }),
  //     take(1),
  //     switchMap((responseData) => {
  //       generatedId = responseData.name; //switchMap vrca novi Observable
  //       return this.recipes;
  //     }),
  //     take(1), //take = uzimamo jedan Observable (objekat)
  //     //tap = pristupamo toj vrednsoti
  //     //tap kad hocemo da vrsimo sporedne izmene
  //     // nema povratnu vr , ne vraca nista
  //     tap((recipes) => {
  //       newRecipe.userId = generatedId;
  //       this._recipes.next(recipes.concat(newRecipe));
  //     })
  //   );
  // }
  // getRecipesFB() {
  //   return this.authService.token.pipe(
  //     take(1),
  //     switchMap((token) =>
  //       this.http.get<{ [key: string]: RecipeData }>(
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=${token}`
  //       )
  //     ),
  //     map((recipesData) => {
  //       const recipes: Recipe[] = [];
  //       for (const key in recipesData) {
  //         if (recipesData.hasOwnProperty(key)) {
  //           recipes.push(
  //             new Recipe(
  //               key,
  //               recipesData[key].recipeName,
  //               recipesData[key].numOfIngredients,
  //               recipesData[key].numOfServings,
  //               recipesData[key].numOfCal,
  //               recipesData[key].details,
  //               recipesData[key].imageUrl,
  //               recipesData[key].userId
  //             )
  //           );
  //         }
  //       }
  //       return recipes;
  //     }),
  //     tap((recipes) => {
  //       this._recipes.next(recipes);
  //     })
  //   );
  // }
  // getRecipe(id: string) {
  //   //return this.recipes.find((r) => r.id === id);
  //   return this.authService.token.pipe(
  //     take(1),
  //     switchMap((token) =>
  //       this.http.get<RecipeData>(
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}.json?auth=${token}`
  //       )
  //     ),
  //     map((resData) => {
  //       console.log(resData);
  //       return new Recipe(
  //         id,
  //         resData.recipeName,
  //         resData.numOfIngredients,
  //         resData.numOfServings,
  //         resData.numOfCal,
  //         resData.details,
  //         resData.imageUrl,
  //         resData.userId
  //       );
  //     })
  //   );
  // }

  // getMineRecipes() {
  //   let loggedUser: string;
  //   return this.authService.userId.pipe(
  //     take(1),
  //     switchMap((userId) => {
  //       loggedUser = userId;
  //       return this.authService.token;
  //     }),
  //     take(1),
  //     switchMap((token) =>
  //       this.http.get<{ [key: string]: RecipeData }>(
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?&orderBy="userId"&equalTo="${loggedUser}"&auth=${token}`
  //       )
  //     ),
  //     map((recipesData) => {
  //       const mine: Recipe[] = [];
  //       for (const key in recipesData) {
  //         if (recipesData.hasOwnProperty(key)) {
  //           mine.push(
  //             new Recipe(
  //               key,
  //               recipesData[key].recipeName,
  //               recipesData[key].numOfIngredients,
  //               recipesData[key].numOfServings,
  //               recipesData[key].numOfCal,
  //               recipesData[key].details,
  //               recipesData[key].imageUrl,
  //               recipesData[key].userId
  //             )
  //           );
  //         }
  //       }
  //       return mine;
  //     }),
  //     tap((recipes) => {
  //       this._mine.next(recipes);
  //     })
  //   );
  // }
  // deleteMineRecipe(id: string) {
  //   return this.authService.token.pipe(
  //     take(1),
  //     switchMap((token) => {
  //       return this.http.delete(
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}.json?auth=${token}`
  //       );
  //     }),
  //     switchMap(() => {
  //       console.log('Usao u delete');
  //       return this.mine;
  //     }),
  //     take(1),
  //     tap((recipes) => {
  //       this._mine.next(recipes.filter((r) => r.id !== id));
  //     })
  //   );
  // }
}
