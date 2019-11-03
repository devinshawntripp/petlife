import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.css']
})
export class DeletePetComponent implements OnInit{

  pets: Array<any>

  constructor(
    public dialogRef: MatDialogRef<DeletePetComponent>,
    public firebaseService: FirebaseService,
    private router: Router
    ) { }

  confirmSelection() {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.getPets()
  }

  getPets(){
    this.firebaseService.getPets()
    .subscribe(result => {
      this.pets = result;
    })
  }

  deletePet(pet){
    this.firebaseService.deletePet(pet)
  }

}
