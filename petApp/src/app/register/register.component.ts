import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  registerGroup: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }



  onSubmit(value){
	this.firebaseService.createUser(value)
	.then(
	  res => {
	    this.router.navigate(['/dash']);
	  }
	)
}

  ngOnInit() {


    this.registerGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      userName: [''],
      password: [''],
      phoneNum: ['']

    });
  }

}
