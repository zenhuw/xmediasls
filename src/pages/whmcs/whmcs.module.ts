import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhmcsPage } from './whmcs';

@NgModule({
  declarations: [
    WhmcsPage,
  ],
  imports: [
    IonicPageModule.forChild(WhmcsPage),
  ],
})
export class WhmcsPageModule {}
