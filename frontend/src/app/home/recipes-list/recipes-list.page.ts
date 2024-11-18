import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit, OnDestroy {
  recipes: Recipe[];
  loggedUser: User;
  private subscriptions = new Subscription();
  searchTerm: string;

  constructor(
    private recipesService: RecipesService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {
    //this.recipes = this.recipesService.recipes;
  }

  ngOnInit(): void {
    const recipesSub = this.recipesService.recipes$.subscribe((recipesData) => {
      this.recipes = recipesData;
      console.log('Lista on-init:', this.recipes);
    });
    this.subscriptions.add(recipesSub);

    const userSub = this.authService.loggedUser$.subscribe((user) => {
      this.loggedUser = user;
    });

    this.recipesService.getAllRecipes().subscribe();
  }

  openModal() {
    //create opet vraca promise.... => then
    this.modalCtrl
      .create({
        component: RecipeModalComponent,
        componentProps: { title: 'Add recipe' }, //preko props-a saljemo modalu podatke
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'newRecipe') {
          console.log('Recipes-list, MODAL podaci:', resultData);

          this.recipesService
            .addRecipe(
              new Recipe(
                0,
                this.loggedUser.userId,
                resultData.data.recipeData.recipeName,
                resultData.data.recipeData.numOfIngredients,
                resultData.data.recipeData.numOfServings,
                resultData.data.recipeData.numOfCal,
                resultData.data.recipeData.details,
                resultData.data.recipeData.imageUrl
              )
            )
            .subscribe((responseName) => {
              console.log(responseName);
              //this.recipes = recipesArray; koristimo Subject umesto ovoga
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // ngOnInit() {
  //   //recipes je Subject - sto znaci da mi upravljamo -
  //   //vracamo ga kao observable
  //   this.recipeSub = this.recipesService.recipes.subscribe((recipes) => {
  //     this.recipes = recipes;
  //   });
  // }

  // ionViewWillEnter() {
  //   this.recipesService.getRecipesFB().subscribe((recipeData) => {
  //     //this.recipes = recipeData;
  //   });
  // }

  // openModal() {
  //   //create opet vraca promise.... => then
  //   this.modalCtrl
  //     .create({
  //       component: RecipeModalComponent,
  //       componentProps: { title: 'Add recipe' }, //preko props-a saljemo modalu podatke
  //     })
  //     .then((modal) => {
  //       modal.present();
  //       return modal.onDidDismiss();
  //     })
  //     .then((resultData) => {
  //       if (resultData.role === 'newRecipe') {
  //         console.log(resultData);

  //         this.recipesService
  //           .addRecipeFB(
  //             resultData.data.recipeData.recipeName,
  //             resultData.data.recipeData.numOfIngredients,
  //             resultData.data.recipeData.numOfServings,
  //             resultData.data.recipeData.numOfCal,
  //             resultData.data.recipeData.details,
  //             resultData.data.recipeData.imageUrl
  //           )
  //           .subscribe((responseName) => {
  //             console.log(responseName);
  //             //this.recipes = recipesArray; koristimo Subject umesto ovoga
  //           });
  //       }
  //     });
  // }

  // ngOnDestroy(): void {
  //   if (this.recipeSub) {
  //     this.recipeSub.unsubscribe();
  //   }
  // }
}
