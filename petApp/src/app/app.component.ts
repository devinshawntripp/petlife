import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { Router, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'petApp';

  navbarOpen = false;
  errorMessage = '';


  username = 'Account';


  constructor(
    public authService: AuthService,
    private router: Router
  ) {


  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  tryLogout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/login']);
      console.log("user successfully logged out");
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
}
