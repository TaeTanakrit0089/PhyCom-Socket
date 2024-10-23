import {Component} from '@angular/core';
import {MqttConnectionComponent} from './connection/connection.component';
import {PublishComponent} from './publish/publish.component';
import {SubscriptionComponent} from './subscription/subscription.component';
import {MessagesComponent} from './messages/messages.component';

@Component({
  selector: 'app-mqtt',
  standalone: true,
  imports: [
    MqttConnectionComponent,
    PublishComponent,
    SubscriptionComponent,
    MessagesComponent
  ],
  templateUrl: './mqtt.component.html',
  styleUrl: './mqtt.component.css'
})
export class MqttDashboard {

}
