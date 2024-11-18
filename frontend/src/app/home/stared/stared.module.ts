import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaredPageRoutingModule } from './stared-routing.module';

import { StaredPage } from './stared.page';
import { StaredElementComponent } from './stared-element/stared-element.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaredPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [StaredPage, StaredElementComponent],
})
export class StaredPageModule {}
