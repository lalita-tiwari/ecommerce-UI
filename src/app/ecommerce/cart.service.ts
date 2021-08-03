import { Injectable } from '@angular/core';
import {Items} from "./product/items";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CartService {
 items :Items[]=[];
  cartExist:boolean=false;
  constructor(private router:Router) {


    this.items = JSON.parse(localStorage.getItem('items') ||'[]'); // get the data at lunch
  }

  addToCart(item:Items[]){

    this.items=item;
    this.cartExist=true;

  }

  getItems() {
       return this.items;
  }

  clearCart() {
    this.items = [];
    this.cartExist=false;


  }
  syncItems(){
    localStorage.setItem('items',JSON.stringify(this.items)); // sync the data

  }
  goToCart()
  {
    this.router.navigate(['cart']);
  }

  goToHome()
  {
    this.router.navigate(['home']);
  }
}
