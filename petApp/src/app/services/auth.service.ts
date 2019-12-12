import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { auth } from 'firebase/app';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Observable, of, BehaviorSubject } from 'rxjs';
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

  redirectURL: string;

  isLoggedIn = new BehaviorSubject<boolean>(false);



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
    public db: AngularFirestore,
    ) {
      // firebase.auth().onAuthStateChanged(function(use) {
      //   console.log('reached here');
      //   if(use) {
      //     this.isLoggedIn.next(true);
      //     this.userDetails = use;
      //   } else {
      //     console.log('reached here');
      //     this.isLoggedIn.next(false);
      //     this.userDetails = null;
      //   }
      //
      //
      // });




      this.user = afAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            console.log("some user was logged in");
            this.isLoggedIn.next(true);
            this.userDetails = user;
            console.log(this.userDetails);
            if(this.redirectURL){
              this.router.navigate([this.redirectURL]);
            }
          } else {
            this.isLoggedIn.next(false);
            this.userDetails = null;
          }
        }
      )

    }


    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (this.userDetails != null) {
        console.log("user logged in");
        return true;

      }
      return false;
      this.router.navigate(['login']);

      // return this.currentUserObservable
      //      .take(1)
      //      .map(user => !!user)
      //      .do(loggedIn => {
      //        if (!loggedIn) {
      //          console.log("access denied")
      //          this.router.navigate(['login']);
      //        }
      //    })
    }

    get currentUserObservable(): any {
      return this.afAuth.auth
    }

    get authenticated(): boolean {
      if(this.afAuth.authState != null){
        this.afAuth.authState.subscribe(something => {
          console.log(something.email);
        })
        return true;
      } else {
        return false;
      }
      // return this.afAuth.authState !== null;
    }

    // loggedIn() {
    //   if (this.userDetails == null) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }

    getUserID(){
      console.log(this.userDetails.uid);
      return this.userDetails.uid;
    }

    getUserName() {
      if(this.isLoggedIn){
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

    getUserData() {
      const userD = this.db.collection('users').doc(this.userDetails.uid);
      const doc = userD.get();
      return doc.pipe(
        take(1),
        map(d => d.data())
      )
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
      const user = await this.isLoggedIn;
      if(user) {
        console.log("user is logged in");
        this.getUserHouseholdID().subscribe(
          (householdid) => {
            return this.db.collection('households').doc(householdid).collection('pets').add({
              name: value.name,
              species: value.species
            })
          }
        )
      } else {
        console.log("user is not logged in");
        return 'error';
      }

    }

    async addOwner(value){
      this.getUserHouseholdID().subscribe(
        (householdid) => {
          return this.db.collection('households').doc(householdid).collection('owners').doc(value.ownerid).set({

          })
        }
      )
    }

    getPetsTwo(id) {
      return this.db.collection('households').doc(id).collection('pets').snapshotChanges();
    }

    getUsersFromHousehold(householdid){
      return this.db.collection('households').doc(householdid).collection('owners').snapshotChanges();
    }

    // getOwner(householdid){
    //   // return this.db.collection('users').doc(snapid).snapshotChanges();
    //   return this.getOwnsersIDs(householdid).add(cred => {
    //     return cred.docs.map((snap) => {
    //       return this.db.collection('users').doc(snap.id).snapshotChanges();
    //     })
    //   })
    // }

    getOwnersFour(householdid) {
      return this.db.collection('households').doc(householdid).collection('owners').snapshotChanges();
    }

    getUserDataLast(userID) {
      return this.db.collection('users').doc(userID).snapshotChanges();
    }



    getUser() {
      return this.db.collection('users').doc(this.userDetails.uid).snapshotChanges();
    }

    addUserToHouse(householdid){
      return this.db.collection('households').doc(householdid).collection('owners').doc(this.userDetails.uid).set({
        firstName: this.firstName,
        nameToSearch: this.nameToSearch,
        lastName: this.lastName,
        phoneNum: this.phoneNum,
        userName: this.userName,
        password: this.password,
        email: this.email
      }).then(data => {
        this.db.collection('users').doc(this.userDetails.uid).update({
          householdID: householdid
        })
      });
    }

    // setUsersHouseholdID(householdid){
    //   return this.db.
    // }

    getUserHouseholdID() {
      if(this.isLoggedIn){
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


    //you can make owner and householdexists in two one function by making two parameters
    //ex: collectionid, documentid
    checkExists(collectionid, documentid){
      return this.db.collection(collectionid).doc(documentid).ref.get()
      .then(docsnapshot => {
        if(docsnapshot.exists){
          return true;
        } else {
          return false;
        }
      })
    }



    ownerExists(ownerid) {
      return this.db.collection('users').doc(ownerid).ref.get()
      .then(docsnapshot => {
        if(docsnapshot.exists){
          return true;
        } else {
          return false;
        }
      })
    }

    householdExists(householdid) {
      return this.db.collection('households').doc(householdid).ref.get()
        .then(docsnapshot => {
          console.log(docsnapshot);
          if(docsnapshot.exists){
            return true;
          } else {
            return false;
          }
        })
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
            householdID: '',
            email: value.email
          });

        }).then(res => {

          resolve(res);
          this.doLogin(value);

        }, err => reject(err));
      });


    }

    doSettings(value) {
      this.firstName = value.firstName;
      this.nameToSearch = value.firstName.toLowerCase();
      this.lastName = value.lastName;
      this.phoneNum = parseInt(value.phoneNum);
      this.userName = value.userName;
      this.password = value.password;
      this.email = value.email;


      return this.db.collection('users').doc(this.userDetails.uid).update({
        firstName: value.firstName,
        nameToSearch: value.firstName.toLowerCase(),
        lastName: value.lastName,
        phoneNum: parseInt(value.phoneNum),
        userName: value.userName,
        password: value.password,
        email: value.email
      });

      // return this.db.collection('users').doc(this.userDetails.uid).set({
      //
      // });


    }



    addHouseholdToOwner(value) {
      this.getUserHouseholdID().subscribe(
        (houseid) => {
          this.db.collection('users').doc(value.ownerid).update({
            householdID: houseid.id
          })
        }
      )
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

    deleteOwnerFromHousehold(ownerid, householdid){
      return this.db.collection('households').doc(householdid).collection('owners').doc(ownerid).delete();
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
