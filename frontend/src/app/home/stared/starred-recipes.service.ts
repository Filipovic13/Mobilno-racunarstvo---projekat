import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model'; // Ensure the correct path to your interface
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
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
export class StarredRecipeService {
  private starredRecipesSubject = new BehaviorSubject<Recipe[]>([]);
  private apiUrl =
    'http://localhost/backend_mobilno_racunarstvo/routes/starredRecipes.php'; // Base URL

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Getter for the observable that holds starred recipes
  get starredRecipes$() {
    return this.starredRecipesSubject.asObservable();
  }

  // Add a new recipe
  addStarredRecipe(recipeId: number): Observable<void> {
    const requestBody = {
      action: 'star',
      recipe_id: recipeId,
    };

    const httpOptions = {
      headers: this.headers,
      withCredentials: true,
    };

    return this.http
      .post<{ success: boolean; message: string }>(
        this.apiUrl,
        requestBody,
        httpOptions
      )
      .pipe(
        tap((response) => {
          if (response.success) {
            console.log('Recipe successfully starred:', response.message);
          } else {
            console.error('Error starring recipe:', response.message);
            throw new Error(response.message);
          }
        }),
        switchMap(() => this.getUsersStarredRecipes().pipe(map(() => void 0))),
        tap(() => {
          this.starredRecipesSubject.next(this.starredRecipesSubject.value);
        }),
        catchError((error) => {
          console.error('Error occurred while starring recipe:', error);
          return throwError(error); // Propagate error to subscribers
        })
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error fetching recipes:', error);
    return throwError('An error occurred; please try again later.');
  }

  // Fetch all starred recipes
  getUsersStarredRecipes(): Observable<Recipe[]> {
    return this.http
      .get<{ [key: string]: RecipeData }>(this.apiUrl, {
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
        tap((recipes) => this.starredRecipesSubject.next(recipes)),
        catchError(this.handleError)
      );
  }

  unstarRecipe(recipeId: number): Observable<Recipe[]> {
    const params = new HttpParams()
      .set('action', 'unstar')
      .set('id', recipeId.toString());

    return this.http
      .delete<{ message: string }>(this.apiUrl, {
        params,
        withCredentials: true,
      })
      .pipe(
        tap((response) => console.log(response.message)), // Log success message
        switchMap(() => {
          // Filter out the unstarred recipe locally
          const updatedRecipes = this.starredRecipesSubject.value.filter(
            (recipe) => recipe.id !== recipeId
          );
          // Update the subject with the new list
          this.starredRecipesSubject.next(updatedRecipes);
          // Return the updated list as an observable
          return of(updatedRecipes);
        }),
        catchError(this.handleError)
      );
  }

  // In StarredRecipeService
  refreshStarredRecipes(): Observable<void> {
    return this.getUsersStarredRecipes().pipe(
      tap((recipes) => {
        // Update the starredRecipesSubject with the new list of recipes
        this.starredRecipesSubject.next(recipes);
      }),
      map(() => void 0), // This ensures the observable emits a 'void' value after the operation
      catchError((error) => {
        console.error('Error refreshing starred recipes:', error);
        return throwError(error); // Propagate the error
      })
    );
  }

  //Method to check if a recipe is starred
  isStarred(recipeId: number): Observable<boolean> {
    return this.getUsersStarredRecipes().pipe(
      map((recipes) => {
        return recipes.some((recipe) => recipe.id === recipeId);
      }),
      catchError((error) => {
        console.log('Error while checking if a recipe is starred: ', error);
        return of(false);
      })
    );
  }

  // Delete a starred recipe
  // deleteStarredRecipe(id: string) {
  //   return this.http
  //     .delete<{ success: boolean; message: string }>(
  //       `${this.apiUrl}?id=${id}` // Use the variable for the API URL
  //     )
  //     .pipe(
  //       switchMap((responseData) => {
  //         if (responseData.success) {
  //           this.starredRecipesSubject.next(
  //             this.starredRecipesSubject.value.filter((r) => r.id !== id)
  //           );
  //           return this.starredRecipes$; // Return the updated starred recipes
  //         } else {
  //           throw new Error(responseData.message); // Handle errors based on the response
  //         }
  //       })
  //     );
  // }

  // private _stared = new BehaviorSubject<Recipe[]>(null);
  // get stared() {
  //   return this._stared.asObservable();
  // }
  // addStaredRecipeFB(
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
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared.json?auth=${token}`, //querry parametar se navodi nakon znaka ? pa njegov naziv
  //         newRecipe
  //       );
  //     }),
  //     switchMap((responseData) => {
  //       generatedId = responseData.name; //switchMap vrca novi Observable
  //       return this.stared;
  //     }),
  //     take(1),
  //     tap((recipes) => {
  //       newRecipe.id = generatedId;
  //       this._stared.next(recipes.concat(newRecipe));
  //     })
  //   );
  // }
  // getStaredRecipeFB(id: string) {
  //   return this.authService.token.pipe(
  //     take(1),
  //     switchMap((token) =>
  //       this.http.get<RecipeData>(
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared/${id}.json?auth=${token}`
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
  // getStaredRecipesFilterId() {
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
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared.json?&orderBy="userId"&equalTo="${loggedUser}"&auth=${token}`
  //       )
  //     ),
  //     map((recipesData) => {
  //       const stared: Recipe[] = [];
  //       for (const key in recipesData) {
  //         if (recipesData.hasOwnProperty(key)) {
  //           stared.push(
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
  //       return stared;
  //     }),
  //     tap((recipes) => {
  //       this._stared.next(recipes);
  //     })
  //   );
  // }
  // deleteStaredRecipe(id: string) {
  //   return this.authService.token.pipe(
  //     take(1),
  //     switchMap((token) => {
  //       return this.http.delete(
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared/${id}.json?auth=${token}`
  //       );
  //     }),
  //     switchMap(() => {
  //       console.log('Usao u delete');
  //       return this.stared;
  //     }),
  //     take(1),
  //     tap((recipes) => {
  //       this._stared.next(recipes.filter((r) => r.id !== id));
  //     })
  //   );
  // }
  // getStaredExists(name: string) {
  //   //console.log('Proba');
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
  //         `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared.json?&orderBy="userId"&equalTo="${loggedUser}"&auth=${token}`
  //       )
  //     ),
  //     map((recipes) => {
  //       const stared: Recipe[] = [];
  //       for (const key in recipes) {
  //         if (recipes.hasOwnProperty(key)) {
  //           if (recipes[key].recipeName === name) {
  //             return true;
  //           }
  //         }
  //       }
  //       return false;
  //     })
  //   );
  // }
}
