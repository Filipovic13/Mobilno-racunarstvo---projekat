import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesListPageRoutingModule } from './recipes-list-routing.module';

import { RecipesListPage } from './recipes-list.page';
import { RecipeElementComponent } from '../recipe-element/recipe-element.component';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesListPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [RecipesListPage, RecipeElementComponent, RecipeModalComponent],
  //da bi angular znao d amor da je u jednom trenutku kreira, dodajemo sl liniju
  entryComponents: [RecipeModalComponent],
})
export class RecipesListPageModule {}
