import { Injectable } from '@angular/core';
import {Subscription, BehaviorSubject} from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root'
})
export class MqttIotService {

  private subscription: Subscription;
  topic_all = 'home/#';
  topic_output_m1 = 'home/outputs/modulo1';
  topic_output_m2 = 'home/outputs/modulo2';
  topic_output_m3 = 'home/outputs/modulo3';
  topic_output_m4 = 'home/outputs/modulo4';
  topic_output_rbaño = 'home/outputs/raspibaño';
  topic_params = 'home/params';
  topic_temp_salon_consigna = "home/params/temp_salon_consigna"
  topic_temp_buhardilla_consigna = "home/params/temp_buhardilla_consigna"
  msg: any;
  isConnected: boolean = false;
  modulo1: any;
  public value: string;
  public power: string;
  public current : string;
  public voltage: string;
  public frequency: string;
  public fp = null;
  public temp_planta_baja:string;
  public temp_salon:string;
  public temp_salon_consigna: string;
  public temp_salon_consigna_2: string;
  public temp_buhardilla_consigna: string;
  public temp_buhardilla:string;
  public temp_exterior:string;

  constructor(private _mqttService: MqttService) { 
    _mqttService.connect({username: 'homemontelar', password: 'Fern2170!'});
  }

  init(){
    this.subscribeNewTopic();
  }

  activateOutput(topic: string, output: number, activate: boolean )
  {
    //console.log("activate output");
    var str_json='{"' + output + '":"' + activate + '"}'
    this._mqttService.unsafePublish(topic, str_json, { qos: 1, retain: false })
  }

  subscribeNewTopic(): void { 
    console.log('inside subscribe new topic')
    
    this.subscription = this._mqttService.observe(this.topic_all).subscribe((message: IMqttMessage) => {
      console.log("-----------------", message.payload.toString());
      this.msg = JSON.parse(message.payload.toString());
      var _topic = message.topic;
      //var salida:string = this.msg["salida12"];
      var salida:number;
      console.log("----",_topic,this.msg)
      if (_topic == 'home/status_input/modulo2') {
        for (var key in this.msg) {
          if (key == 'val_cascada_close' && this.msg[key]=='true'){
            //this.controlForm1.get('deviceToggle4').setValue(0, {emitEvent: false} );
          } 
          else if (key == 'val_cascada_open' && this.msg[key]=='true') {
            //this.controlForm1.get('deviceToggle4').setValue(1, {emitEvent: false} );
          }
          if (key == 'val_suelo_close' && this.msg[key]=='true'){
            //this.controlForm1.get('deviceToggle5').setValue(0, {emitEvent: false} );
          } 
          else if (key == 'val_suelo_open' && this.msg[key]=='true') {
            //this.controlForm1.get('deviceToggle5').setValue(1, {emitEvent: false} );
          }
          //console.log(key + ":",this.msg[key]);
        }
      }
      else if (_topic == 'home/status_output/modulo1') {
        for (var key in this.msg) {
          if (this.msg[key]=='true' || this.msg[key]=='True') {salida = 1}
          else {salida = 0}
          if (key!="device"){
            //this.controlForm1.get(key).setValue(salida, {emitEvent: false} );
            //console.log(key + ":",this.msg[key],salida);
          }
        }
      }
      else if (_topic == 'home/status_output/modulo3') {
        for (var key in this.msg) {
          if (this.msg[key]=='true' || this.msg[key]=='True') {salida = 1}
          else {salida = 0}
          if (key!="device"){
            //this.controlForm2.get(key).setValue(salida, {emitEvent: false} );
            //console.log(key + ":",this.msg[key],salida);
          }
        }
      }

      else if (_topic == 'home/params') {
        for (var key in this.msg) {
          if (key == 'suelo_refres_auto' && this.msg[key]=='true'){
            //this.controlForm1.get('deviceToggle6').setValue(1, {emitEvent: false} );
          }
        }
      }

      else if (_topic == 'home/sensors/temp_planta_baja') {this.temp_planta_baja = this.msg + '\xa0\xa0ºC';}
      else if (_topic == 'home/sensors/temp_salon') {this.temp_salon = this.msg + '\xa0\xa0\xa0ºC';}
      else if (_topic == 'home/sensors/temp_buhardilla') {this.temp_buhardilla = this.msg + '\xa0\xa0ºC';}
      else if (_topic == 'home/sensors/temp_exterior') {this.temp_exterior = this.msg + '\xa0\xa0\xa0ºC';}
      else if (_topic == 'home/params/temp_salon_consigna') {
          this.temp_salon_consigna = '\xa0\xa0\xa0' + this.msg + '\xa0\xa0ºC';
          this.temp_salon_consigna_2 = this.msg
        }
      else if (_topic == 'home/params/temp_buhardilla_consigna') {this.temp_buhardilla_consigna = '\xa0\xa0\xa0' + this.msg + '\xa0\xa0ºC';}
      else if (_topic == 'home/energia/power') { this.power = this.msg + '\xa0\xa0\xa0W';}
      else if (_topic == 'home/energia/voltage') { this.voltage = this.msg + '\xa0\xa0\xa0V';}
      else if (_topic == 'home/energia/frequency') { this.frequency = this.msg + '\xa0\xa0\xa0Hz';}
      else if (_topic == 'home/energia/current') { this.current = this.msg + '\xa0\xa0\xa0A';}
      else if (_topic == 'home/energia/fp') { this.fp = this.msg + '\xa0\xa0\xa0\xa0\xa0\xa0';}
    });
  }
}
