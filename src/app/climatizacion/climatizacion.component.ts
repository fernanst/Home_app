import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Router } from '@angular/router';
import { MqttIotService } from '../mqtt-iot.service';

@Component({
  selector: 'app-climatizacion',
  templateUrl: './climatizacion.component.html',
  styleUrls: ['./climatizacion.component.css']
})
export class ClimatizacionComponent implements OnInit {

  private subscription: Subscription;
  topic = 'home/sensors/#';
  msg: any;
  isConnected: boolean = false;
  deviceToggleSubscription : Subscription;
  private value: string;
  private temp_planta_baja: string;
  private temp_salon: string;
  private temp_salon_consigna: string;
  private temp_salon_consigna_2: string;
  private temp_buhardilla_consigna: string;
  private temp_buhardilla: string;
  private temp_exterior: string;
  private temp_number = ['17', '18', '19', '20', '21', '22', '23', '24']
  combo_temp = {_temp_number: this.temp_number}

  constructor(private _router: Router, private _mqttService: MqttService, private mqtt_service: MqttIotService) { 
    _mqttService.connect({username: 'homemontelar', password: 'Fern2170!'});
    this.temp_planta_baja = this.mqtt_service.temp_planta_baja;
    this.temp_salon = this.mqtt_service.temp_salon;
    this.temp_buhardilla = this.mqtt_service.temp_buhardilla
    this.temp_exterior = this.mqtt_service.temp_exterior;
    this.temp_salon_consigna = this.mqtt_service.temp_salon_consigna;
    this.temp_salon_consigna_2 = this.mqtt_service.temp_salon_consigna_2;
    this.temp_buhardilla_consigna = this.mqtt_service.temp_buhardilla_consigna;
  }
  
  ngOnInit(): void {
    //this.subscribeNewTopic();

  }

  isLoaded(){
    return this.temp_buhardilla != null;
  }

  /*ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }*/

  /*subscribeNewTopic(): void { 
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topic).subscribe((message: IMqttMessage) => {
      this.msg = JSON.parse(message.payload.toString());
      var _topic = message.topic;
      console.log("----",_topic,this.msg)
      if (_topic == 'home/sensors/temp_planta_baja') {this.temp_planta_baja = this.msg + '\xa0\xa0ºC';}
      else if (_topic == 'home/sensors/temp_salon') {this.temp_salon = this.msg + '\xa0\xa0\xa0ºC';}
      else if (_topic == 'home/sensors/temp_buhardilla') {this.temp_buhardilla = this.msg + '\xa0\xa0ºC';}
      else if (_topic == 'home/sensors/temp_exterior') {this.temp_exterior = this.msg + '\xa0\xa0\xa0ºC';}
      else if (_topic == 'home/params/temp_salon_consigna') {
          this.temp_salon_consigna = '\xa0\xa0\xa0' + this.msg + '\xa0\xa0ºC';
          this.temp_salon_consigna_2 = this.msg
        }
      else if (_topic == 'home/params/temp_buhardilla_consigna') {this.temp_buhardilla_consigna = '\xa0\xa0\xa0' + this.msg + '\xa0\xa0ºC';}
    });
  }*/

}
