import {Component} from '@angular/core';
import {MqttService} from '../../mqtt.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./publish.component.css']
})
export class PublishComponent {
  topic: string = 'testtopic/1';
  payload: string = '';
  qos: number = 0;
  retain: boolean = false;

  constructor(protected mqttService: MqttService) {
  }

  publishMessage(): void {
    this.mqttService.sendMessage(this.topic, this.payload);
  }
}
