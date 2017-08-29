import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,  AlertController} from 'ionic-angular';
import { DecimalPipe } from '@angular/common';
import {HomePage} from '../home/home'
/**
 * Generated class for the DetailsimulasiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailsimulasi',
  templateUrl: 'detailsimulasi.html',
})
export class DetailsimulasiPage {

  pendapatan: number;
  sukubunga: number;
  property: number;
  uangmuka: number;
jangkawaktu: number;


showalert(msg, title) {
  let alert = this.alertctrl.create({
    title: title,
    subTitle: msg,
    buttons: [{
      text: 'Ok',
      role: 'ok',
      handler: () => {
        this.navCtrl.popTo(this.navCtrl.getByIndex(0));
      }
    }]
  });


  alert.present();

}
  constructor(public navCtrl: NavController, navParams: NavParams,private decimalPipe: DecimalPipe, public alertctrl: AlertController) {
    this.pendapatan= navParams.get("pendapatan");
    this.sukubunga= navParams.get("sukubunga");
    this.property= navParams.get("property");
    this.uangmuka= navParams.get("uangmuka");
    this.jangkawaktu= navParams.get("jangkawaktu");
  }

  submitKredit(){
    this.showalert('Data Telah Disimpan!', 'Notification');
   
  }


}
