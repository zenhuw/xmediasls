import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LakupandaiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lakupandai',
  templateUrl: 'lakupandai.html',
})
export class LakupandaiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 
  gotopage(page){
    this.navCtrl.push(page);
  }

}
