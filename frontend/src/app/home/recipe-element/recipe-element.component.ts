import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { StarredRecipeService } from '../stared/starred-recipes.service';

@Component({
  selector: 'app-recipe-element',
  templateUrl: './recipe-element.component.html',
  styleUrls: ['./recipe-element.component.scss'],
})
export class RecipeElementComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private alertCtrl: AlertController,
    private starredRecipesService: StarredRecipeService
  ) {}

  ngOnInit() {}

  openAlert(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.starredRecipesService.isStarred(this.recipe.id).subscribe((exists) => {
      if (!exists) {
        this.starredRecipesService.addStarredRecipe(this.recipe.id).subscribe(
          () => {
            // Successfully starred the recipe
            this.openAlertAdd(); // Show success alert
          },
          (error) => {
            console.error('Error starring the recipe:', error);
            // Optionally show an error alert here if needed
          }
        );
      } else {
        this.openAlertExists(); // Recipe is already starred
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
