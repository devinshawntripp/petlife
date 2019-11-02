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

    return this.db.collection('users').add({
      firstName: value.firstName,
      nameToSearch: value.firstName.toLowerCase(),
      lastName: value.lastName,
      phoneNum: parseInt(value.phoneNum),
      userName: value.userName,
      password: value.password
    });

  }

  createNeed(value){
    return this.db.collection('Needs').add({
      what: value.what,
      nameToSearch: value.what.toLowerCase(),
      time: value.time,
      day: value.day,
      pet: value.pet,
      owner: value.owner,
      completed: false
    })
  }

  getNeeds(){
    return this.db.collection('Needs').snapshotChanges();
  }

  addPet(value){
    return this.db.collection('pets').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
    });
  }

  getPets(){
    return this.db.collection('pets').snapshotChanges();
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();

  }

  editPet(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  updateNeed(value, completed){
    return this.db
       .collection("Needs")
       .doc(value.payload.doc.id)
       .set({ completed: completed }, { merge: true });
  }

  updateAnOwner(value, owners){
    return this.db
       .collection("pets")
       .doc(value.payload.doc.id)
       .set({ owners: owners }, { merge: true });
  }
  
  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  // createHousehold(value){
  //
  //
  // }


}
