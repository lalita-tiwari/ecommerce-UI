import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Items} from "./items";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService } from '../cart.service';
import {AuthenticationService} from "../authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-ecommerce',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {
  items: Items[] = [];
  qty:string="";
  itemChecked:boolean=true;
  imgSrc="assets/CartImage.jpg";
  public sessionStorage = sessionStorage;

  productForm!: FormGroup;
  submitted = false;

  checkCondition:boolean=true;

  constructor(private http: HttpClient,
              private router: Router,
              private cartService: CartService,
              private route: ActivatedRoute,
              public loginService: AuthenticationService,
              private fb: FormBuilder,
             ) {  }


  ngOnInit(): void {

   /* this.productForm= this.fb.group({
      itemChecked: [false, Validators.required],
      itemQty: ['', Validators.required],
    });*/

    //check if the items are already added in the cart
    if(this.cartService.cartExist) {
      this.items = this.cartService.getItems();
    }
  /*    console.log("cart service called"
        +this.items +"items");
     this.items.filter(item=>item.checked).map(x=>{ console.log("checked items: "+x.dish);})*/

    else{
      this.http.get<Items[]>("http://localhost:8080/getall").subscribe(data => {
        this.items = data;

      });
    }
    }


  get productFormControl() {
    return this.productForm.controls;
  }

  addToCart(items: Items[]) {

      this.checkCondition = true;

      if (items.filter(item => item.checked).length == 0) {
        alert("Please select an item");
        this.checkCondition = false;

      }

      items.filter(item => item.checked)
        .filter(item => item.qty == null || item.qty == 0)
        .map(a => a.dish)
        .map(x => {
          this.checkCondition = false;
          alert("Please select quantity for " + x);
          return false;
        });

      if (this.checkCondition) {
        this.cartService.addToCart(items);
        window.alert('Your product has been added to the cart!');
        this.router.navigate(['/', 'cart']);

      }

    }
  goToCart()
  {
    this.router.navigate(['cart']);
  }
  goToHome()
  {
    this.router.navigate(['home']);
  }
  //}

}
