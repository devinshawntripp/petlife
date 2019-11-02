import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { OwnersComponent } from './owners/owners/owners.component';
import { PetsComponent } from './pets/pets/pets.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthGService } from './services/auth-g.service';
import { HouseholdComponent } from './register/household/household.component';


const routes: Routes = [
  { path: 'dash', component: DashboardComponent, canActivate: [AuthGService] },
  { path: 'owners', component: OwnersComponent, canActivate: [AuthGService]},
  { path: 'pets', component: PetsComponent, canActivate: [AuthGService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'household', component: HouseholdComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
