import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { createComponent } from '@angular/compiler/src/core';

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

  addPet(value){
    return this.db.collection('pets').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      need1: value.need1,
      need2: value.need2,
      time1: value.time1,
      time2: value.time2
    });
  }

  editPet(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  // createHousehold(value){
  //
  //
  // }


}
