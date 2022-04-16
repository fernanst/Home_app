import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClimatizacionComponent } from './climatizacion/climatizacion.component';
import { ConfigClimaComponent } from './config-clima/config-clima.component';
import { EnergiaComponent } from './energia/energia.component';
import { MainComponent } from './main/main.component';
import { SalonComponent } from './salon/salon.component';

const routes: Routes = [

  /*{ path: '', redirectTo: '/main', pathMatch: 'full' },*/
  
    {path: '', redirectTo: '/main', pathMatch: 'full' },
    {path: 'main', component: MainComponent, 
      children: [
        { path: 'salon', component: SalonComponent},
        { path: 'config-clima', component: ConfigClimaComponent },
        { path: 'energia', component: EnergiaComponent },
        { path: 'clima', component: ClimatizacionComponent }
      ]
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }