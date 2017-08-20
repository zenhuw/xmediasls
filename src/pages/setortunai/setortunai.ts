import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DecimalPipe } from '@angular/common';
/**
 * Generated class for the SetortunaiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setortunai',
  templateUrl: 'setortunai.html',
})
export class SetortunaiPage {

  input: {
    nominal: any,
   note: string,
   nominalstr: string,
   nominalstrold: string
  }={
    nominal:'',
    nominalstr: '',
    nominalstrold:'',
    note: ""
  }
  changeDetected: boolean=false;
  getCurrency(amount: any) {
    return this.decimalPipe.transform(amount,'1.2-2');
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private decimalPipe: DecimalPipe) {
  }

  // jalanin() {
    
  //       if (this.input.nominalstr !== this.input.nominalstrold) {
  //         this.changeDetected = true;
  //         this.input.nominal = this.input.nominalstr.split(',').join('');
  //         this.input.nominalstr = this.getCurrency(this.input.nominal);
  //         console.log('tai'+this.input.nominalstr);
  //         this.input.nominalstrold = this.input.nominalstr
  //       }
  //       this.changeDetected = false;
  //     }
onChangePrice(evt) {
        this.input.nominal = evt.split(",").join(" ");
        this.input.nominal = this.input.nominal.split(".").join(" ");
        this.input.nominal = this.input.nominal.replace(" ", "");
        if (this.input.nominal != '') {
            this.input.nominalstr = this.getCurrency(this.input.nominal)
            console.log("box_price_formatted: " + this.input.nominal);
        }
    }
onPriceUp(evt){
  this.input.nominal = evt.split(",").join(" ");
  this.input.nominal = this.input.nominal.split(".").join(" ");
  this.input.nominal = this.input.nominal.replace(" ", "");
  this.input.nominalstr = this.input.nominal;
    }
    
    submitButton(){
      this.navCtrl.pop();
    }
}
