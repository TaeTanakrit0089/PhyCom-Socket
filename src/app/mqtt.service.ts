import {Injectable} from '@angular/core';
import {Client, Message} from 'paho-mqtt';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private _client!: Client;
  private _isConnecting: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Add isConnecting
  private _isConnected = false;
  private _isConnectedGlobal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Use BehaviorSubject
  private _reconnectAttempts = 0; // Track the number of reconnection attempts
  private _maxReconnectAttempts = 5; // Maximum number of reconnection attempts
  private _reconnectDelay = 1000; // Initial delay for reconnection in milliseconds

  get isConnecting$(): BehaviorSubject<boolean> { // Expose as Observable
    return this._isConnecting;
  }

  get client(): Paho.MQTT.Client {
    return this._client;
  }

  set client(value: Paho.MQTT.Client) {
    this._client = value;
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  set isConnected(value: boolean) {
    this._isConnected = value;
  }

  get isConnectedGlobal$(): BehaviorSubject<boolean> { // Expose as Observable
    return this._isConnectedGlobal;
  }


  get reconnectAttempts(): number {
    return this._reconnectAttempts;
  }

  set reconnectAttempts(value: number) {
    this._reconnectAttempts = value;
  }

  get maxReconnectAttempts(): number {
    return this._maxReconnectAttempts;
  }

  set maxReconnectAttempts(value: number) {
    this._maxReconnectAttempts = value;
  }

  get reconnectDelay(): number {
    return this._reconnectDelay;
  }

  set reconnectDelay(value: number) {
    this._reconnectDelay = value;
  }

  get messageArrived$(): Subject<{ topic: string; payload: string }> {
    return this._messageArrived$;
  }

  set messageArrived$(value: Subject<{ topic: string; payload: string }>) {
    this._messageArrived$ = value;
  }

// Subject to broadcast messages
  private _messageArrived$ = new Subject<{ topic: string, payload: string }>();

  constructor() {
  }

  // Connect the MQTT client
  public connect(host: string, port: number, clientId: string, onConnect: () => void): void {
    this._isConnecting.next(true);
    this._client = new Client(host, port, clientId);

    this._client.onConnectionLost = this.onConnectionLost.bind(this);
    this._client.onMessageArrived = this.onMessageArrived.bind(this);

    const connectionTimeout = setTimeout(() => {
      this._isConnecting.next(false);
      console.error('Connection attempt timed out.');
      alert('Connection attempt timed out after 5 seconds.');
      this._client.disconnect(); // Optionally disconnect if the connection is not established
    }, 5000);

    this._client.connect({
      onSuccess: () => {
        this._isConnecting.next(false);
        clearTimeout(connectionTimeout);
        this._reconnectAttempts = 0;
        onConnect();
        this._isConnected = true;
        this._isConnectedGlobal.next(true);
        console.log(`Connected to ${host}:${port} successfully.`);
      },
      onFailure: (error) => {
        this._isConnecting.next(false);
        this._isConnectedGlobal.next(true);
        this.isConnected = false;
        clearTimeout(connectionTimeout);
        console.error('Connection failed:', error);
        alert(`Connection failed: ${error.errorMessage || 'Unknown error'}`);
      },
      useSSL: true,
    });
  }

  // Subscribe to a topic
  public subscribeToTopic(topic: string): void {
    if (this._client) {
      this._client.subscribe(topic);
      console.log(`Subscribed to topic: ${topic}`);
    }
  }

  // Unsubscribe from a topic
  public unsubscribeFromTopic(topicToUnsubscribe: string): void {
    if (this._client) {
      this._client.unsubscribe(topicToUnsubscribe);
      console.log(`Unsubscribed from topic: ${topicToUnsubscribe}`);
    } else {
      console.warn('No client connected to unsubscribe from the topic.');
    }
  }

  // Send a message to a specific topic
  public sendMessage(topic: string, payload: string): void {
    const message = new Message(payload);
    message.destinationName = topic;
    this._client.send(message);
    console.log(`Message sent to ${topic}: ${payload}`);
  }

  // Disconnect the MQTT client
  public disconnect(): void {
    if (this._client) {
      this._client.disconnect();
      this._isConnected = false;
      this._isConnectedGlobal.next(false);
      console.log('Disconnected from MQTT broker');
    } else {
      console.log('No client to disconnect');
    }
  }

  onMessageArrived(message: Message): void {
    console.log('Message arrived:', message.payloadString);
    // Emit the message to subscribers
    this._messageArrived$.next({topic: message.destinationName, payload: message.payloadString});
  }

  // Handle connection loss
  private onConnectionLost(responseObject: any): void {
    if (responseObject.errorCode !== 0) {
      this._isConnected = false;
      this._isConnectedGlobal.next(false);
      this._isConnecting.next(false);
      console.log('Connection lost:', responseObject.errorMessage);

      // Alert the user and refresh the page
      alert('Connection to the MQTT broker was lost. Retrying...');
      // this.reconnect();   
      window.location.reload(); // Refresh the page
    }
  }

  // Attempt to reconnect with exponential backoff
  private reconnect(): void {
    if (this._reconnectAttempts < this._maxReconnectAttempts) {
      this._reconnectAttempts++;
      const delay = this._reconnectDelay * this._reconnectAttempts; // Increase the delay for each attempt

      console.log(`Attempting to reconnect in ${delay} ms...`);
      this._isConnecting.next(true);
      setTimeout(() => {
        this.connect(this._client.host, this._client.port, this._client.clientId, () => {
          console.log('Reconnected successfully.');
        });
      }, delay);
    } else {
      this._isConnecting.next(false);
      console.warn('Max reconnect attempts reached. Could not reconnect to the MQTT broker.');
    }
  }
}
