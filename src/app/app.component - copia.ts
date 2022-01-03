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
  topic_output_m3 = 'home/outputs/modulo3';
  topic_output_m4 = 'home/outputs/modulo4';
  topic_output_rbaño = 'home/outputs/raspibaño';
  topic_params = 'home/params';
  topic_temp_salon_consigna = "home/params/temp_salon_consigna"
  topic_temp_buhardilla_consigna = "home/params/temp_buhardilla_consigna"

  private temp_number = ['17', '18', '19', '20', '21', '22', '23', '24']

  combo_temp = {
    _temp_number: this.temp_number,
  }

  msg: any;
  isConnected: boolean = false;
  public value: string;
  public power: string;
  public current : string;
  public voltage: string;
  public frequency: string;
  public fp: string
  public temp_planta_baja:string;
  public temp_salon:string;
  public temp_salon_consigna: string;
  public temp_salon_consigna_2: string;
  public temp_buhardilla_consigna: string;
  public temp_buhardilla:string;
  public temp_exterior:string;

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
    'deviceToggle4': new FormControl(),
    'deviceToggle5': new FormControl(),
    'deviceToggle6': new FormControl(),
    'deviceToggle7': new FormControl(),
    'L_exterior': new FormControl()
  });
  
  controlForm2: FormGroup = new FormGroup({
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
  });

  controlForm3: FormGroup = new FormGroup({
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
  });
  outputType:string ;
  deviceToggleSubscription : Subscription;
  enableSwitch: boolean = false; 

  @ViewChild('msglog', { static: true }) msglog: ElementRef;

  constructor(private _mqttService: MqttService) { 
    _mqttService.connect({username: 'homemontelar', password: 'Fern2170!'});
    //_mqttService.connect();
  }
  
  ngOnInit(): void {
    // Broker connection on startup
    // this.connectToMQTTBroker();
    for (let i = 1; i < 17; i++) {
      this.salida("salida" + i)
      this.salida_m3("salida" + i)
      this.salida_m4("salida" + i)
    }
    this.subscribeToggle4();
    this.subscribeToggle5();
    this.subscribeToggle6();
    this.subscribeToggle7();
    this.subscribeNewTopic();
    this.subscribeL_exterior();
    //this.temp_salon_consigna=this.
  }

  newCourse : string = '';
  allCourses : string[] =  ['17', '18', '19', '20', '21', '22', '23', '24'];
  selectTemp: string  = '0';
  temp_seleccionada: string  = '';

  public changeTemp() {
    /*this.status_modo=modo;
    this.control.changeParam('device_mode4', modo)*/
    this.temp_seleccionada = this.selectTemp;
    console.log(this.temp_seleccionada);
  }

  private salida(salida_name) {
  	this.deviceToggleSubscription = this.controlForm1.get(salida_name).valueChanges.subscribe(activate => {
      if (typeof(activate) == "boolean"){
        //var change: string = String(activate);
        var str_json='{"' + salida_name + '":"' + activate + '"}'
        console.log('str_json',str_json)
        this._mqttService.unsafePublish(this.topic_output_m1, str_json, { qos: 1, retain: false })
        console.log('status',activate,this.topic_output_m1)
      }
    })
  }

  private salida_m3(salida_name) {
  	this.deviceToggleSubscription = this.controlForm2.get(salida_name).valueChanges.subscribe(activate => {
      if (typeof(activate) == "boolean"){
        //var change: string = String(activate);
        var str_json='{"' + salida_name + '":"' + activate + '"}'
        console.log('str_json',str_json)
        this._mqttService.unsafePublish(this.topic_output_m3, str_json, { qos: 1, retain: false })
        console.log('status',activate,this.topic_output_m3)
      }
    })
  }

  private salida_m4(salida_name) {
  	this.deviceToggleSubscription = this.controlForm3.get(salida_name).valueChanges.subscribe(activate => {
      if (typeof(activate) == "boolean"){
        //var change: string = String(activate);
        var str_json='{"' + salida_name + '":"' + activate + '"}'
        console.log('str_json',str_json)
        this._mqttService.unsafePublish(this.topic_output_m4, str_json, { qos: 1, retain: false })
        console.log('status',activate,this.topic_output_m4)
      }
    })
  }

  private subscribeToggle4() {
  	this.deviceToggleSubscription = this.controlForm1.get('deviceToggle4').valueChanges.subscribe(activate => {
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
  	this.deviceToggleSubscription = this.controlForm1.get('deviceToggle5').valueChanges.subscribe(activate => {
      var value:string;
      if (typeof(activate) == "boolean"){
        if (activate) {value = "open"}
        else {value = "close"}
        var str_json='{"val_suelo":"' + value + '"}'
        console.log('str_json',str_json)
        this._mqttService.unsafePublish(this.topic_output_m2, str_json, { qos: 1, retain: false })
        console.log('status',activate)
      }
    })
  }

  private subscribeToggle6() {
  	this.deviceToggleSubscription = this.controlForm1.get('deviceToggle6').valueChanges.subscribe(activate => {
      var value:string;
      if (typeof(activate) == "boolean"){
        if (activate) {value = "true"}
        else {value = "false"}
        var str_json='{"suelo_refres_auto":"' + value + '"}'
        console.log('str_json',str_json)
        this._mqttService.unsafePublish(this.topic_params, str_json, { qos: 1, retain: true })
        console.log('status',activate)
      }
    })
  }

  private subscribeToggle7() {
  	this.deviceToggleSubscription = this.controlForm1.get('deviceToggle7').valueChanges.subscribe(activate => {
      var value:string;
      if (typeof(activate) == "boolean"){
        if (activate) {value = "true"}
        else {value = "false"}
        var str_json='{"cascada":"' + value + '"}'
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
      //console.log(message.payload.toString());
      this.msg = JSON.parse(message.payload.toString());
      var _topic = message.topic;
      //var salida:string = this.msg["salida12"];
      var salida:number;
      console.log("----",_topic,this.msg)
      if (_topic == 'home/status_input/modulo2') {
        for (var key in this.msg) {
          if (key == 'val_cascada_close' && this.msg[key]=='true'){
            this.controlForm1.get('deviceToggle4').setValue(0, {emitEvent: false} );
          } 
          else if (key == 'val_cascada_open' && this.msg[key]=='true') {
            this.controlForm1.get('deviceToggle4').setValue(1, {emitEvent: false} );
          }
          if (key == 'val_suelo_close' && this.msg[key]=='true'){
            this.controlForm1.get('deviceToggle5').setValue(0, {emitEvent: false} );
          } 
          else if (key == 'val_suelo_open' && this.msg[key]=='true') {
            this.controlForm1.get('deviceToggle5').setValue(1, {emitEvent: false} );
          }
          //console.log(key + ":",this.msg[key]);
        }
      }
      else if (_topic == 'home/status_output/modulo1') {
        for (var key in this.msg) {
          if (this.msg[key]=='true' || this.msg[key]=='True') {salida = 1}
          else {salida = 0}
          if (key!="device"){
            this.controlForm1.get(key).setValue(salida, {emitEvent: false} );
            //console.log(key + ":",this.msg[key],salida);
          }
        }
      }
      else if (_topic == 'home/status_output/modulo3') {
        for (var key in this.msg) {
          if (this.msg[key]=='true' || this.msg[key]=='True') {salida = 1}
          else {salida = 0}
          if (key!="device"){
            this.controlForm2.get(key).setValue(salida, {emitEvent: false} );
            //console.log(key + ":",this.msg[key],salida);
          }
        }
      }

      else if (_topic == 'home/params') {
        for (var key in this.msg) {
          if (key == 'suelo_refres_auto' && this.msg[key]=='true'){
            this.controlForm1.get('deviceToggle6').setValue(1, {emitEvent: false} );
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

  private subscribeL_exterior() {
    this.deviceToggleSubscription = this.controlForm1.get('L_exterior').valueChanges.subscribe(activate => {
      var value:string;
      if (typeof(activate) == "boolean"){
        if (activate) {value = "true"}
        else {value = "false"}
        //var change: string = String(activate);
        var str_json='{"salida4":"' + activate + '"}'
        console.log('str_json',str_json)
        this._mqttService.unsafePublish(this.topic_output_rbaño, str_json, { qos: 1, retain: false })
        console.log('status',activate,this.topic_output_rbaño)
      }
    })
  }

  subir(motor) {
    if (motor === 1){
     this.value = '{"cobertor1":"up"}'
     this._mqttService.unsafePublish(this.topic_output_rbaño, this.value, { qos: 1, retain: false })
     console.log('subir motor1')
    }
    else if (motor === 2) {
      this.value = '{"cobertor2":"up"}'
      this._mqttService.unsafePublish(this.topic_output_rbaño, this.value, { qos: 1, retain: false })
      console.log('subir motor2')
    } 
  }

  parar(motor) {
    if (motor === 1){
      this.value = '{"cobertor1":"stop"}'
      this._mqttService.unsafePublish(this.topic_output_rbaño, this.value, { qos: 1, retain: false })
      console.log('stop motor1')
     }
     else if (motor === 2) {
      this.value = '{"cobertor2":"stop"}'
      this._mqttService.unsafePublish(this.topic_output_rbaño, this.value, { qos: 1, retain: false })
      console.log('stop motor2')
     } 
  }

  bajar(motor) {
    if (motor === 1){
      this.value = '{"cobertor1":"down"}'
      this._mqttService.unsafePublish(this.topic_output_rbaño, this.value, { qos: 1, retain: false })
      console.log('bajar motor1')
     }
     else if (motor === 2) {
      this.value = '{"cobertor2":"down"}'
      this._mqttService.unsafePublish(this.topic_output_rbaño, this.value, { qos: 1, retain: false })
      console.log('bajar motor2')
     } 
  }
}
