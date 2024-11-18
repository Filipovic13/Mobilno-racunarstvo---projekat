import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  getFormattedDetails(): string {
    return this.recipe?.details.replace(/\n/g, '<br>') || '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('recipeId')) {
        this.router.navigateByUrl('/home/tabs/recipes-list');
        return;
      }

      const recipeId = +paramMap.get('recipeId');
      this.recipesService.getRecipeById(recipeId).subscribe((recipe) => {
        this.recipe = recipe;
        console.log('Details page - fetched recipe: ', this.recipe);
      });
    });
  }
}
