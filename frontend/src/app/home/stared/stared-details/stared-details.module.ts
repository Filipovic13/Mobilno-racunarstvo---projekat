import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaredDetailsPageRoutingModule } from './stared-details-routing.module';

import { StaredDetailsPage } from './stared-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaredDetailsPageRoutingModule
  ],
  declarations: [StaredDetailsPage]
})
export class StaredDetailsPageModule {}
