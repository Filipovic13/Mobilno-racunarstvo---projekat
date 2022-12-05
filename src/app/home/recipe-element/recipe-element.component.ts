import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-element',
  templateUrl: './recipe-element.component.html',
  styleUrls: ['./recipe-element.component.scss'],
})
export class RecipeElementComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private alertCtrl: AlertController,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {}

  openAlert(event) {
    event.stopPropagation();
    event.preventDefault();

    let exists: boolean;

    this.recipesService
      .getStaredExists(this.recipe.recipeName)
      .subscribe((ex) => {
        exists = ex;
        console.log(exists);

        if (!exists) {
          this.recipesService
            .addStaredRecipeFB(
              this.recipe.recipeName,
              this.recipe.numOfIngredients,
              this.recipe.numOfServings,
              this.recipe.numOfCal,
              this.recipe.details,
              this.recipe.imageUrl
            )
            .subscribe((recipes) => {
              this.openAlertAdd();
            });
        } else {
          this.openAlertExists();
        }
      });
  }

  private openAlertAdd() {
    //create kreira alert,ali ga ne prikazuje
    // funkcija vraca promise => then()...
    this.alertCtrl
      .create({
        header: 'Favourites',
        message: 'Recipe has been added to your favourites',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              console.log('Saved recipe');
            },
          },
        ],
      }) // vraca promise => pa ide then
      .then((alert) => {
        alert.present();
      });
  }

  private openAlertExists() {
    this.alertCtrl
      .create({
        header: 'Favourites',
        message: 'This recipe allready exists in favourites',
        buttons: [
          {
            text: 'Fine',
            handler: () => {},
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
