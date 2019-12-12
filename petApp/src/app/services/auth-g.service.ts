import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }
    // canActivate(): boolean {
    //   if(this.authService.isLoggedIn ) {return true;}
    //   this.router.navigate(['/login'])
    //   return false;
    // }

    canLoad() {
      if ( this.authService.authenticated ) { return true; }



      // console.log(state.root.data.userDetails.uid);
      // this.authService.redirectURL = state.url;
      this.router.navigate(['/login']);
      return false;
    }

    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (this.authService.authenticated) {
        console.log("user logged in");
        return true;

      }

      return this.authService.currentUserObservable
           .take(1)
           .map(user => !!user)
           .do(loggedIn => {
             if (!loggedIn) {
               console.log("access denied")
               this.router.navigate(['login']);
             }
         })
       }


    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     if ( this.authService.isLoggedIn ) {
    //       console.log("user logged in");
    //       return true;
    //     }
    //
    //
    //
    //     // console.log(state.root.data.userDetails.uid);
    //     this.authService.redirectURL = state.url;
    //     console.log(route.toString);
    //     this.router.navigate(['/login']);
    //     return false;
    // }
}
