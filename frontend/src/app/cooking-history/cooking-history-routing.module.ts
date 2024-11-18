import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookingHistoryPage } from './cooking-history.page';

const routes: Routes = [
  {
    path: '',
    component: CookingHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookingHistoryPageRoutingModule {}
