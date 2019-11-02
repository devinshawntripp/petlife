import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  needs: Array<any>
  pets: Array<any>
  completed: boolean

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getNeeds()
    this.getPets()
  }

  getNeeds(){
    this.firebaseService.getNeeds()
    .subscribe(result => {
      this.needs = result;
    })
   }

   getPets(){
    this.firebaseService.getPets()
    .subscribe(result => {
      this.pets = result;
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
        this.router.navigate(['/dash']);
      }
    )
  }

}
