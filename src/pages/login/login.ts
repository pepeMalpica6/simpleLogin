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
  customer: any;
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
      console.log(data.ok);
      if (data.ok) {
        this.customer = data;
        console.log(this.customer.data.Customer);
        this.storage.set('Customer_id',this.customer.data.Customer._id);
        this.storage.set('Customer_birthday',this.customer.data.Customer.birthday);
        this.storage.set('Customer_email',this.customer.data.Customer.email);
        this.storage.set('Customer_gender',this.customer.data.Customer.gender);
        this.storage.set('Customer_name',this.customer.data.Customer.name);
        this.storage.set('Customer_newsletter',this.customer.data.Customer.newsletter);
        this.storage.set('Customer_nickname',this.customer.data.Customer.nickname);
        this.storage.set('Customer_phone',this.customer.data.Customer.phone);
        this.storage.set('Customer_photo_circle',this.customer.data.Customer.photo_circle);
        this.storage.set('Customer_photo_thumbnail',this.customer.data.Customer.photo_thumbnail);
        this.storage.set('Customer_birthday',this.customer.data.Customer.birthday);
        this.storage.get('Customer_email').then((val) => {
          console.log('> Customer e-mail is: ', val);
        })
        setTimeout(() => {
        this.loading.dismiss();
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