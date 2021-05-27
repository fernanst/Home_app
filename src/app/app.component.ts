import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Observable, Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // private mqttClient: Paho.MQTT.Client;
  private subscription: Subscription;
  private subscription2: Subscription;
  private message: String;
  topic_status_output = 'home/#';
  topic_output_m1 = 'home/outputs/modulo1';
  topic_output_m2 = 'home/outputs/modulo2';
  msg: any;
  isConnected: boolean = false;

  controlForm: FormGroup = new FormGroup({
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
    'deviceToggle4': new FormControl(),
    'deviceToggle5': new FormControl()
  });
  outputType:string ;
  deviceToggleSubscription : Subscription;
  enableSwitch: boolean = false; 

  @ViewChild('msglog', { static: true }) msglog: ElementRef;

  constructor(private _mqttService: MqttService) { }

  ngOnInit(): void {
    // Broker connection on startup
    // this.connectToMQTTBroker();
    for (let i = 1; i < 17; i++) {
      this.salida("salida" + i)
    }
    this.subscribeToggle4();
    this.subscribeToggle5();
    this.subscribeNewTopic();
  }

  private salida(salida_name) {
  	this.deviceToggleSubscription = this.controlForm.get(salida_name).valueChanges.subscribe(activate => {
      if (typeof(activate) == "boolean"){
        //var change: string = String(activate);
        var str_json='{"' + salida_name + '":"' + activate + '"}'
        console.log('str_json',str_json)
        this._mqttService.unsafePublish(this.topic_output_m1, str_json, { qos: 1, retain: false })
        console.log('status',activate,this.topic_output_m1)
      }
    })
  }

  private subscribeToggle4() {
  	this.deviceToggleSubscription = this.controlForm.get('deviceToggle4').valueChanges.subscribe(activate => {
      var value:string;
      if (typeof(activate) == "boolean"){
        console.log("##################", activate);
        if (activate) {value = "open"}
        else {value = "close"}
        var str_json='{"val_cascada":"' + value + '"}'
        console.log('str_json',str_json)
        this._mqttService.unsafePublish(this.topic_output_m2, str_json, { qos: 1, retain: false })
        console.log('status',activate)
      }
    })
  }

  private subscribeToggle5() {
  	this.deviceToggleSubscription = this.controlForm.get('deviceToggle5').valueChanges.subscribe(activate => {
      var value:string;
      if (typeof(activate) == "boolean"){
        if (activate) {value = "open"}
        else {value = "close"}
        var str_json='{"val_suelo":"' + activate + '"}'
        console.log('str_json',str_json)
        this._mqttService.unsafePublish(this.topic_output_m2, str_json, { qos: 1, retain: false })
        console.log('status',activate)
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeNewTopic(): void { 
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topic_status_output).subscribe((message: IMqttMessage) => {
      //this.msg = message.payload.toString();
      this.msg = JSON.parse(message.payload.toString());
      var _topic = message.topic;
      //var salida:string = this.msg["salida12"];
      var salida:number;
      console.log(_topic,this.msg)
      if (_topic == 'home/status_input/modulo2') {
        for (var key in this.msg) {
          if (key == 'val_cascada_close' && this.msg[key]=='true'){
            this.controlForm.get('deviceToggle4').setValue(0, {emitEvent: false} );
          } 
          else if (key == 'val_cascada_open' && this.msg[key]=='true') {
            this.controlForm.get('deviceToggle4').setValue(1, {emitEvent: false} );
          }
          if (key == 'val_suelo_close' && this.msg[key]=='true'){
            this.controlForm.get('deviceToggle5').setValue(0, {emitEvent: false} );
          } 
          else if (key == 'val_suelo_open' && this.msg[key]=='true') {
            this.controlForm.get('deviceToggle5').setValue(1, {emitEvent: false} );
          }
          //console.log(key + ":",this.msg[key]);
        }
      }
      else if (_topic == 'home/status_output/modulo1') {
        for (var key in this.msg) {
          if (this.msg[key]=='true' || this.msg[key]=='True') {salida = 1}
          else {salida = 0}
          if (key!="device"){
            this.controlForm.get(key).setValue(salida, {emitEvent: false} );
            //console.log(key + ":",this.msg[key],salida);
          }
        }
      }
    });
  }

  sendmsg(envio): void {
    // use unsafe publish for non-ssl websockets
    envio = '{"' + envio + '":"change"}'
    this._mqttService.unsafePublish(this.topic_output_m1, envio, { qos: 1, retain: false })
    this.msg = ''
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
}
