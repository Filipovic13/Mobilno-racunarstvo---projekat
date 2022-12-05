import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipeSub: Subscription;
  searchTerm: string;

  constructor(
    private recipesService: RecipesService,
    private modalCtrl: ModalController
  ) {
    //this.recipes = this.recipesService.recipes;
  }

  ngOnInit() {
    //recipes je Subject - sto znaci da mi upravljamo -
    //vracamo ga kao observable
    this.recipeSub = this.recipesService.recipes.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  ionViewWillEnter() {
    this.recipesService.getRecipesFB().subscribe((recipeData) => {
      //this.recipes = recipeData;
    });
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
          console.log(resultData);

          this.recipesService
            .addRecipeFB(
              resultData.data.recipeData.recipeName,
              resultData.data.recipeData.numOfIngredients,
              resultData.data.recipeData.numOfServings,
              resultData.data.recipeData.numOfCal,
              resultData.data.recipeData.details,
              resultData.data.recipeData.imageUrl
            )
            .subscribe((responseName) => {
              console.log(responseName);
              //this.recipes = recipesArray; koristimo Subject umesto ovoga
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
