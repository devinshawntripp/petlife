import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user = firebase.auth().currentUser;
  constructor(public db: AngularFirestore) {

  }

  createUser(value){

    // if(this.user != null){
    //   return this.db.collection('users/' + this.user.uid).add({
    //     firstName: value.firstName,
    //     nameToSearch: value.firstName.toLowerCase(),
    //     lastName: value.lastName,
    //     phoneNum: parseInt(value.phoneNum),
    //     userName: value.userName,
    //     password: value.password,
    //     email: value.email
    //   });
    // }

  }


  // createHousehold(value){
  //
  //
  // }


}
