import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(
    private recipesService: RecipesService,
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  private openAlertDelete() {
    this.alertCtrl
      .create({
        header: 'Your Recipes',
        message: 'Do You want to delete your recipe?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.recipesService
                .deleteMineRecipe(this.recipe.id)
                .subscribe((recipesData) => {});
            },
          },
          {
            text: 'NO',
            handler: () => {
              console.log('Delete canceled');
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
