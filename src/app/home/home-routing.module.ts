import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'recipes-list',
        loadChildren: () =>
          import('./recipes-list/recipes-list.module').then(
            (m) => m.RecipesListPageModule
          ),
      },
      {
        path: 'stared',
        loadChildren: () =>
          import('./stared/stared.module').then((m) => m.StaredPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: '/home/tabs/recipes-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/tabs/recipes-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
