import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {stringify} from "@angular/compiler/src/util";
import {Users} from "./register/users";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userName:string;

  constructor(private http:HttpClient,private router: Router,) {
    this.userName="";
  }


   authenticate(email:string,password:string) {

    const data: FormData = new FormData();
    data.append('email', email);
    data.append('password', password);

    this.http.post("http://localhost:8080/authenticateUser",data, {responseType: 'text'}).
    subscribe(data=> {
    console.log(">>>>>>>>>>>>>>>>>>>user "+ data);
      if (data != null && data!= '' && data.trim() !='') {
        console.log(">>>>>>>>>> data from service >>>>>>>>>user "+ data);
        //let obj={'name':data,'email':email};
        //sessionStorage.setItem('key',JSON.stringify(obj));
        sessionStorage.setItem('name', data);
        localStorage.setItem('email', email);

        this.router.navigate(['products'])
        return true;
      }
      else {
        alert("The email or password is incorrect.")
          return false;
        }

    });
    /*  if(this.userName!=null || this.userName !="") {
        localStorage.setItem('email', email);
      // sessionStorage.setItem('email', email);
        return true;

      }
  else {
      return false;
    }*/

  }

  isUserLoggedIn() {
   /* let user=sessionStorage.getItem('key')
    return !(user === null)*/
    let name = sessionStorage.getItem('name')
    let user = localStorage.getItem('email')
     return !(name === null)
   // let user = sessionStorage.getItem('email')
    //console.log(!(user === null))
   // return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('name')
    localStorage.removeItem('email')
   // sessionStorage.removeItem('name')
  //  sessionStorage.removeItem('email')
  }
  checkUserEmailExist(user:Users) {
    const data: FormData = new FormData();
    data.append('email', user.userEmail);
    var emailExist:boolean=false;

    this.http.post<boolean>("http://localhost:8080/checkUserEmailExist", data )
      .subscribe(response => {
       // console.log("response:" + res)
        emailExist= response;
        if (response) {
          alert('Email already exist');
        } else {
          this.http.post("http://localhost:8080/saveUsers", user).subscribe(data => {
          });

          alert('Account created successfully. Please login');
          this.router.navigate(['/', 'home']);
        }

      });
    return emailExist;
  }
}
