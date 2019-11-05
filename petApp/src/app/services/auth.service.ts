import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { auth } from 'firebase/app';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

import { take, map } from 'rxjs/operators';

import * as firebase from 'firebase/app';






@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // user$: Observable<User>;
  // var user = firebase.auth().currentUser;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private userData: Observable<any>;
  houseid: string = 'null';



  firstName: string;
  nameToSearch: string;
  lastName: string;
  phoneNum: number;
  userName: string;
  password: string;
  email: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public db: AngularFirestore
    ) {
      this.user = afAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          } else {
            this.userDetails = null;
          }
        }
      )

    }




    // isLoggedIn() {
    //  return this.afAuth.authState.pipe(first()).toPromise();
    // }
    isLoggedIn() {
      if (this.userDetails == null) {
        return false;
      } else {
        return true;
      }
    }

    getUserName() {
      if(this.isLoggedIn()){
        const userD = this.db.collection('users').doc(this.userDetails.uid);
        const doc = userD.get();
        return doc.pipe(
          // add take if you only want data one time, which closes subscription
          take(1),
          map(d => d.data().firstName)
        )
      } else {
        console.log('user not logged in');
        // need to return an observable
        return of("nothing");
      }
    }

    getPets() {
      // if(this.isLoggedIn()){
      //   return this.db.collection('users').doc(this.userDetails.uid).collection('pets').snapshotChanges();
      // }
      // this.getUserHouseholdID().subscribe(
      //   (householdid) => {
      //     this.houseid = householdid;
      //   }).then(
      //     return this.db.collection('households').doc(this.houseid).collection('pets').snapshotChanges();
      // )

    }

    async addPet(value){
      const user = await this.isLoggedIn();
      if(user) {
        console.log("user is logged in");
        this.getUserHouseholdID().subscribe(
          (householdid) => {
            return this.db.collection('households').doc(householdid).collection('pets').add({
              name: value.name
            })
          }
        )
      } else {
        console.log("user is not logged in");
        return 'error';
      }

    }

    getPetsTwo(id) {
      return this.db.collection('households').doc(id).collection('pets').snapshotChanges();
    }

    getUsersID(householdid){
      return this.db.collection('households').doc(householdid).collection('owners').snapshotChanges();
    }

    // getUsersTwo(){
    //
    //   // const housid;
    //   // const ownersid;
    //   // this.getUserHouseholdID().subscribe( (householdID) => {
    //   //   this.getUsersID(householdID).subscribe( (id) => {
    //   //
    //   //     return this.db.collection('users').doc(id).snapshotChanges();
    //   //   })
    //   // }
    //   //
    //   // )
    //   // this.getUsersIDs()
    //   // return this.db.collection('users').doc(userID).snapshotChanges();
    // }
    //
    // getUsers() {
    //   return this.db.collection().snapshotChanges();
    // }

    getUserHouseholdID() {
      if(this.isLoggedIn()){
        const userD = this.db.collection('users').doc(this.userDetails.uid);
        console.log(userD);
        const doc = userD.get();
        return doc.pipe(
          take(1),
          map(d => d.data().householdID)
        )
      } else {
        console.log("user not logged in");
        return of("nothing");
      }
    }

    doRegister(value){
      this.firstName = value.firstName;
      this.nameToSearch = value.firstName.toLowerCase();
      this.lastName = value.lastName;
      this.phoneNum = parseInt(value.phoneNum);
      this.userName = value.userName;
      this.password = value.password;
      this.email = value.email;


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
          this.doLogin(value);

        }, err => reject(err));
      });


    }

    createHousehold(){

      return this.db.collection('households').add({

      }).then(householdRef => {
        return this.db.collection('users').doc(this.userDetails.uid).update({
          householdID: householdRef.id
        }).then(res => {
          return this.db.collection('households').doc(householdRef.id).collection('owners').doc(this.userDetails.uid).set({
            firstName: this.firstName,
            nameToSearch: this.nameToSearch,
            lastName: this.lastName,
            phoneNum: this.phoneNum,
            userName: this.userName,
            password: this.password,
            email: this.email
          })
        })
        console.log("Document written with ID: ", householdRef.id);

      }).catch(function(error) {
        console.error("Error adding document: ", error);
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

    doLogout(){
      return new Promise((resolve, reject) => {
        if(firebase.auth().currentUser){
          this.afAuth.auth.signOut();
          resolve();
        }
        else{
          reject();
        }
      });
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
