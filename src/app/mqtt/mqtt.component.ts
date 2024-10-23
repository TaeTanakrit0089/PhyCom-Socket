import {Component} from '@angular/core';
import {MqttConnectionComponent} from './connection/connection.component';

@Component({
    selector: 'app-mqtt',
    standalone: true,
    imports: [
        MqttConnectionComponent
    ],
    templateUrl: './mqtt.component.html',
    styleUrl: './mqtt.component.css'
})
export class MqttDashboard {

}
