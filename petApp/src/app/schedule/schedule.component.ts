import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  needs: Array<any>
  owners: Array<any>
  completed: boolean
  householdid: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUserHouseholdID().subscribe(
      (id) => {
        console.log("the id passed in is " + id);
        this.householdid = id;
        this.getNeeds()
        this.getOwners()
      }
    )
    
  }

  getNeeds(){
    this.firebaseService.getNeeds()
    .subscribe(result => {
      this.needs = result;
    })
   }

   getOwners(){
    this.authService.getUsersFromHousehold(this.householdid)
    .subscribe(result => {
      console.log(result);
      this.owners = result;
    })
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
        this.router.navigate(['/schedule']);
      }
    )
  }

}
