/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface RecipeData {
  recipeName: string;
  numOfIngredients: number;
  numOfServings: number;
  numOfCal: number;
  details: string;
  imageUrl: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private _recipes = new BehaviorSubject<Recipe[]>(null);
  private _stared = new BehaviorSubject<Recipe[]>(null);
  private _mine = new BehaviorSubject<Recipe[]>(null);
  //event emmiter -> uvek cemo dobiti poslednje emitovanu vr, ne samo buduce promene
  //aktivniji observable, jer mi pozivamo next emetodu

  constructor(private http: HttpClient, private authService: AuthService) {}

  get recipes() {
    return this._recipes.asObservable();
  }
  get stared() {
    return this._stared.asObservable();
  }
  get mine() {
    return this._mine.asObservable();
  }

  // kada dodamo novu stvar na bazu, mi kao povratnu vr  donijamo kljuc za tu novu stvar koju smo doddali
  // ali takodje zelimo da za povratnu vr dobijemo i tu novu vr sto smo dodali, pa zbog toga vracamo observable
  addRecipeFB(
    recipeName: string,
    numOfIngredients: number,
    numOfServings: number,
    numOfCal: number,
    details: string,
    imageUrl: string
  ) {
    let generatedId;
    let newRecipe: Recipe;
    let fetchedUserId: string;

    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      //razlika mapa i switchMapa; SwithMap vraca novi observable
      switchMap((token) => {
        newRecipe = new Recipe(
          null,
          recipeName,
          numOfIngredients,
          numOfServings,
          numOfCal,
          details,
          imageUrl,
          fetchedUserId
        );
        return this.http.post<{ name: string }>(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth${token}`,
          newRecipe
        );
      }),
      take(1),
      switchMap((responseData) => {
        generatedId = responseData.name; //switchMap vrca novi Observable
        return this.recipes;
      }),
      take(1), //take = uzimamo jedan Observable (objekat)

      //tap = pristupamo toj vrednsoti
      //tap kad hocemo da vrsimo sporedne izmene
      // nema povratnu vr , ne vraca nista
      tap((recipes) => {
        newRecipe.userId = generatedId;
        this._recipes.next(recipes.concat(newRecipe));
      })
    );
  }

  getRecipesFB() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) =>
        this.http.get<{ [key: string]: RecipeData }>(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=${token}`
        )
      ),
      map((recipesData) => {
        const recipes: Recipe[] = [];

        for (const key in recipesData) {
          if (recipesData.hasOwnProperty(key)) {
            recipes.push(
              new Recipe(
                key,
                recipesData[key].recipeName,
                recipesData[key].numOfIngredients,
                recipesData[key].numOfServings,
                recipesData[key].numOfCal,
                recipesData[key].details,
                recipesData[key].imageUrl,
                recipesData[key].userId
              )
            );
          }
        }

        return recipes;
      }),
      tap((recipes) => {
        this._recipes.next(recipes);
      })
    );
  }

  getRecipe(id: string) {
    //return this.recipes.find((r) => r.id === id);
    return this.authService.token.pipe(
      take(1),
      switchMap((token) =>
        this.http.get<RecipeData>(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}.json?auth=${token}`
        )
      ),
      map((resData) => {
        console.log(resData);
        return new Recipe(
          id,
          resData.recipeName,
          resData.numOfIngredients,
          resData.numOfServings,
          resData.numOfCal,
          resData.details,
          resData.imageUrl,
          resData.userId
        );
      })
    );
  }

  addStaredRecipeFB(
    recipeName: string,
    numOfIngredients: number,
    numOfServings: number,
    numOfCal: number,
    details: string,
    imageUrl: string
  ) {
    let generatedId;
    let newRecipe: Recipe;
    let fetchedUserId: string;

    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        newRecipe = new Recipe(
          null,
          recipeName,
          numOfIngredients,
          numOfServings,
          numOfCal,
          details,
          imageUrl,
          fetchedUserId
        );
        return this.http.post<{ name: string }>(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared.json?auth=${token}`, //querry parametar se navodi nakon znaka ? pa njegov naziv
          newRecipe
        );
      }),
      switchMap((responseData) => {
        generatedId = responseData.name; //switchMap vrca novi Observable
        return this.stared;
      }),
      take(1),
      tap((recipes) => {
        newRecipe.id = generatedId;
        this._stared.next(recipes.concat(newRecipe));
      })
    );
  }

  getStaredRecipeFB(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) =>
        this.http.get<RecipeData>(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared/${id}.json?auth=${token}`
        )
      ),
      map((resData) => {
        console.log(resData);
        return new Recipe(
          id,
          resData.recipeName,
          resData.numOfIngredients,
          resData.numOfServings,
          resData.numOfCal,
          resData.details,
          resData.imageUrl,
          resData.userId
        );
      })
    );
  }

  getStaredRecipesFilterId() {
    let loggedUser: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        loggedUser = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) =>
        this.http.get<{ [key: string]: RecipeData }>(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared.json?&orderBy="userId"&equalTo="${loggedUser}"&auth=${token}`
        )
      ),
      map((recipesData) => {
        const stared: Recipe[] = [];

        for (const key in recipesData) {
          if (recipesData.hasOwnProperty(key)) {
            stared.push(
              new Recipe(
                key,
                recipesData[key].recipeName,
                recipesData[key].numOfIngredients,
                recipesData[key].numOfServings,
                recipesData[key].numOfCal,
                recipesData[key].details,
                recipesData[key].imageUrl,
                recipesData[key].userId
              )
            );
          }
        }

        return stared;
      }),
      tap((recipes) => {
        this._stared.next(recipes);
      })
    );
  }

  deleteStaredRecipe(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        console.log('Usao u delete');
        return this.stared;
      }),
      take(1),
      tap((recipes) => {
        this._stared.next(recipes.filter((r) => r.id !== id));
      })
    );
  }

  getStaredExists(name: string) {
    //console.log('Proba');
    let loggedUser: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        loggedUser = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) =>
        this.http.get<{ [key: string]: RecipeData }>(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/stared.json?&orderBy="userId"&equalTo="${loggedUser}"&auth=${token}`
        )
      ),
      map((recipes) => {
        const stared: Recipe[] = [];

        for (const key in recipes) {
          if (recipes.hasOwnProperty(key)) {
            if (recipes[key].recipeName === name) {
              return true;
            }
          }
        }
        return false;
      })
    );
  }

  getMineRecipes() {
    let loggedUser: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        loggedUser = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) =>
        this.http.get<{ [key: string]: RecipeData }>(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?&orderBy="userId"&equalTo="${loggedUser}"&auth=${token}`
        )
      ),
      map((recipesData) => {
        const mine: Recipe[] = [];

        for (const key in recipesData) {
          if (recipesData.hasOwnProperty(key)) {
            mine.push(
              new Recipe(
                key,
                recipesData[key].recipeName,
                recipesData[key].numOfIngredients,
                recipesData[key].numOfServings,
                recipesData[key].numOfCal,
                recipesData[key].details,
                recipesData[key].imageUrl,
                recipesData[key].userId
              )
            );
          }
        }

        return mine;
      }),
      tap((recipes) => {
        this._mine.next(recipes);
      })
    );
  }

  deleteMineRecipe(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://mr---project-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        console.log('Usao u delete');
        return this.mine;
      }),
      take(1),
      tap((recipes) => {
        this._mine.next(recipes.filter((r) => r.id !== id));
      })
    );
  }
}
