import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddOwnerComponent } from '../add-owner/add-owner.component'
import { DeleteOwnerComponent } from '../delete-owner/delete-owner.component'


@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  items: Array<any>
  pets: Array<any>
  name: string

  constructor(
    public firebaseService: FirebaseService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
    this.getPets();
  }

  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
    })
   }

   getPets(){
    this.firebaseService.getPets()
    .subscribe(result => {
      this.pets = result;
    })
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
