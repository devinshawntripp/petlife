import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit{

  addPetGroup: FormGroup;
  Needs : []
  name: string;

  constructor(
    public dialogRef: MatDialogRef<AddPetComponent>,
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService,
    public authService: AuthService
    ) { }

    onSubmit(value){
      this.authService.addPet(value)
      .then(
        res => {
          //need to add this pet ID to the household
          this.router.navigate(['/pets']);
        }
      )
      this.dialogRef.close(this.name);
    }

  confirmSelection() {
    this.dialogRef.close(this.name);
  }

  ngOnInit() {

    this.addPetGroup = this.fb.group ({
      name: [''],
      species: [''],
    });

  }

}
