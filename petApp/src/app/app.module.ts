import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- NgModel lives here
import { MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { OwnersComponent } from './owners/owners/owners.component';
import { PetsComponent } from './pets/pets/pets.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { RegisterComponent } from './register/register.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { AddPetComponent } from './pets/add-pet/add-pet.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { AuthGService } from './services/auth-g.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletePetComponent } from './pets/delete-pet/delete-pet/delete-pet.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { EditPetComponent } from './pets/edit-pet/edit-pet.component';
import { AuthService } from './services/auth.service';
import { AddNeedsComponent } from './pets/add-needs/add-needs.component';
import { MatNativeDateModule } from '@angular/material'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HouseholdComponent } from './register/household/household.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddOwnerComponent } from './owners/add-owner/add-owner.component';
import { DeleteOwnerComponent } from 'src/app/owners/delete-owner/delete-owner.component';
import { ScheduleComponent } from './schedule/schedule.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    OwnersComponent,
    PetsComponent,
    SettingsComponent,
    RegisterComponent,
    AddPetComponent,
    DeletePetComponent,
    EditPetComponent,
    AddNeedsComponent,
    HouseholdComponent,
    AddOwnerComponent,
    DeleteOwnerComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    NgbModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
    
  ],
  providers: [ FirebaseService, AuthService, AuthGService ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPetComponent,
    DeletePetComponent,
    EditPetComponent,
    AddNeedsComponent,
    AddNeedsComponent,
    DeleteOwnerComponent,
    AddOwnerComponent
  ]
})
export class AppModule { }
