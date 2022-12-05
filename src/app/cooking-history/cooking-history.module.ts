import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookingHistoryPageRoutingModule } from './cooking-history-routing.module';

import { CookingHistoryPage } from './cooking-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CookingHistoryPageRoutingModule
  ],
  declarations: [CookingHistoryPage]
})
export class CookingHistoryPageModule {}
