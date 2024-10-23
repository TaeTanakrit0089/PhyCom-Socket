import {Injectable} from '@angular/core';
import {Client, Message} from 'paho-mqtt';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  client!: Client;
  isConnected = false;
  reconnectAttempts = 0; // Track the number of reconnection attempts
  maxReconnectAttempts = 5; // Maximum number of reconnection attempts
  reconnectDelay = 1000; // Initial delay for reconnection in milliseconds

  constructor() {
  }

  // Connect the MQTT client
  public connectClient(host: string, port: number, clientId: string, onConnect: () => void): void {
    this.client = new Client(host, port, clientId);

    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.onMessageArrived = this.onMessageArrived.bind(this);

    const connectionTimeout = setTimeout(() => {
      console.error('Connection attempt timed out.');
      alert('Connection attempt timed out after 5 seconds.');
      this.client.disconnect(); // Optionally disconnect if the connection is not established
    }, 5000);

    this.client.connect({
      onSuccess: () => {
        clearTimeout(connectionTimeout);
        this.reconnectAttempts = 0;
        onConnect();
        this.isConnected = true;
        console.log(`Connected to ${host}:${port} successfully.`);
      },
      onFailure: (error) => {
        clearTimeout(connectionTimeout);
        console.error('Connection failed:', error);
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

  // Unsubscribe from a topic
  public unsubscribeFromTopic(topicToUnsubscribe: string): void {
    if (this.client) {
      this.client.unsubscribe(topicToUnsubscribe);
      console.log(`Unsubscribed from topic: ${topicToUnsubscribe}`);
    } else {
      console.warn('No client connected to unsubscribe from the topic.');
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
      this.isConnected = false;
      console.log('Disconnected from MQTT broker');
    } else {
      console.log('No client to disconnect');
    }
  }

  // Handle incoming message
  onMessageArrived(message: Message): void {
    console.log('Message arrived:', message.payloadString);
    // You can broadcast the message or handle it as needed
  }

  // Handle connection loss
  private onConnectionLost(responseObject: any): void {
    if (responseObject.errorCode !== 0) {
      this.isConnected = false;
      console.log('Connection lost:', responseObject.errorMessage);

      // Alert the user and refresh the page
      alert('Connection to the MQTT broker was lost. The page will refresh.');
      window.location.reload(); // Refresh the page
    }
  }

  // Attempt to reconnect with exponential backoff
  private reconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts; // Increase the delay for each attempt

      console.log(`Attempting to reconnect in ${delay} ms...`);

      setTimeout(() => {
        this.connectClient(this.client.host, this.client.port, this.client.clientId, () => {
          console.log('Reconnected successfully.');
        });
      }, delay);
    } else {
      console.warn('Max reconnect attempts reached. Could not reconnect to the MQTT broker.');
    }
  }
}
