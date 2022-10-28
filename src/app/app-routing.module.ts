import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
