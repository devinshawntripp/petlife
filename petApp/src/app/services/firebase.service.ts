import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // user = firebase.auth().currentUser;
  constructor(public db: AngularFirestore, private afAuth: AngularFireAuth) {

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

  isLoggedIn() {
   return this.afAuth.authState.pipe(first()).toPromise();
  }

  async getPetID(){

  }

  async addPet(value){
    // const user = await this.isLoggedIn();
    // if(user) {
    //   console.log("user is logged in");
    //   return this.db.collection('users').doc(user.uid).collection('pets').add({
    //     name: value.name
    //   });
    //   // return this.db.collection('pets').add({
    //   //   name: value.name,
    //   //   nameToSearch: value.name.toLowerCase(),
    //   //
    //   // });
    // } else {
    //   console.log("error adding a pet");
    //   return 'nothing';
    // }


    const user = await this.isLoggedIn();
    if(user) {
      console.log("user is logged in");
      return this.db.collection('pets').add({
        name: value.name
      }).then(docRef => {
        //add the id to the user reference
        this.db.collection('users').doc(user.uid).collection('pets').doc(docRef.id).set({
          name: value.name
        });
        console.log("Document written with ID: ", docRef.id);
      }).catch(function(error) {
        console.error("Error adding document: ", error);
      });
    } else {
      console.log("user is not logged in");
      return 'error';
    }

  }

  getPets(){
    // const user = await this.isLoggedIn();
    // if(user) {
    //   // return this.db.collection('household')
    //   return this.db.collection('pets').snapshotChanges();
    // } else {
    //   console.log("user is not logged in");
    //   return 'error';
    // }
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

  deletePet(data) {
    return this.db.collection('pets').doc(data.payload.doc.id).delete();
 }

  // createHousehold(value){
  //
  //
  // }


}
