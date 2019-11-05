import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  registerGroup: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  email: string = '';
  password: string = '';




  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public firebaseService: FirebaseService
  ) { }



//   onSubmit(value){
// 	this.firebaseService.createUser(value)
// 	.then(
// 	  res => {
// 	    this.router.navigate(['/dash']);
// 	  }
// 	)
// }


tryRegister(value){
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       // this.firebaseService.createUser(value).then( res => { this.router.navigate(['/dash']); })
       this.errorMessage = "";
       this.successMessage = "Your account has been created";
       this.email = value;
       this.router.navigate(['/household']);
       // HComp.username = value
       // HComp.password =
       this.authService.doLogin(value);
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
   }

   // getUserName(){
   //   this.authService.getUserName(){
   //
   //   }
   // }

  ngOnInit() {

    this.registerGroup = this.fb.group ({
      firstName: [''],
      lastName: [''],
      userName: [''],
      password: [''],
      phoneNum: [''],
      email: ['']

    });

  }

}
