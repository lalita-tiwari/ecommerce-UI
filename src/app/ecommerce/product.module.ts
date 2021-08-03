import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";
import { AddProductComponent } from './add-product/add-product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
    CartComponent,
    OrdersComponent,
    RegisterComponent,
    HomeComponent,
     LogoutComponent
  ],
    imports: [
        CommonModule, BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule,

        // RouterModule.forRoot( [{path:'products',component:AddProductComponent}])
    ],
  providers: [ HttpClientModule],
  bootstrap: [ProductComponent]
})
//const route:Routes=[{path:'bakery',component:EcommerceComponent}];
export class ProductModule {

}
