import { Component, OnInit, ComponentFactoryResolver,ViewContainerRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Router } from '@angular/router';
import { MqttIotService } from '../mqtt-iot.service';
import { ConfigClimaComponent } from '../config-clima/config-clima.component'

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  private subscription: Subscription;
  topic_output_m1 = 'home/outputs/modulo1';
  topic_output_m4 = 'home/outputs/modulo4';
  topic_status_output_m1 = 'home/status_output/modulo1';
  topic_status_output_m4 = 'home/status_output/modulo4';
  msg: any;
  isConnected: boolean = false;
  deviceToggleSubscription_m1 : Subscription;
  deviceToggleSubscription_m4 : Subscription;

  controlForm1: FormGroup = new FormGroup({
    'salida1': new FormControl(),
    'salida2': new FormControl(),
    'salida3': new FormControl(),
    'salida4': new FormControl(),
    'salida5': new FormControl(),
    'salida6': new FormControl(),
    'salida7': new FormControl(),
    'salida8': new FormControl(),
    'salida9': new FormControl(),
    'salida10': new FormControl(),
    'salida11': new FormControl(),
    'salida12': new FormControl(),
    'salida13': new FormControl(),
    'salida14': new FormControl(),
    'salida15': new FormControl(),
    'salida16': new FormControl(),
    'L_exterior': new FormControl()
  });

  controlForm4: FormGroup = new FormGroup({
    'salida1': new FormControl(),
    'salida2': new FormControl(),
    'salida3': new FormControl(),
    'salida4': new FormControl(),
    'salida5': new FormControl(),
    'salida6': new FormControl(),
    'salida7': new FormControl(),
    'salida8': new FormControl(),
    'salida9': new FormControl(),
    'salida10': new FormControl(),
    'salida11': new FormControl(),
    'salida12': new FormControl(),
    'salida13': new FormControl(),
    'salida14': new FormControl(),
    'salida15': new FormControl(),
    'salida16': new FormControl()
  });

  constructor(private componentFactoryResolver: ComponentFactoryResolver,private viewContainerRef: ViewContainerRef,private _router: Router, private _mqttService: MqttService, private mqtt_service: MqttIotService) { 
    _mqttService.connect({username: 'homemontelar', password: 'Fern2170!'});
    //_mqttService.connect();
  }
  
  ngOnInit(): void {
    this.subscribeNewTopic_m1();
    this.subscribeNewTopic_m4();
    for (let i = 1; i < 17; i++) {
      this.salida_m1("salida" + i)
    }
    for (let i = 1; i < 17; i++) {
      this.salida_m4("salida" + i)
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(ConfigClimaComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();

  }

  isLoaded(){
    return this.controlForm1.get("salida12") != null;
  }

  private salida_m1(salida_name) {
  	this.deviceToggleSubscription_m1 = this.controlForm1.get(salida_name).valueChanges.subscribe(activate => {
      if (typeof(activate) == "boolean"){
        var str_json='{"' + salida_name + '":"' + activate + '"}'
        //console.log('str_json modulo1',str_json)
        //this._mqttService.unsafePublish(this.topic_output_m1, str_json, { qos: 1, retain: false })
        this.mqtt_service.activateOutput(this.topic_output_m1,salida_name,activate);
        //console.log('status',activate,this.topic_output_m1)
      }
    })
  }

  private salida_m4(salida_name) {
  	this.deviceToggleSubscription_m4 = this.controlForm4.get(salida_name).valueChanges.subscribe(activate => {
      if (typeof(activate) == "boolean"){
        var str_json='{"' + salida_name + '":"' + activate + '"}'
        //console.log('str_json modulo4',str_json)
        //this._mqttService.unsafePublish(this.topic_output_m4, str_json, { qos: 1, retain: false })
        this.mqtt_service.activateOutput(this.topic_output_m4,salida_name,activate);
        //console.log('status',activate,this.topic_output_m4)
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeNewTopic_m1(): void { 
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topic_status_output_m1).subscribe((message: IMqttMessage) => {
      this.msg = JSON.parse(message.payload.toString());
      var _topic = message.topic;
      var salida:number;
      console.log("----",_topic,this.msg)
      if (_topic == 'home/status_output/modulo1') {
        for (var key in this.msg) {
          if (key != "device"){
            if (this.msg[key]=='true' || this.msg[key]=='True') {salida = 1}
            else {salida = 0}
            this.controlForm1.get(key).setValue(salida, {emitEvent: false} );
          }
        }
      }
    });
  }

  subscribeNewTopic_m4(): void { 
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topic_status_output_m4).subscribe((message: IMqttMessage) => {
      this.msg = JSON.parse(message.payload.toString());
      var _topic = message.topic;
      var salida: number;
      console.log("----",_topic,this.msg)
      if (_topic == 'home/status_output/modulo4') {
        for (var key in this.msg) {
          if (key != "device"){
            if (this.msg[key]=='true' || this.msg[key]=='True') {salida = 1}
            else {salida = 0}
            this.controlForm4.get(key).setValue(salida, {emitEvent: false} );
          }
        }
      }
    });
  }

}
