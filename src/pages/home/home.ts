import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    Storage
  ]
})
export class HomePage {
  username = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthService, private storage: Storage, ) {
    let info = this.auth.getUserInfo();
    storage.get('name').then((val) => {
          console.log('> Your name is', val);
          this.username = val;
    })
  }
 
  public logout() {
    this.auth.logout().subscribe(succ => {
        this.nav.setRoot(LoginPage)
    });
  }
}