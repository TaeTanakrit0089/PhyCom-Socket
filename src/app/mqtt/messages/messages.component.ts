import {Component} from '@angular/core';
import {MqttService} from '../../mqtt.service';
import {DatePipe, NgForOf, SlicePipe} from '@angular/common';

interface Message {
  topic: string;
  payload: string;
}

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
  messages: Message[] = [];

  constructor(private mqttService: MqttService) {
    this.mqttService.onMessageArrived = (message: any) => {
      this.messages.push({
        topic: message.topic,  // Assuming message has a topic property
        payload: message.payloadString
      });
      console.log('Message arrived:', message.topic, message.payloadString);
    };
  }
}
