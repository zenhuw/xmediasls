import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthSingletonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthSingletonProvider {

  public authInfo: {
    username: string,
    token: string,
    longlat: string,
    accountno: string,
    saldo: number,
    agenmode: boolean,
    userid:number,
    affid:number
  }={
    username: '',
    token: '',
    longlat: '',
    accountno: '',
    saldo: 0,
    agenmode:false,
    userid:0,
    affid:0
  }

  constructor(public http: Http) {
  }

setter(username:string,userid:number){
    this.authInfo.username= username;
    this.authInfo.userid=userid;
}

setaffid(affid:number){
  this.authInfo.affid=affid;
}

setloc(longlat){
  this.authInfo.longlat=longlat;
}

getter(){
  let a =this.authInfo;
  return a;
}


}
