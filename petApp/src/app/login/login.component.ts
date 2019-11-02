import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { AuthService } from '../services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Observable, of } from 'rxjs';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 loginForm: FormGroup;
 errorMessage: string = '';
 userObservable: Observable<any>;
 subscription: Subscription;


  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private apComp: AppComponent
  ) {


  }

  ngOnInit() {
    this.loginForm = this.fb.group ({
      email: [''],
      password: ['']

    });
  }



  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/dash']);
      this.subscription = this.authService.getUserName().subscribe(
        (userN) => {
          this.apComp.username = userN;
          console.log(userN);
        }
      )
      // this.apComp.username = userObservable.
      // this.apComp.username = this.authService.getUserName()
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
