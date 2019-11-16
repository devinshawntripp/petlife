import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGService implements CanActivate{

  constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if ( this.authService.isLoggedIn ) { return true; }



        // console.log(state.root.data.userDetails.uid);
        this.authService.redirectURL = state.url;
        this.router.navigate(['/login']);
        return false;
    }
}
