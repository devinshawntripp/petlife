import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router,
    public authService: AuthService
    ) { }

  confirmSelection() {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.getPets()
  }

  getPets(){
    this.authService.getPets().subscribe(
      (pets) => {
        this.pets = pets;
        console.log(pets);
      }
    )
  }

  deletePet(pet){
    this.firebaseService.deletePet(pet)
  }

}
