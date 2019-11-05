import { Component, OnInit } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.css']
})
export class HouseholdComponent implements OnInit {



  yesChecked: boolean;
  noChecked: boolean;
  householdGroup: FormGroup;
  householdID: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {

    this.householdGroup = this.fb.group ({
      houseID: ['']
    });
  }

  routeToSchedule(){
    this.router.navigate(['/schedule']);
  }


  tryCreatingHousehold() {
    this.authService.createHousehold()
    .then(res => {
      console.log(res);
      this.displayHouseholdID()
    }, err => {
      // console.log(err);
      // this.errorMessage = err.message;
      // this.successMessage = "";
    })
  }

  displayHouseholdID(){
    this.authService.getUserHouseholdID().subscribe(
      (id) => {
        console.log("the id passed in is " + id);
        this.householdID = id;
      }
    )
  }

  tryHouseholdJoin(value) {
    //check if the householdID exists in households
    console.log(value.houseID);
    if(this.authService.householdExists(value.houseID)){
      //household exists so add the user to the household
      this.authService.addUserToHouse(value.houseID);
      this.router.navigate(['/schedule']);
    }
  }



}
