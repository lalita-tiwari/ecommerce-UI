import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from '../authentication.service';
import {CartService} from "../cart.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email:string="";
  password:string="";name:any;
  invalidLogin = false;

  public sessionStorage = sessionStorage;
  public localStorage=localStorage;

  loginForm!:FormGroup;
  submitted=false;
  location:string=location.origin;

  constructor(private router: Router,
              public loginService: AuthenticationService,
  private fb:FormBuilder,
  public cartService:CartService) {
    //this.name = null;
  }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })
    //this.name=this.loginService.userName;
    //console.log("**********call form home login "+ this.name);
   /*if(this.loginService.isUserLoggedIn()) {
     this.name=  JSON.parse(sessionStorage.getItem('name')!);
    }*/
  }

  checkLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginService.authenticate(this.email, this.password);
      //console.log("***** session *********"+sessionStorage.getItem('name'));
      /*  if (sessionStorage.getItem('name') !='' && sessionStorage.getItem('name') !=null)
        {
          console.log(" if true");
          this.invalidLogin = false
          this.router.navigate(["",'products'])

        } else {
          console.log("if false");
          this.invalidLogin = true
          alert("The email or password is incorrect.")
        }*/
    }
  }
   get loginFormControl()
   {
     return this.loginForm.controls;
   }
  goToCart()
  {
    this.router.navigate(['cart']);
  }
  goToProducts()
  {
    this.router.navigate(['products']);
  }
  goToOrders()
  {
    this.router.navigate(['order']);
  }
}
