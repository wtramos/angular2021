import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-productdialog-box',
  templateUrl: './productdialog-box.component.html',
  styleUrls: ['./productdialog-box.component.scss']
})
export class ProductdialogBoxComponent implements OnInit {
  action:string;
  local_data:any;
  formInstance: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductdialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product) {

    this.local_data = {...data};
    this.action = this.local_data.action;
    this.formInstance = new FormGroup({
      "name": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
      "image": new FormControl('', Validators.required),
      "amount": new FormControl('', Validators.required)
    });
    if (this.action == 'Product Registration'){
      this.formInstance.controls.name.setValue('');
      this.formInstance.controls.description.setValue('');
      this.formInstance.controls.image.setValue('');
      this.formInstance.controls.amount.setValue(0);
    }
    if (this.action == 'Product Update'){
      this.formInstance.controls.name.setValue(data.name);
      this.formInstance.controls.description.setValue(data.description);
      this.formInstance.controls.image.setValue(data.image);
      this.formInstance.controls.amount.setValue(data.price.amount);
    }
  }

  ngOnInit(): void {
  }

  doAction(){
    if (this.formInstance.invalid){
      return;
    }
    //console.log(this.formInstance.value);
    this.dialogRef.close({event:this.action,data:this.formInstance.value});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}