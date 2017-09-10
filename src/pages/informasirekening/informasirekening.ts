import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  LoadingController,
  AlertController,
  ViewController
} from 'ionic-angular';
import {
  HttpReqProvider
} from '../../providers/http-req/http-req';
import {
  AuthSingletonProvider
} from '../../providers/auth-singleton/auth-singleton';
import moment from 'moment';
import {
  DecimalPipe
} from '@angular/common';
import {
  SortgridPipe
} from '../../pipes/sortgrid/sortgrid';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the DaftarnasabahPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informasirekening',
  templateUrl: 'informasirekening.html',
})
export class InformasirekeningPage {
  datefrom: string = moment().subtract(7, "days").format("DD-MM-YYYY");
  dateto: string = moment().format("DD-MM-YYYY");

  saldoawal: number=0;

  fromreport: boolean= this.navParams.get("report");
  datefromreport:any= this.navParams.get('datefrom');

  datasaldo: any = {
    DATA: [{
      amount: 100000,
      note: "Setor",
      tranDate: "2017-09-06",
      tranTime: "03:07:27",
      tran_number: "STR1709071394164",
      trnType: "KREDIT"
    }],
    SALDO: "22522000",
    "SALDO AWAL": "53722000",
    STATUS: "OK"
  }

  loginpage: boolean = this.navParams.get('loginpage');
  input: {
    nama: string,
    email: string,
    nohandphone: string,
    alamat: string
  } = {
    nama: "",
    email: "",
    nohandphone: "",
    alamat: ""
  }
  loading: any;
  showalertsucc(msg) {
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

  showloading(msg ? ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please Wait...'
    });
  }

  authInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController, public viewCtrl: ViewController) {

    this.authInfo = this.auth.authInfo;
    this.saldoModal();
  }


  ionViewWillEnter() {
    
  }

  saldoModal() {
    var datefrom = moment().subtract(7, "days").format("YYYY-MM-DD");
    var dateto = moment().format("YYYY-MM-DD");
    console.log(datefrom)
    var params = {
      xaccountnumber: this.authInfo.accountno,
      xpin: '123',
      xtoken: this.authInfo.token,
      xusername: this.authInfo.username,
      xaction: "mutasi",
      xdatefrom: this.fromreport==true? this.datefromreport: datefrom,
      xdateto: dateto
    }



    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    this.showloading();
    this.loading.present();
    this.httpreq.postreq("serekening?", query)
      .subscribe((response) => {
          console.log(response)
        
          if (response.STATUS == "OK") {
            for(let key in response.DATA){
              this.saldoawal= this.saldoawal+response.DATA[key].amount
            }
            this.saldoawal=this.saldoawal+response.SALDO;
            this.datasaldo = response;
            this.loading.dismiss();

          } 
          else if (response.STATUS != "OK") {
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
  loadMutasi() {
    var params = {
      "xfullname": this.input.nama,
      "xemail": this.input.email,
      "xphonenumber": this.input.nohandphone,
      "xlocation": this.authInfo.longlat,
      "xaddress": this.input.alamat,
      "ximage": '',
      "xaction": 'insert',
      "xtoken": this.authInfo.token,
      "xusername": this.authInfo.username,
      "xaccountnumber": this.authInfo.accountno
    }
    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }

    this.showloading();
    this.loading.present();
    this.httpreq.postreq("semstnasabah?", query)
      .subscribe((response) => {
          if (response.STATUS == "OK") {
            this.loading.dismiss();
            console.log(response)
            this.showalertsucc(response.MESSAGE);
            


          } else if (response.STATUS != "OK") {
            this.loading.dismiss();
            this.showalert(response.MESSAGE + ' ' + response.STATUS.toUpperCase());
            console.log(response)
          }

        }, (error) => {
          this.loading.dismiss();

          this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
        }

      )
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
