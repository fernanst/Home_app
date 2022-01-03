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

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '192.168.1.50',
  port: 9001,
  //path: '/mqtt'
  path: '',
  protocol: 'ws',
}

@NgModule({
  declarations: [
    AppComponent,
    ConfigClimaComponent,
    ConfigPiscinaComponent,
    ConfigIluminacionComponent,
    ConfigEnergiaComponent,
    ConfigModulosComponent,
    MainComponent,
    SensorComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
