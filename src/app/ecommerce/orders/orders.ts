import {Items} from "../product/items";

export class Orders {

  id:string;
  orderID: string;
  items: Items[];
  orderDate:  any;
  totalprice: string;
  address: string;
  city: string;
  state: string;
  zip:string;
  phone: string;
  email: string;

  constructor() {
    this.id="";
    this.orderID = "";
    this.items = [];
    this.phone = "";
    this.orderDate = Date.now();
    this.totalprice = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.zip="";
    this.email = "";


  }

}
