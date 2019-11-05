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
  constructor(public db: AngularFirestore,
    private afAuth: AngularFireAuth) {

  }

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


    const user = await this.isLoggedIn();
    if(user) {
      console.log("user is logged in");
      return this.db.collection('household').add({

      }).then(householdRef => {

        this.db.collection('household').doc(householdRef.id).collection('pets').add({
          name: value.name



        }).then(petRef => {
          this.db.collection('users').doc(user.uid).collection('household').doc(householdRef.id).collection('pets').doc(petRef.id).set({
            name: value.name
          })



        });





        //add the id to the user reference

        console.log("Document written with ID: ", householdRef.id);
      }).catch(function(error) {
        console.error("Error adding document: ", error);
      });
    } else {
      console.log("user is not logged in");
      return 'error';
    }

  }

  getPets(){
    return this.db.collection('pets').snapshotChanges();
  }


  getUserHouseholdID() {
    return this.db.collection('users').doc()
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

  deletePet(data, householdid) {
    //get the id of household of the current user then delete the pet from the household
    return this.db.collection('household').doc(householdid).collection('pets').doc(data.payload.doc.id).delete();
    // return this.db.collection('pets').doc(data.payload.doc.id).delete();
 }

  // createHousehold(value){
  //
  //
  // }


}
