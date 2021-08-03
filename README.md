# E-Commerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the 
source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



-add-product component is used to add the products.

-cart component will store the products added by the user temporary and this component also defines
method to place the order.

-home component contains the home page content and login section as well.
methods are defined to authenticate the user.

-orders component displays the user specific order details.

-product component displays all the products.

-register component is for creating a user account.

-Authenticate service provides the login/logout authentication for the user.

Cart service provides the methods to store the products temporary and share with all the components.

•This is an e-commerce website used to sell products. The Products, Cart and Checkout features
have been defined and can be used by a local startup business.

•This is a gradle project implemented into 3 layers architecture i.e., MVC Design pattern.

•In the Model, database table collections have been defined by creating the java class for each table.

•In the controller, API end points have been defined to deliver the data to front end and to store the data in database as well.
• To access the data from the Database Factory Design Pattern is used.

•Minio Storage Bucket is used to store & retrieve product images.
•Java Streams & Lambda have been implemented.

•Java Collection is used to store and retrieve the data.

In the Front End (Angular) the singleton design pattern has been implemented by creating the Authenticate Service to authenticate the user for login/logout purpose.
The cart service has also used the same design pattern to share the same data to all the modules. 
