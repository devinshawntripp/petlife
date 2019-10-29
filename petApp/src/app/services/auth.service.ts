import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { auth } from 'firebase/app';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

import * as firebase from 'firebase/app';






@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // user$: Observable<User>;
  // var user = firebase.auth().currentUser;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public db: AngularFirestore
    ) {
      // this.user$ = this.afAuth.authState.pipe(
      //   switchMap(user => {
      //     if(user) {
      //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      //     } else {
      //       return of(null);
      //     }
      //   })
      // );

    }


    doRegister(value){
      return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(cred => {
          return this.db.collection('users').doc(cred.user.uid).set({
            firstName: value.firstName,
            nameToSearch: value.firstName.toLowerCase(),
            lastName: value.lastName,
            phoneNum: parseInt(value.phoneNum),
            userName: value.userName,
            password: value.password,
            email: value.email
          });

        }).then(res => {

          resolve(res);

        }, err => reject(err));
      });


    }


    doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        }, err => reject(err))
      })
    }



    //
    // async googleSignIn() {
    //   const provider = new auth.GoogleAuthProvider();
    //   const credential = await this.afAuth.auth.signInWithPopup(provider);
    //   return this.updateUserData(credential.user);
    // }


    // async signOut() {
    //   await this.afAuth.auth.signOut();
    //   return this.router.navigate(['/']);
    // }

    // private updateUserData(user) {
    //   const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    //
    //   const data = {
    //     uid: user.uid,
    //     phoneNum: user.phoneNum,
    //     userName: user.userName
    //   };
    //
    //
    //   return userRef.set(data, {merge: true});
    //
    //
    // }
}
