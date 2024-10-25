import {Component} from '@angular/core';
import {MqttService} from '../../mqtt.service';
import {FormsModule} from '@angular/forms';
import { Subscription } from 'rxjs';


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
  private connectionSubscription!: Subscription;
  isConnected: boolean = false;

  constructor(protected mqttService: MqttService) {
    this.connectionSubscription = this.mqttService.isConnectedGlobal$.subscribe(
      (connecting) => {
        this.isConnected = connecting;
      }
    );
  }

  publishMessage(): void {
    this.mqttService.sendMessage(this.topic, this.payload);
  }

  ngOnDestroy(): void {
    this.connectionSubscription.unsubscribe();
  }
}
