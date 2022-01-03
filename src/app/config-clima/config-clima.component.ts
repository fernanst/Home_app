import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Observable, Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-config-clima',
  templateUrl: './config-clima.component.html',
  styleUrls: ['./config-clima.component.css']
})
export class ConfigClimaComponent implements OnInit {

  topic_params = 'home/params/#';
  public temp_planta_baja:string;
  public temp_salon:string;
  public temp_salon_consigna: string;
  public temp_salon_consigna_2: string;
  public temp_buhardilla_consigna: string;
  public temp_buhardilla:string;
  public temp_exterior:string;
  public temp_seleccionada: string  = '';
  public selectTemp: string  = '0';
  msg: any;
  isConnected: boolean = false;
  deviceToggleSubscription : Subscription;

  private temp_number = ['17', '18', '19', '20', '21', '22', '23', '24']

  combo_temp = {_temp_number: this.temp_number}

  controlForm11: FormGroup = new FormGroup({
    'control_temp_buhardilla': new FormControl(),
    'control_temp_planta_baja': new FormControl(),
  })

  @ViewChild('msglog', { static: true }) msglog: ElementRef;

  constructor(private _mqttService: MqttService) { 
    _mqttService.connect({username: 'homemontelar', password: 'Fern2170!'});
  }

  ngOnInit() {
    this.subscribeNewTopic();
    this.deviceToggle("control_temp_buhardilla");
    this.deviceToggle("control_temp_planta_baja");
  }

  private deviceToggle(salida_name) {
  	this.deviceToggleSubscription = this.controlForm11.get(salida_name).valueChanges.subscribe(activate => {
      if (typeof(activate) == "boolean"){
        var value: string = String(activate);
        this._mqttService.unsafePublish("home/params/" + salida_name, value, { qos: 1, retain: true })
        console.log('status',activate,"home/params/" + salida_name)
      }
    })
  }

  public changeTemp(selectTemp_2: string) {
    /*this.status_modo=modo;
    this.control.changeParam('device_mode4', modo)*/
    this.temp_seleccionada = selectTemp_2;
    console.log(this.temp_seleccionada);
  }

  onConnected(): void {
    this.logMsg('Connected to broker!');
    this.isConnected = true;
  }

  logMsg(message): void {
    this.msglog.nativeElement.innerHTML += '<br><hr>' + message;
  }

  clear(): void {
    this.msglog.nativeElement.innerHTML = '';
  }

  subscribeNewTopic(): void { 
    console.log('inside subscribe new topic')
    this._mqttService.observe(this.topic_params).subscribe((message: IMqttMessage) => {
      this.msg = JSON.parse(message.payload.toString());
      var _topic = message.topic;
      console.log("----",_topic,this.msg)
      if (_topic == 'home/params/control_temp_buhardilla') {
        if (this.msg){this.controlForm11.get('control_temp_buhardilla').setValue(1, {emitEvent: false} );}
        else {this.controlForm11.get('control_temp_buhardilla').setValue(0, {emitEvent: false} );}
      }
      else if (_topic == 'home/params/control_temp_planta_baja') {
        if (this.msg){this.controlForm11.get('control_temp_planta_baja').setValue(1, {emitEvent: false} );}
        else {this.controlForm11.get('control_temp_planta_baja').setValue(0, {emitEvent: false} );}
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
    });
  }
}
