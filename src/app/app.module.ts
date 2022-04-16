import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { IMqttMessage, MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { ConfigClimaComponent } from './config-clima/config-clima.component';
import { ConfigPiscinaComponent } from './config-piscina/config-piscina.component';
import { ConfigIluminacionComponent } from './config-iluminacion/config-iluminacion.component';
import { ConfigEnergiaComponent } from './config-energia/config-energia.component';
import { ConfigModulosComponent } from './config-modulos/config-modulos.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { SensorComponent } from './sensor/sensor.component';
import { SalonComponent } from './salon/salon.component';
import { EnergiaComponent } from './energia/energia.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ClimatizacionComponent } from './climatizacion/climatizacion.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '192.168.1.50',
  port: 9001,
  //path: '/mqtt'
  path: '',
  protocol: 'ws',
}

const ENTRYCOMPONENTS = [
  EnergiaComponent,
  ClimatizacionComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ConfigClimaComponent,
    ConfigPiscinaComponent,
    ConfigIluminacionComponent,
    ConfigEnergiaComponent,
    ConfigModulosComponent,
    MainComponent,
    SensorComponent,
    SalonComponent,
    EnergiaComponent,
    DasboardComponent,
    ClimatizacionComponent,
    ENTRYCOMPONENTS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ENTRYCOMPONENTS]
})
export class AppModule { }
