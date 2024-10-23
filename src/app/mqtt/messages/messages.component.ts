import { Component } from '@angular/core';
import { MqttService } from '../../mqtt.service';
import {DatePipe, NgForOf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  standalone: true,
  imports: [
    NgForOf,
    SlicePipe,
    DatePipe
  ],
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages: string[] = [];

  constructor(private mqttService: MqttService) {
    this.mqttService.onMessageArrived = (message: any) => {
      this.messages.push(message.payloadString);
      console.log('Message arrived:', message.payloadString);
    };
  }
}
