import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  productForm !: FormGroup;
  actionBtn:string="Save";
  
  constructor(
    private formBuilder:FormBuilder, 
    private api:ApiService , 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef:MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      recipeName : ['',Validators.required],
      category : [''],
      ingredients: [''],
      url:[''],
      description:['']
    })

    if(this.editData){
      this.actionBtn = "update"
      this.productForm.controls["recipeName"].setValue(this.editData.recipeName);
      this.productForm.controls["category"].setValue(this.editData.category);
      this.productForm.controls["url"].setValue(this.editData.url);
      this.productForm.controls["ingredients"].setValue(this.editData.ingredients);
      this.productForm.controls["description"].setValue(this.editData.description);
    }
    
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added successfully");
            // this.productForm.reset();
            //  this.dialogRef.close("save");
          },
          error:()=>{
            alert("Error while adding the product")
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated Successfully");
        this.productForm.reset();
        this.dialogRef.close("update")
      },
      error:()=>{
        alert("Error While updating ....!!")
      }
    })
  }

 
}