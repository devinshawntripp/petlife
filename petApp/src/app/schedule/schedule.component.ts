import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  needs: Array<any>
  owners: Array<any>
  completed: boolean

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getNeeds()
    this.getOwners()
  }

  getNeeds(){
    this.firebaseService.getNeeds()
    .subscribe(result => {
      this.needs = result;
    })
   }

   getOwners(){
    this.firebaseService.getUsers()
    .subscribe(result => {
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
