import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recipe-app';

  listData : any= []
  displayedColumn :string[] = ['productName','category','data','freshness','price','comment']
  
  constructor(private dialog:MatDialog, private api:ApiService){

  }

  ngOnInit(): void {
    this.getAllProducts()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
        width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts()
      }
    });
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        console.log(res)
        this.listData = res
      },
      error:(err)=>{
        alert("Error while fetching the Records!!")
      }
    })
  }

  editProduct(each:any){
    this.dialog.open(DialogComponent,{
      width:"30%",
      data:each
      
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProducts();
      }
    });
  }

  deleteProduct(id:number){
    this.api.delectProduct(id)
    .subscribe({
      next:(res)=>{
        // alert("Product Deleted Successfully");
        this.getAllProducts();
      },
      error:()=>{
        alert("Error while deleting the product !!")
      }
    })
  }
}
