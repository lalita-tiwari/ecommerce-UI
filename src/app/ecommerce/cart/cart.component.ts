import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import {Items} from "../product/items"
import {ActivatedRoute, Router} from "@angular/router";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {Orders} from "../orders/orders";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[]
})
export class CartComponent implements OnInit {
  totalItems:number=0;
  totalprice:string="";
  items: Items[]= this.cartService.getItems().filter(item=> item.checked==true);
  orders:Orders;
  location:string=location.origin;

  //to use the validations on the page
  cartForm !:FormGroup;
  submitted = false;

  public sessionStorage = sessionStorage;

  constructor( private http:HttpClient,
               public cartService: CartService,
               private router: Router,
               private route: ActivatedRoute,
               private fb: FormBuilder,
               public loginService:AuthenticationService) {

    this.orders={
      "id":"",
      "orderID" : "",
      "address" : "",
      "city":"",
      "state":"",
      "phone":"",
      "items" : this.items,
      "totalprice" : this.totalprice,
      "email" : "",
      "zip":"",
      "orderDate" : ""
    };

  }
  ngOnInit(): void {

    //check if the items are already added in the cart
  /*  if(this.cartService.cartExist) {
      this.items = this.cartService.getItems().filter(item=>item.checked);
    }*/

    //For validations
    this.cartForm = this.fb.group({
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required,Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern("^[0-9]*$")]],
      phone: ['', [Validators.required, Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$")]],
      /*email: ['', [Validators.required, Validators.email]],*/
      /*password: [  '', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]  ]*/
    });

    this.items.forEach(m => {
      this.totalItems = this.totalItems + Number(m.qty)
    });
    this.items.forEach(m => {
      this.totalprice = this.totalprice + Number(m.price) * m.qty
    });
  }

  get cartFormControl() {
      return this.cartForm.controls;
    }

  updateCart()
  {
    //console.log(this.items);
    this.router.navigate(['/', 'products']);
  }

  saveOrders(orders:Orders)
  {
    this.submitted = true;
    if (this.cartForm.valid) {

      if(this.totalprice =="" || this.totalItems==0)
      {
        console.log("no items....");
        alert('There is no item added in your cart');
      }
      else {
        orders.totalprice = this.totalprice;
        orders.items = this.items;
        orders.email=localStorage.getItem('email')!;

        /* const data: FormData = new FormData();
         data.append('orders', JSON.stringify(orders));*/

        this.http.post<Orders>("http://192.168.1.139:8080/saveOrders", orders)
          .subscribe(order => {
          });

        alert('Your Order has been placed.');
       window.location.reload();

      }
   }
  }
 getOrder()
 {
  // const divElement = document.getElementById("divOrder") as HTMLInputElement;
   this.router.navigate(['/', 'order']);
 }
  goToHome()
  {
    this.router.navigate(['home']);
  }
}
