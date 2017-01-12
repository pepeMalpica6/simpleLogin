import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
    providers: [
    Storage
  ]
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};
 
  constructor(public storage: Storage, private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}
 
  public createAccount() {
    this.nav.push(RegisterPage);
  }
 
  public login() {
    this.storage.clear(); 
    this.showLoading()
    this.auth.sendData(this.registerCredentials.email,this.registerCredentials.password )
    .then(data => {
      console.log(data);
      if (data.ok) {
        setTimeout(() => {
        this.loading.dismiss();
        this.storage.set('name','pepe');
        this.storage.get('name').then((val) => {
          console.log('> Your name is', val);
        })
        this.nav.setRoot(HomePage)
        });
      } else {
        this.showError("Access Denied");
      }
    });
    /*
    this.auth.login(this.registerCredentials).subscribe(data => {
      console.log(data);
      
      if (data) {
        setTimeout(() => {
        this.loading.dismiss();
        console.log();
        ;
        this.nav.setRoot(HomePage)
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
    */  

  }
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}