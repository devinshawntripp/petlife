import { Component, Inject, OnInit } from '@angular/core';
import { Pet } from '../pet/pet.component';
import { Need } from '../../needs/needs.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddPetComponent } from '../add-pet/add-pet.component'
import { DeletePetComponent } from '../delete-pet/delete-pet/delete-pet.component'
import { EditPetComponent } from '../edit-pet/edit-pet.component'
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

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

  needs = [
    new Need(1, 'Walk', false, 9, 15, 'am'),
    new Need(2, 'Feed', false, 9, 15,'am')
  ]
  pets = [
    new Pet(1, 'ScoobyDoo', 'The coolest dog around', this.needs),
    new Pet(2, 'ScrappyDoo', 'The second coolest dog around', this.needs)
  ]

  constructor(
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.getData();
   }

   getData(){
    this.firebaseService.getPets()
    .subscribe(result => {
      this.items = result;
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
  
}


