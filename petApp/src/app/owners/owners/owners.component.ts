import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddOwnerComponent } from '../add-owner/add-owner.component'
import { DeleteOwnerComponent } from '../delete-owner/delete-owner.component'
import { AuthService } from 'src/app/services/auth.service';
import {Subscription} from 'rxjs/Subscription';
import { DocumentSnapshot } from '@angular/fire/firestore';


@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css'],
})
export class OwnersComponent implements OnInit {

  users: Array<any> = [];
  pets: Array<any>
  name: string
  subscription: Subscription;
  householdid: string;

  constructor(
    public firebaseService: FirebaseService,
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUserHouseholdID().subscribe(
      (id) => {
        console.log("the id passed in is " + id);
        this.householdid = id;
        // this.getData();
        this.getPets();
        // this.getUserData();
        this.getDataTwo();
      }
    )

  }


  getDataTwo(){
    this.authService.getOwnersFour(this.householdid)
    .subscribe((res) => {
      res.map(snap => {
        console.log("aldjfakldjfakljfdadfjalkdjflk " + snap.payload.doc.id);
        this.authService.getUserDataLast(snap.payload.doc.id).subscribe(result => {
          this.users.push(result.payload);
          console.log("User first name: " + result.payload.get('firstName'));
        })
      })
    });
  }

  getData(){
    this.authService.getUsersFromHousehold(this.householdid)
    .subscribe(result => {

      this.users = result;
    })
   }



   getPets(){
    this.authService.getPetsTwo(this.householdid).subscribe(
      (pets) => {
        this.pets = pets;
        // console.log(pets);
      }
    )
   }

   openDialog() {
    let dialog = this.dialog.open(AddOwnerComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (this.name) {
          this.name = name;
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
  }

  openSecondDialog() {
    let dialog = this.dialog.open(DeleteOwnerComponent);

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
