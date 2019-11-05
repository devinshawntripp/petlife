import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.css']
})
export class DeletePetComponent implements OnInit{

  pets: Array<any>
  householdid: string;

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
    this.authService.getUserHouseholdID().subscribe(
      (id) => {
        console.log("the id passed in is " + id);
        this.householdid = id;
        this.getPets();
      }
    )

  }

  getPets(){
    this.authService.getPetsTwo(this.householdid).subscribe(
      (pets) => {
        this.pets = pets;
        console.log(pets);
      }
    )
  }

  deletePet(pet){
    this.firebaseService.deletePet(pet, this.householdid)
  }

}
