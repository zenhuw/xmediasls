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
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder
} from '@angular/forms'

/**
 * Generated class for the AddclientPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addclient',
  templateUrl: 'addclient.html',
})
export class AddclientPage {

  data: {
    name: string,
    email: string,
    handphone: string,
    address: string,
    province: string,
    provincestring: string,
    city: string,
    district: string,
    subdistrict: string
  } = {
    name: '',
    email: '',
    handphone: '',
    address: '',
    province: '',
    provincestring: '',
    city: '',
    district: '',
    subdistrict: ''
  }
  loading: any;

  province: Array<{id:string, desc:string}>;
  city: Array<{id:string, desc:string}>;
  district: any;

  form: any

  holder: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private decimalPipe: DecimalPipe,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController,
    private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: '',
      email: '',
      handphone: '',
      address: '',
      province: {id:'',desc:''},
      provincestring: '',
      city: {id:'',desc:''},
      district: {id:'',desc:''},
      subdistrict: ''
    })

    this.form.
    valueChanges.subscribe(data => {
      this.getdata("city");
      this.getdata("district");
      
    })
    this.getdata("province");
  }

  showloading(msg ? ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please Wait...'
    });
  }


  getdata(datatype) {
    var type = {
      "province": "https://kodepos-2d475.firebaseio.com/list_propinsi.json?",
      "city": "https://kodepos-2d475.firebaseio.com/list_kotakab/" + this.form.value.province.id + ".json?",
      "district": "https://kodepos-2d475.firebaseio.com/kota_kab/" + this.form.value.city.id + ".json?"
    }

    this.httpreq.getreqexternal(type[datatype])
      .subscribe((response) => {
        console.log(response);
        if (datatype == "city") {
          console.log(response);
          let arr = []
          for(let i in response){
             arr.push({id:i,desc:response[i]})
          }
          console.log(arr);
          this.city= arr;
        } else if (datatype == "district") {
          console.log(response);
          this.district = response;
        } else if (datatype == "province") {
          let arr = []
          for(let i in response){
             arr.push({id:i,desc:response[i]})
          }
          console.log(arr);
          this.province = arr;
        }
      }, (error) => {
        console.log(error);
      })



  }
}
