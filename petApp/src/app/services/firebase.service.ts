

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(public db: AngularFirestore) {}

  createUser(value){
    return this.db.collection('users').add({
      firstName: value.firstName,
      nameToSearch: value.firstName.toLowerCase(),
      lastName: value.lastName,
      phoneNum: parseInt(value.phoneNum),
      userName: value.userName,
      password: value.password
    });
  }


}
