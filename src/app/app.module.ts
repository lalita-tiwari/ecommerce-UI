import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {ProductComponent} from "./ecommerce/product/product.component";
import { HttpClientModule } from '@angular/common/http';
import {ProductModule} from "./ecommerce/product.module";
import {AddProductComponent} from "./ecommerce/add-product/add-product.component";
import {CartComponent} from "./ecommerce/cart/cart.component";
import {OrdersComponent} from "./ecommerce/orders/orders.component";
import {RegisterComponent} from "./ecommerce/register/register.component";

import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./ecommerce/home/home.component";

import { LogoutComponent } from './ecommerce/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [HttpClientModule,
    BrowserModule,ProductModule,
        RouterModule.forRoot( [{path:'products',component:ProductComponent},
          {path:'addproducts',component:AddProductComponent},
          {path:'cart',component:CartComponent},
          {path:'home',component:HomeComponent},
          {path:'order',component:OrdersComponent},
          {path:'register',component:RegisterComponent},
                   {path:'logout',component:LogoutComponent},
          {path:'',component:HomeComponent},])

  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]

})

export class AppModule {

}
