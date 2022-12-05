import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesListPage } from './recipes-list.page';

const routes: Routes = [
  {
    path: '',
    component: RecipesListPage,
  },
  {
    path: ':recipeId',
    loadChildren: () =>
      import('./recipe-details/recipe-details.module').then(
        (m) => m.RecipeDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesListPageRoutingModule {}
