import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaredDetailsPage } from './stared-details.page';

const routes: Routes = [
  {
    path: '',
    component: StaredDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaredDetailsPageRoutingModule {}
