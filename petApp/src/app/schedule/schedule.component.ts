import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { User } from '../services/user.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  needs: Array<any>
  owners: Array<any>
  completed: boolean
  currentUser: string

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private userModel: User

  ) { }

  ngOnInit() {
    this.getNeeds()
    this.getOwners()
   // this.currentUser = this.userModel.userName
  //  console.log(this.currentUser)
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
