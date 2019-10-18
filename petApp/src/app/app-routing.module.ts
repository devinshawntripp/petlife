import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component'
import { OwnersComponent } from './owners/owners/owners.component'
import { PetsComponent } from './pets/pets/pets.component'
import { SettingsComponent } from './settings/settings/settings.component'
import { LoginComponent } from './login/login.component'


const routes: Routes = [
  { path: 'dash', component: DashboardComponent },
  { path: 'owners', component: OwnersComponent},
  { path: 'pets', component: PetsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
