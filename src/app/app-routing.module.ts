import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigClimaComponent } from './config-clima/config-clima.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [

  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent},
  { path: 'config-clima', component: ConfigClimaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
