import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-stared',
  templateUrl: './stared.page.html',
  styleUrls: ['./stared.page.scss'],
})
export class StaredPage implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipeSub: Subscription;
  searchTerm: string;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipeSub = this.recipesService.stared.subscribe((recipeData) => {
      this.recipes = recipeData;
    });
  }

  ionViewWillEnter() {
    this.recipesService.getStaredRecipesFilterId().subscribe((recipesData) => {
      //u okviru ovr funkcije u tap-u se poziva next metoda
    });
  }

  ngOnDestroy(): void {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
