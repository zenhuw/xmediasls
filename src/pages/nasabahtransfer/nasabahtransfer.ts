import {
  DecimalPipe
} from '@angular/common';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  LoadingController,
  AlertController
} from 'ionic-angular';
import {
  HttpReqProvider
} from '../../providers/http-req/http-req';
import {
  AuthSingletonProvider
} from '../../providers/auth-singleton/auth-singleton';

@IonicPage()
@Component({
  selector: 'page-nasabahtransfer',
  templateUrl: 'nasabahtransfer.html',
})
export class NasabahtransferPage {

  authInfo: any;
  loading: any;
  bankdata: any;
  selectedbank: string;
  selectedacc: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private decimalPipe: DecimalPipe,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController) {
    this.authInfo = this.auth.authInfo;
    this.startFunc();
  }


checkForm(){
  if(this.selectedacc==''){
    this.showalertsubmit("HARAP ISI NO REKENING");
  }else if (this.selectedacc!==''){
    this.postDaftarTransfer();
  }
}

  postDaftarTransfer() {
    var params = {
      xtoken: this.authInfo.token,
      xusername: this.authInfo.username,
      xaccountnumber: this.authInfo.accountno,
      xaction: 'insert',
      xbankcode:this.selectedbank
    }
    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    this.httpreq.postreq("semstdaftarnasabah?", query)
      .subscribe((response) => {
          if (response.STATUS == "OK") {
            this.loading.dismiss();
            this.showalert(response.MESSAGE);

          } else if (response.STATUS != "OK") {
            this.loading.dismiss();
            this.showalert(response.MESSAGE);
            console.log(response)
          }

        }, (error) => {
          this.loading.dismiss();

          this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
        }

      )
  }


  startFunc() {
    this.showloading();
    this.loading.present().then(() => {
      this.getBankData()
    })
  }  

  getBankData() {
        var params = {
          xtoken: this.authInfo.token,
          xusername: this.authInfo.username,
          xaction: 'list'
        }
        var query = "";
        for (let key in params) {
          query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
        }
        this.httpreq.postreq("semstbank?", query)
          .subscribe((response) => {
              if (response.STATUS == "OK") {
                this.bankdata = response.DATA;
                this.selectedbank = this.bankdata[0].bankCode;
                console.log(this.bankdata);
                this.loading.dismiss();
    
    
              } else if (response.STATUS != "OK") {
                this.loading.dismiss();
                this.showalert(response.MESSAGE);
                console.log(response)
              }
    
            }, (error) => {
              this.loading.dismiss();
    
              this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
            }
    
          )
      }

  showloading(msg ? ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please Wait...'
    });
  }

  showalert(msg) {
    let alert = this.alertctrl.create({
      title: 'NOTIFICATION',
      subTitle: msg,
      buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });

    alert.present();

  } 

  showalertsubmit(msg) {
    let alert = this.alertctrl.create({
      title: 'NOTIFICATION',
      subTitle: msg,
      buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {
        }
      }]
    });

    alert.present();

  }
}
