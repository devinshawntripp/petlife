import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent{

  Needs : []
  name: string;

  constructor(public dialogRef: MatDialogRef<AddPetComponent>) { }

  confirmSelection() {
    this.dialogRef.close(this.name);
  }

}
