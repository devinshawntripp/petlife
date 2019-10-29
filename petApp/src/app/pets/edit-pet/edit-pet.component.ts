import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {

  editPetGroup: FormGroup;
  item: any;
  
  constructor(
    public dialogRef: MatDialogRef<EditPetComponent>,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public firebaseService: FirebaseService
  ) { }

  onSubmit(value){
    value.name = this.item.name;
    value.need1 = this.item.need1
    value.time1 = this.item.time1
    value.need2 = this.item.need2
    value.time2 = this.item.time2
    this.firebaseService.editPet(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/pets']);
      }
    )
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['pets'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    })
  }

  confirmSelection() {
    this.dialogRef.close();
  }

}
