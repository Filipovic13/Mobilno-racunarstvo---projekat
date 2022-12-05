import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-stared-element',
  templateUrl: './stared-element.component.html',
  styleUrls: ['./stared-element.component.scss'],
})
export class StaredElementComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(
    private recipesService: RecipesService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  openAlert(event) {
    event.stopPropagation();
    event.preventDefault();

    this.recipesService
      .deleteStaredRecipe(this.recipe.id)
      .subscribe((recipes) => {
        this.openAlertDelete();
      });
  }

  private openAlertDelete() {
    this.alertCtrl
      .create({
        header: 'Favourites',
        message: 'Selected recipe has been deleted from favourites',
        buttons: [
          {
            text: 'Okay',
            handler: () => {},
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
