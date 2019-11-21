import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css']
})
export class AddOwnerComponent implements OnInit {
  addOwnerGroup: FormGroup;



  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public dialogRef: MatDialogRef<AddOwnerComponent>,
    private router: Router



  ) { }

  ngOnInit() {

    this.addOwnerGroup = this.fb.group({
      ownerid: [''],
    })

  }



  tryAddingOwner(value){
    //check if owner exists
    if(this.authService.checkExists("users", value.ownerid)){
      console.log("owner exists");
      this.authService.addOwner(value)
      .then((res) => {

        //going to have to use this same user id to add the householdid field to the new owner
        this.authService.addHouseholdToOwner(value);
        this.router.navigate(['/owners']);
      })
      this.dialogRef.close();
    }else {
      //return an error message to the user saying the user does not exist
      console.log("owner doesn't exist");
    }
  }

}
