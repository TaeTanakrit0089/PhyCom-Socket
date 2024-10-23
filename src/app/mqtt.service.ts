import {Injectable} from '@angular/core';
import {Client, Message} from 'paho-mqtt';

@Injectable({
    providedIn: 'root',
})
export class MqttService {
    client!: Client;

    constructor() {
    }

    // Connect the MQTT client
    public connectClient(host: string, port: number, clientId: string, onConnect: () => void): void {
        this.client = new Client(host, port, clientId);

        this.client.onConnectionLost = this.onConnectionLost;
        this.client.onMessageArrived = this.onMessageArrived;

        // Set a connection timeout of 5 seconds (5000 ms)
        const connectionTimeout = setTimeout(() => {
            console.error('Connection attempt timed out.');
            alert('Connection attempt timed out after 5 seconds.');
            this.client.disconnect(); // Optionally disconnect if the connection is not established
        }, 5000);

        this.client.connect({
            onSuccess: () => {
                // Clear the timeout since connection was successful
                clearTimeout(connectionTimeout);

                // Call the onConnect callback
                onConnect();

                // Display a success message
                console.log(`Connected to ${host}:${port} successfully.`);
            },
            onFailure: (error) => {
                // Clear the timeout in case of a failure
                clearTimeout(connectionTimeout);

                console.error('Connection failed:', error);
                // Alert the error message to the user
                alert(`Connection failed: ${error.errorMessage || 'Unknown error'}`);
            },
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

    // Disconnect the MQTT client
    public disconnect(): void {
        if (this.client) {
            this.client.disconnect();
            console.log('Disconnected from MQTT broker');
        } else {
            console.log('No client to disconnect');
        }
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
