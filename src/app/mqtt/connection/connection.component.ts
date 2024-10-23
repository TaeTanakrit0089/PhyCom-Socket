import {Component, OnInit} from '@angular/core';
import {MqttService} from '../../mqtt.service';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
    selector: 'app-connection',
    standalone: true,
    imports: [
        FormsModule,
        NgIf,
        NgClass
    ],
    templateUrl: './connection.component.html',
    styleUrl: './connection.component.css'
})
export class MqttConnectionComponent implements OnInit {
    host: string = 'mqtt-dashboard.com';
    port: number = 8884;
    clientId: string = 'client_' + Math.random().toString(16).substr(2, 8);
    username: string = '';
    password: string = '';
    keepAlive: number = 60;
    ssl: boolean = false;
    cleanSession: boolean = true;
    lwTopic: string = '';
    lwQos: number = 0;
    lwRetain: boolean = false;
    lwMessage: string = '';

    isConnected: boolean = false;
    showSuccessBorder = false;

    constructor(private mqttService: MqttService) {
    }

    ngOnInit(): void {
        this.prefill();
    }

    prefill(): void {
        const params = new URLSearchParams(window.location.search);
        this.username = params.get('username') || '';
        this.host = params.get('host') || this.host;
        this.port = Number(params.get('port')) || this.port;
        this.ssl = params.get('ssl') !== null; // Adjust based on your logic
    }

    connect(): void {
        const clientId = this.clientId || 'client_' + Math.random().toString(16).substr(2, 8);
        this.mqttService.connectClient(this.host, this.port, clientId, () => {
            // console.log('Connected successfully');
            // this.mqttService.subscribeToTopic(this.lwTopic); // Subscribe to Last-Will Topic if set
            this.isConnected = true;
            this.showSuccessBorder = true;
            setTimeout(() => {
                this.showSuccessBorder = false; // Hide the border
            }, 2000); // 2000 milliseconds = 2 seconds
        });
    }

    disconnect(): void {
        this.mqttService.disconnect();
        this.isConnected = false;
    }

    show_connection() {

    }
}
