import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Users} from "./users";
import {Items} from "../add-product/items";
import {AuthenticationService} from "../authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  emailExisted=false;

  public user: Users = {
    "id": "", "userFname": "", "userMname": "", "userLname": "",
    "registrationDate": "", "userEmail": "", "userPassword": "", "userPhone": "",
  };

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              public loginService:AuthenticationService,
                            ) {

  }

  ngOnInit(): void {

      this.registerForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]

    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {

      /* this.checkUserEmailExist(this.user.userEmail);*/

      this.emailExisted=this.loginService.checkUserEmailExist(this.user);

    }
  }

 /* checkUserEmailExist(email:string) {
    const data: FormData = new FormData();
    data.append('email', email);



   return this.http.post<boolean>("http://localhost:8080/checkUserEmailExist", data )
     .subscribe(res => {

     this.emailExisted = res;
     console.log("response:" + this.emailExisted)
   });
  }*/
}
