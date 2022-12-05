import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaredPage } from './stared.page';

const routes: Routes = [
  {
    path: '',
    component: StaredPage,
  },
  {
    path: ':recipeId',
    loadChildren: () =>
      import('./stared-details/stared-details.module').then(
        (m) => m.StaredDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaredPageRoutingModule {}
