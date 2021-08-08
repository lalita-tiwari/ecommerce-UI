import { Component, OnInit } from '@angular/core';
import {Items} from "./items";
import {HttpClient} from "@angular/common/http";
import {Event} from "@angular/router";
import {FormGroup,FormControl,FormBuilder,Validators} from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public items: Items={"id":"","dish":"","price":"","image":""};
  public file:string="";

  productForm!:FormGroup;
  submitted=false;

  public sessionStorage = sessionStorage;
  location:string=location.origin;
  constructor(private http:HttpClient,
              private fb:FormBuilder) {

  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      dish: ['', Validators.required],
      price: ['', [Validators.required,Validators.minLength(1)]],
      img: ['', Validators.required],
    });
  }
  get productFormControl() {
    return this.productForm.controls;
  }
  addProduct(items:Items):void {
    this.submitted = true;
    if (this.productForm.valid) {
      const element = document.getElementById("itemImage") as HTMLInputElement;
      let fileList: FileList | null = element.files;
      if (fileList) {
        alert("uploading file")
        console.log("FileUpload -> files", fileList[0]);
        const data: FormData = new FormData();
        data.append('items', JSON.stringify(items));
        data.append('file', fileList[0]);

        this.http.post("http://192.168.1.139:8080/addItem", data).subscribe(data => {
        });
      }
      //this.http.post("http://192.168.1.139:8080/adddish",items).subscribe(data=>{});
      alert('Your product has been added!');
      window.location.reload();
    }
  }

  /*onChange(event: any) {
    let files = event.target.files;
    this.file = files;
    event= null;
  }*/
  uploadFile() {
    const element = document.getElementById("itemImage") as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList[0]);
      const data: FormData = new FormData();
      data.append('file', fileList[0]);
      this.http.post("http://192.168.1.139:8080/addAttachment",data).subscribe(data=>{});
    }
  }
}
