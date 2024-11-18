import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User | null = null;
  myRecipes: Recipe[] = [];

  // Single composite subscription to manage all subscriptions
  private subscriptions = new Subscription();
  searchTerm: string = '';

  constructor(
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to the recipes observable and add it to the composite subscription
    const recipesSub = this.recipesService.myRecipes$.subscribe(
      (recipesData) => {
        this.myRecipes = recipesData;
        console.log('Profilna on-init recepti: ', this.myRecipes);
      }
    );
    this.subscriptions.add(recipesSub);

    this.recipesService.getMyRecipes().subscribe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Clean up subscriptions
  }
  // ngOnInit() {
  //   this.auth.userEmail.subscribe((email) => {
  //     this.userEmail = email;
  //   });
  //   this.recipeSub = this.recipesService.mine.subscribe((recipes) => {
  //     this.recipes = recipes;
  //   });
  // }

  // ionViewWillEnter() {
  //   this.recipesService.getMineRecipes().subscribe((recipes) => {});
  // }

  // ngOnDestroy(): void {
  //   if (this.recipeSub) {
  //     this.recipeSub.unsubscribe();
  //   }
  // }
}
