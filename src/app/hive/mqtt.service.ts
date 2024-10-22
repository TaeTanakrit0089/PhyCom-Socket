import {Injectable} from '@angular/core';
import {Client, Message} from 'paho-mqtt';

@Injectable({
    providedIn: 'root',
})
export class MqttService {
    private client!: Client;

    constructor() {
    }

    // Connect the MQTT client
    public connectClient(clientId: string, onConnect: () => void): void {
        this.client = new Client('broker.hivemq.com', 8884, clientId);

        this.client.onConnectionLost = this.onConnectionLost;
        this.client.onMessageArrived = this.onMessageArrived;

        this.client.connect({
            onSuccess: onConnect,
            onFailure: (error) => console.error('Connection failed:', error),
            useSSL: true,
        });
    }

    // Subscribe to a topic
    public subscribeToTopic(topic: string): void {
        if (this.client) {
            this.client.subscribe(topic);
            console.log(`Subscribed to topic: ${topic}`);
        }
    }

    // Send a message to a specific topic
    public sendMessage(topic: string, payload: string): void {
        const message = new Message(payload);
        message.destinationName = topic;
        this.client.send(message);
        console.log(`Message sent to ${topic}: ${payload}`);
    }

    // Handle connection loss
    private onConnectionLost(responseObject: any): void {
        if (responseObject.errorCode !== 0) {
            console.log('Connection lost:', responseObject.errorMessage);
        }
    }

    // Handle incoming message
    private onMessageArrived(message: Message): void {
        console.log('Message arrived:', message.payloadString);
        // You can broadcast the message or handle it as needed
    }
}
