import {Component} from '@angular/core';
import {MqttService} from '../../mqtt.service';
import {DatePipe, NgForOf, SlicePipe} from '@angular/common';

interface Message {
  topic: string;
  payload: string;
  arrival: Date;
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
  reversedMessages: Message[] = []; // The reversed array of messages

  constructor(private mqttService: MqttService) {
    this.mqttService.onMessageArrived = (message: any) => {
      this.messages.push({
        topic: message.topic,  // Assuming message has a topic property
        payload: message.payloadString,
        arrival: new Date()
      });
      console.log('Message arrived:', message.topic, message.payloadString);
      this.reversedMessages = [...this.messages].reverse();
    };
  }
}
