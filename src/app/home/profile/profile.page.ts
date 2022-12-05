import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  recipes: Recipe[];
  userEmail: string;
  private recipeSub: Subscription;
  searchTerm: string;

  constructor(
    private recipesService: RecipesService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.userEmail.subscribe((email) => {
      this.userEmail = email;
    });
    this.recipeSub = this.recipesService.mine.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  ionViewWillEnter() {
    this.recipesService.getMineRecipes().subscribe((recipes) => {});
  }

  ngOnDestroy(): void {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
