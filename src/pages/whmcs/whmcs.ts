import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthSingletonProvider} from '../../providers/auth-singleton/auth-singleton'
/**
 * Generated class for the WhmcsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-whmcs',
  templateUrl: 'whmcs.html',
})
export class WhmcsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthSingletonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhmcsPage');
  }

}
