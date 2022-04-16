import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Router } from '@angular/router';
import { MqttIotService } from '../mqtt-iot.service';

@Component({
  selector: 'app-energia',
  templateUrl: './energia.component.html',
  styleUrls: ['./energia.component.css']
})
export class EnergiaComponent implements OnInit {

  private subscription: Subscription;
  topic_energia = 'home/energia/#';
  msg: any;
  isConnected: boolean = false;
  deviceToggleSubscription : Subscription;
  private value: string;
  private power: string;
  private current : string;
  private voltage: string;
  private frequency: string;
  private fp = null;

  constructor(private _router: Router, private _mqttService: MqttService, private mqtt_service: MqttIotService) { 
    _mqttService.connect({username: 'homemontelar', password: 'Fern2170!'});
    this.power = this.mqtt_service.power;
    this.voltage = this.mqtt_service.voltage;
    this.frequency = this.mqtt_service.frequency;
    this.current = this.mqtt_service.current;
    this.fp = this.mqtt_service.fp;
  }
  
  ngOnInit(): void {
    //this.subscribeNewTopic();
  }

  isLoaded(){
    return this.fp != null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeNewTopic(): void { 
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topic_energia).subscribe((message: IMqttMessage) => {
      this.msg = JSON.parse(message.payload.toString());
      var _topic = message.topic;
      console.log("----",_topic,this.msg)
      if (_topic == 'home/energia/power') { this.power = this.msg + '\xa0\xa0\xa0W';}
      else if (_topic == 'home/energia/voltage') { this.voltage = this.msg + '\xa0\xa0\xa0V';}
      else if (_topic == 'home/energia/frequency') { this.frequency = this.msg + '\xa0\xa0\xa0Hz';}
      else if (_topic == 'home/energia/current') { this.current = this.msg + '\xa0\xa0\xa0A';}
      else if (_topic == 'home/energia/fp') { this.fp = this.msg + '\xa0\xa0\xa0\xa0\xa0\xa0';}
    });
  }

}
