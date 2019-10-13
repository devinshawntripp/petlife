import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- NgModel lives here
import { MatInputModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { OwnersComponent } from './owners/owners/owners.component';
import { PetsComponent } from './pets/pets/pets.component';
import { SettingsComponent } from './settings/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    OwnersComponent,
    PetsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    NgbModule

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
