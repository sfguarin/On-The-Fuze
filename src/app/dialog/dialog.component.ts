import { ApiService } from '../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  userForm !: FormGroup;

  actionBtn : string = "Save"

  constructor(private formBuilder : FormBuilder, 
              private api : ApiService, 
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    //componentes del formulario y que guardan la información ingresada por el usuario
    this.userForm = this.formBuilder.group({
      userFirstName : ['', Validators.required],
      userLastName : ['', Validators.required],
      userDocumentId : ['', Validators.required]
    });

    if(this.editData){

      this.actionBtn = "Update";

      this.userForm.controls['userFirstName'].setValue(this.editData.name);
      this.userForm.controls['userLastName'].setValue(this.editData.last_name);
      this.userForm.controls['userDocumentId'].setValue(this.editData.document_id);

    }

  }

  //Metodo para agregar un usuario
  addUser(){

    if(!this.editData){
      if(this.userForm.valid){
        //Llamado al servicio donde se conecta con los endpoints y envio de data
        this.api.postUser(this.userForm.value)
        .subscribe({
          //Mensaje si todo se guarda bien
          next:(res)=>{
            alert("User added successfully");
            //reset información del cuadro de dialogo
            this.userForm.reset();
            //Cerrar el cuadro de dialogo cuando se crea el usuario
            this.dialogRef.close('save');
          },
          //Mensaje de algun error
          error:()=>{
            alert("Error while adding the user")
          }
        })
      }   
    }else{
      this.updateUser()
    }
  }

  updateUser(){
    this.api.putUser(this.userForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("User updated successfully");
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
  }

}
