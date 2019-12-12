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
import { ScheduleComponent } from './schedule/schedule.component'
import { AuthService } from './services/auth.service';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToItems = () => redirectLoggedInTo(['dash']);

const routes: Routes = [
  { path: 'dash', component: DashboardComponent, canActivate: [AuthService] },
  { path: 'owners', component: OwnersComponent, canActivate: [AuthService]},
  { path: 'pets', component: PetsComponent, canActivate: [AuthService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'household', component: HouseholdComponent, canActivate: [AuthService] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthService] },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
