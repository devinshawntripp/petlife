import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { AuthService } from '../services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 loginForm: FormGroup;
 errorMessage: string = '';


  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
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
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
