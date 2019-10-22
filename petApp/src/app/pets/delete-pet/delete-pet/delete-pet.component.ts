import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.css']
})
export class DeletePetComponent{

  constructor(public dialogRef: MatDialogRef<DeletePetComponent>) { }

  confirmSelection() {
    this.dialogRef.close();
  }

}
