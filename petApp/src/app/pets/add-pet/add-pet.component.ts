import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';


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
    public firebaseService: FirebaseService
    ) { }

    onSubmit(value){
      this.firebaseService.addPet(value)
      .then(
        res => {
          this.router.navigate(['/pets']);
        }
      )
    }

  confirmSelection() {
    this.dialogRef.close(this.name);
  }

  ngOnInit() {

    this.addPetGroup = this.fb.group ({
      name: [''],
      need1: [''],
      need2: [''],
      time1: [''],
      time2: ['']

    });

  }

}
