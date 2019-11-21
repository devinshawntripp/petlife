import { Component, OnInit, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {BrowserModule} from '@angular/platform-browser';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  errorMessage: string = '';
  successMessage: string = '';
  scheduleForm: FormGroup
  item: any
  firstN: string = '';
  lastN: string = '';
  userN: string = '';
  em: string = '';
  pass: string = '';
  phonenum: string = '';
  household: string = '';
  ownerid: string = '';



  constructor(
    public authService: AuthService,
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.authService.getUserData().subscribe(
      (userData) => {
        console.log("the user passed in is " + userData);
        this.firstN = userData.firstName;
        this.lastN = userData.lastName;
        this.userN = userData.userName;
        this.em = userData.email;
        this.pass = userData.password;
        this.phonenum = userData.phoneNum;
        this.household = userData.householdID;
        this.ownerid = this.authService.getUserID();
        this.createForm();
      }
    )


   }

  ngOnInit() {
    // this.route.data.subscribe(routeData => {
    //   let data = routeData['data'];
    //   if (data) {
    //     this.item = data.payload.data();
    //     this.item.id = data.payload.id;
    //     this.lastN = this.item.lastName;
    //     console.log('reached this code');
    //     // this.createForm();
    //   }




    // this.authService.getUserID();
    //
    // this.authService.getUser().subscribe(
    //   (user) => {
    //     console.log("the user passed in is " + user);
    //
    //   }
    // )



    // })
  }

  createForm() {
    this.scheduleForm = this.fb.group({
      firstName: [this.firstN],
      lastName: [this.lastN],
      email: [this.em],
      password: [this.pass],
      phoneNum: [this.phonenum],
      userName: [this.userN]
    });
  }

  /*onSubmit(value){
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.firebaseService.updateUser(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }*/

  trySettings(value) {
    this.authService.doSettings(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been updated";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }
}
