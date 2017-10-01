import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddclientPage } from './addclient';

@NgModule({
  declarations: [
    AddclientPage,
  ],
  imports: [
    IonicPageModule.forChild(AddclientPage),
  ],
})
export class AddclientPageModule {}
