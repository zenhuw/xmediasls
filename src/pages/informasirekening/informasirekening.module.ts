import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformasirekeningPage } from './informasirekening';
import {SortgridPipe}
from '../../pipes/sortgrid/sortgrid';

@NgModule({
  declarations: [
    InformasirekeningPage,SortgridPipe
  ],
  imports: [
    IonicPageModule.forChild(InformasirekeningPage),
  ],
  providers:[SortgridPipe]
})
export class InformasirekeningPageModule {}
