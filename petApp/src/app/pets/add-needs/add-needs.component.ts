import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-needs',
  templateUrl: './add-needs.component.html',
  styleUrls: ['./add-needs.component.css']
})
export class AddNeedsComponent implements OnInit {

  addNeedGroup: FormGroup;
  name: string;
  
  constructor(
    public dialogRef: MatDialogRef<AddNeedsComponent>,
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  onSubmit(value){
    this.firebaseService.createNeed(value)
    .then(
      res => {
        this.router.navigate(['/pets']);
      }
    )
    this.dialogRef.close(this.name);
  }

  confirmSelection() {
    this.dialogRef.close(this.name);
  }


  ngOnInit() {
    this.addNeedGroup = this.fb.group ({
      what: [''],
      time: [''],
      day: [''],
      pet: ['']
    });
  }

}
