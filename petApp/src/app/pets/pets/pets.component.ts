import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddPetComponent } from '../add-pet/add-pet.component'
import { DeletePetComponent } from '../delete-pet/delete-pet/delete-pet.component'
import { EditPetComponent } from '../edit-pet/edit-pet.component'
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { AddNeedsComponent } from '../add-needs/add-needs.component';
import {Subscription} from 'rxjs/Subscription';
import { AuthService } from 'src/app/services/auth.service';

export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit{

  items: Array<any>;
  name: string;
  needs: Array<any>;
  completed: boolean;
  subscription: Subscription;
  householdid: string;

  constructor(
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
    private router: Router,
    public authService: AuthService
    ) { }

  ngOnInit() {
    this.authService.getUserHouseholdID().subscribe(
      (id) => {
        console.log("the id passed in is " + id);
        this.householdid = id;
        this.getData();
        this.getNeeds();
      }
    )

   }

   getData(){
    // this.firebaseService.getPets()
    // .subscribe(result => {
    //   this.items = result;
    // })
    this.authService.getPetsTwo(this.householdid)
    .subscribe(pets => {
        this.items = pets;
        console.log(pets);
      })
   }

   getNeeds(){
    this.firebaseService.getNeeds()
    .subscribe(result => {
      this.needs = result;
    })
   }

  openDialog() {
    let dialog = this.dialog.open(AddPetComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (this.name) {
          this.name = name;
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
  }

  openSecondDialog(){
    let dialog = this.dialog.open(DeletePetComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (this.name) {
          this.name = name;
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
  }

  openEditDialog(){
    let dialog = this.dialog.open(EditPetComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (this.name) {
          this.name = name;
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
  }

  openAddNeedDialog(){
    let dialog = this.dialog.open(AddNeedsComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (this.name) {
          this.name = name;
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
  }

  updateCompletion(object: any){
    if(object.completed === true){
      console.log(object)
      this.completed = false;
    }else{
      this.completed = true;
    }
    this.firebaseService.updateNeed(object, this.completed)
    .then(
      res => {
        this.router.navigate(['/pets']);
      }
    )
  }

}
