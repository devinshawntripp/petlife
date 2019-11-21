import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-owner',
  templateUrl: './delete-owner.component.html',
  styleUrls: ['./delete-owner.component.css']
})
export class DeleteOwnerComponent implements OnInit {

  householdid: string = '';
  users: Array<any> = [];
  userIDs: Array<string> = [];

  combinedArray: { usersCombined: Array<any>, userIDsCombined: Array<any>}[] = [];

  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<DeleteOwnerComponent>,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getUserHouseholdID().subscribe(
      (id) => {
        this.householdid = id;
        this.getUserData();
      }
    )
  }

  getUserData(){
    this.authService.getOwnersFour(this.householdid)
    .subscribe((res) => {
      res.map(snap => {
        console.log("aldjfakldjfakljfdadfjalkdjflk " + snap.payload.doc.id);
        this.authService.getUserDataLast(snap.payload.doc.id).subscribe(result => {
          this.users.push(result.payload);
          this.userIDs.push(snap.payload.doc.id);
          console.log("User first name: " + result.payload.get('firstName'));
        })
      })
    });
  }
  deleteOwnerHousehold(value) {

    this.authService.deleteOwnerFromHousehold(value, this.householdid);

  }




}
