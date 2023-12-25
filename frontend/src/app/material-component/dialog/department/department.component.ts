import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-contansts';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  onAddDepartment = new EventEmitter();
  onEditDepartment = new EventEmitter();
  departmentForm :any = FormGroup;
  dialogAction:any = "Add";
  action:any ="Add";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private departmentService:DepartmentService,
  public dialogRef:MatDialogRef<DepartmentComponent>,
  private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      name:[null,[Validators.required]]
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.departmentForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit()
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.departmentForm.value;
    var data = {
      name: formData.name
    }
    this.departmentService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddDepartment.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  edit(){
    var formData = this.departmentForm.value;
    var data = {
      id:this.dialogData.data.id,
      name: formData.name
    }
    this.departmentService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddDepartment.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
