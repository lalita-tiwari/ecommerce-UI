import { Component, OnInit } from '@angular/core';
import {Items} from "../product/items";
import {Orders} from "./orders";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
 items: Items[]=[];
 orders:Orders[]=[];
address:string="";
selectedOrder:string="";
  email:string="";

  public sessionStorage = sessionStorage;
  public localStorage=localStorage;

  location:string=location.origin;

  constructor(private http: HttpClient,
              private router: Router,
              public loginService:AuthenticationService
              ) { }

  ngOnInit(): void {

    if(localStorage!=null) {
      this.email = localStorage.getItem('email')!;
    }
    this.getUserOrders(this.email);

  /*  this.http.get<Orders[]>("http://192.168.1.139:8080/getOrders").subscribe(data => {
      this.orders = data;

    });*/
  }
  getUserOrders(email:string) {
     const data: FormData = new FormData();
    data.append('email', email);
  this.http.post<Orders[]>("http://192.168.1.139:8080/getUserOrders",data).subscribe(userOrders => {
  this.orders = userOrders;

});

}
  getOrderDetails(orderid:string)
  {
    this.selectedOrder=orderid;
    const element = document.getElementById("orderDetails") as HTMLInputElement;
    element.hidden=false;
   this.orders.filter(x=>x.orderID==orderid).map(i=> {
     this.items = i.items;
     this.address= i.address+" " + i.city +" " + i.state+ " " + i.zip;});

  }


getOrders()
{
  this.http.get("http://192.168.1.139:8080/getOrders").subscribe(data => {
    console.log(JSON.stringify(data))
    let jsonObject: any = JSON.parse(JSON.stringify(data));
    let orders  = <Orders[]>jsonObject;
    });
}
  goToCart()
  {
    this.router.navigate(['cart']);
  }
  goToHome()
  {
    this.router.navigate(['home']);
  }
  goToProducts()
  {
    this.router.navigate(['products']);
  }
}
