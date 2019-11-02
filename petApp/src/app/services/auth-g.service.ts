import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGService implements CanActivate{

  constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        if ( this.authService.isLoggedIn() ) {
            return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }

    }
}
