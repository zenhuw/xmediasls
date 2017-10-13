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
  ModalController

} from 'ionic-angular';
import {
  TabsPage
} from '../tabs/tabs'
import{
  WhmcsPage
} from '../whmcs/whmcs'
import {
  HttpReqProvider
} from '../../providers/http-req/http-req';
import {
  AuthSingletonProvider
} from '../../providers/auth-singleton/auth-singleton';
import {RegistrationPage}
from '../registration/registration'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userInfo: {
    username: string,
    password: string,
    longlat: string,
  } = {
    username: '',
    password: '',
    longlat: ''

  }
  alert: any;
  loading: any;

  longlat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menucontroller: MenuController, public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController,public modalCtrl:ModalController) {
    this.menucontroller.enable(false, 'myMenu');

    this.getLocation();
  }
  ionViewDidEnter() {
    this.menucontroller.close();
    this.menucontroller.swipeEnable(false, 'myMenu');
  }

  goLogin() {
    console.log(this.longlat)
    
    this.showloading();
    this.loading.present();

    var params = {
      action:"ValidateLogin",
      email:this.userInfo.username,
      password2:this.userInfo.password,
      username:"5ReAy2GFe7FCtPus7nutOmLCj8rwinV4",
      password:"2Zi4ap1fdqMIQAtPpAuBr1gdhCtmwBcE",
      accesskey:"2Zi4ap1fdqMIQAtPpAuBr1gdhCtmwBcE",
      responsetype:"json",
    }

    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    this.httpreq.postreq("",query)
      .subscribe((response) => {
          console.log(response)
          // if (response.STATUS == "OK") {
          //   this.auth.setter(this.userInfo.username, response.TOKEN, this.longlat, response.ACCOUNT)
          //   this.loading.dismiss();
          //   this.navCtrl.push(TabsPage);
          //   console.log(this.auth.authInfo);
          // } else {
          //   this.loading.dismiss();
          //   this.showalert(response.MESSAGE);
          // }

        if(response.result=="success"){
          this.auth.setter(this.userInfo.username,response.userid);
          this.getAffId(response.userid);
        }else{
          this.loading.dismiss();
          this.showalert("LOGIN GAGAL, HARAP ULANGI BEBERAPA SAAT LAGI");
        }


        }, (error) => {
          this.loading.dismiss();
          this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
        }

      )
  }

getAffId(useridparam){
  var params = {
    action:"GetAffiliates",
    username:"5ReAy2GFe7FCtPus7nutOmLCj8rwinV4",
    password:"2Zi4ap1fdqMIQAtPpAuBr1gdhCtmwBcE",
    accesskey:"2Zi4ap1fdqMIQAtPpAuBr1gdhCtmwBcE",
    responsetype:"json",
    userid:useridparam
  }

  var query = "";
  for (let key in params) {
    query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
  }
  this.httpreq.postreq("",query)
    .subscribe((response) => {
        console.log(response)
        

      if(response.result=="success"){
        this.auth.setaffid(response.affiliates.affiliate[0].id)
        this.loading.dismiss();
        console.log(this.auth.authInfo)
        this.navCtrl.push(WhmcsPage)
      }else{
      this.loading.dismiss();
      this.showalert("LOGIN GAGAL, HARAP ULANGI BEBERAPA SAAT LAGI");
      }
      }, (error) => {
        this.loading.dismiss();
        this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
      }

    )

}


  getLocation() {
    var lat;
    var lot;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.run);
    } else {}
  }

  run = (position) => {
    var lat = position.coords.latitude;
    var lot = position.coords.longitude;
    this.longlat = lot + ' ' + lat;

  }


  showalert(msg) {
    let alert = this.alertctrl.create({
      title: 'NOTIFICATION',
      subTitle: msg,
      buttons: ['Ok']
    });

    alert.present();

  }

  showloading(msg ? ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please Wait...'
    });
  }

  openModal() {
    let myModal = this.modalCtrl.create(RegistrationPage,{loginpage:true});
    myModal.present();
  }






}
