import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import {Subscription} from 'rxjs/Subscription';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  needs: Array<any>
  pets: Array<any>
  completed: boolean
  subscription: Subscription;
  userName: any;
  householdid: string;


  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public authService: AuthService,
    public apComp: AppComponent

  ) {
    this.subscription = this.authService.getUserName().subscribe(
      (userN) => {
        this.apComp.username = userN;
        console.log(userN);
      }
    )


  }

  ngOnInit() {
    this.authService.getUserHouseholdID().subscribe(
      (id) => {
        console.log("the id passed in is " + id);
        this.householdid = id;
        this.getNeeds()
        this.getPets()
        this.getName()
      }
    )
  }

  getNeeds(){
    this.firebaseService.getNeeds()
    .subscribe(result => {
      this.needs = result;
    })
   }

   getPets(){
    this.authService.getPetsTwo(this.householdid)
    .subscribe(pets => {
        this.pets = pets;
        console.log(pets);
      })
   }

   getName(){
    this.subscription = this.authService.getUserName().subscribe(
      (userN) => {
        this.userName = userN;
        console.log(userN);
      }
    )
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
        this.router.navigate(['/dash']);
      }
    )
  }

}
