import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
import { StarredRecipeService } from '../starred-recipes.service';

@Component({
  selector: 'app-stared-details',
  templateUrl: './stared-details.page.html',
  styleUrls: ['./stared-details.page.scss'],
})
export class StaredDetailsPage implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private starredRecipesService: StarredRecipeService,
    private recipesService: RecipesService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('recipeId')) {
        this.router.navigateByUrl('/home/tabs/stared');
        return;
      }

      console.log(paramMap.get('recipId'));
      this.recipesService
        .getRecipeById(+paramMap.get('recipeId'))
        .subscribe((recipe) => {
          this.recipe = recipe;
        });
    });
  }

  openAlert() {
    this.starredRecipesService
      .unstarRecipe(this.recipe.id)
      .subscribe((data) => {
        this.openAlertDelete();
      });
  }

  private openAlertDelete() {
    this.alertCtrl
      .create({
        header: 'Favourites',
        message: 'Selected recipe has beeen deleted from favourites',
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
