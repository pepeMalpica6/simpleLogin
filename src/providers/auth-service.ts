import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions } from '@angular/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
    currentUser:User;
    http:Http;
    data:Response;

  constructor(http: Http) {
    this.http = http;
  }

  sendData(email: String, psw: String){
    let body = this.jsonToURLEncoded({ email: email, password: psw });
    let url = 'http://frontfree.localhost/api/app/guest/login';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.post(url,body,options)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          if(data.ok === true){
             let customer = data.data.Customer;
             this.currentUser = new User(customer.name, customer.email);
          }
          resolve(this.data);
        });
    });
  }
  //convert a json object to the url encoded format of key=value&anotherkye=anothervalue
  private jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return 'Customer[' + encodeURIComponent(key) + ']=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  public login(credentials) {
    //credentials.email = "fabiano.villanua@yopmail.com";
    //credentials.password = "123123";

    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        var link = 'http://frontfree.localhost/api/app/guest/login';
        //var data = JSON.stringify({username: this.data.username});
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
          this.http.post(
                  link,
                  "Customer[email]=" + credentials.email + "&Customer[password]=" + credentials.password,
                  {
                      headers: headers
                  }
              ).subscribe(
                  data => {
                      this.data = data;
                      let response = this.data.json();
                      if(response.ok === true){
                          let customer = response.data.Customer;
                          this.currentUser = new User(customer.name, customer.email);
                          observer.next(true);
                          observer.complete();
                           resolve(this.data);
                      }
                  }, error => {
                    console.log("Oooops!");
                  }
              );
        });
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return new Promise(resolve => {
      this.http.get('http://frontfree.localhost/api/app/customer/logout')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

    /*
    return Observable.create(observer => {
      this.currentUser = null;
      this.http.get('http://frontfree.localhost/api/app/customer/logout');
      observer.next(true);
      observer.complete();
    });
    */
  }
}