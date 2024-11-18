import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { StarredRecipeService } from './starred-recipes.service';

@Component({
  selector: 'app-stared',
  templateUrl: './stared.page.html',
  styleUrls: ['./stared.page.scss'],
})
export class StaredPage implements OnInit, OnDestroy {
  starredRecipes: Recipe[];
  private subscription: Subscription;
  searchTerm: string;

  constructor(private starredRecipesService: StarredRecipeService) {}

  ngOnInit(): void {
    const recipesSub = this.starredRecipesService.starredRecipes$.subscribe(
      (recipe) => {
        this.starredRecipes = recipe;
      }
    );
    this.starredRecipesService.getUsersStarredRecipes().subscribe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // ngOnInit() {
  //   this.recipeSub = this.recipesService.stared.subscribe((recipeData) => {
  //     this.recipes = recipeData;
  //   });
  // }

  // ionViewWillEnter() {
  //   this.recipesService.getStaredRecipesFilterId().subscribe((recipesData) => {
  //     //u okviru ovr funkcije u tap-u se poziva next metoda
  //   });
  // }

  // ngOnDestroy(): void {
  //   if (this.recipeSub) {
  //     this.recipeSub.unsubscribe();
  //   }
  // }
}
