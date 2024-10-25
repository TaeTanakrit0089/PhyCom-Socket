import {interval, Subscription} from 'rxjs';
import {MqttService} from '../../mqtt.service';
import {Title} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {StudentNodeComponent} from "../student-node/student-node.component";
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {QuestionsComponent} from "../questions/questions.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'exam-connection',
  templateUrl: './exam-connection.component.html',
  standalone: true,
  imports: [
    StudentNodeComponent,
    NgForOf,
    NgIf,
    QuestionsComponent,
    FormsModule,
    NgClass
  ],
  styleUrls: ['./exam-connection.component.css', '../../mqtt/connection/connection.component.css']
})
export class ExamConnectionComponent {
  public current_temp: number = 0;
  public temp_generator: Subscription | null = null;
  protected page_title: string = "PC 2023 Mock Exam";
  private max_temp: number = 50;
  private min_temp: number = 10;
  private generator: number = 3;

  public studentId: string = '';
  public host: string = 'phycom.it.kmitl.ac.th';
  public port: string = '8884';
  public client_ID: string = 'client_' + Math.random().toString(16).substr(2, 8);

  // Variables to store message data
  public MESSAGE_LIGHT: string = '0';
  public MESSAGE_FOOD: string = 'off';
  public MESSAGE_TEMP: string = '20';

  public showSuccessBorder: boolean = false;


  constructor(protected mqttService: MqttService, private titleService: Title) {
    this.titleService.setTitle(this.page_title);
  }

  ngOnInit() {
    // Subscribe to message events
    this.mqttService.messageArrived$.subscribe((message) => {
      this.handleMqttMessage(message);
    });
  }

  // Handle MQTT messages
  private handleMqttMessage(message: { topic: string, payload: string }) {
    if (message.topic.endsWith('/light')) {
      this.MESSAGE_LIGHT = message.payload;
    } else if (message.topic.endsWith('/food')) {
      this.MESSAGE_FOOD = message.payload;
    } else if (message.topic.endsWith('/temp')) {
      this.MESSAGE_TEMP = message.payload;
    }
    console.log(`Topic: ${message.topic}, Payload: ${message.payload}`);
  }

  sendMessage() {
    this.mqttService.sendMessage('World', 'Hello again');
  }

  // Start the temperature generator
  startGenerator(): void {
    if (this.temp_generator) return;

    this.client_ID = 'Server_' + new Date().getTime();
    console.log('Connect with client ID', this.client_ID);

    // Use the bound studentId
    this.mqttService.connectClient(this.host, +this.port, this.client_ID, () => this.startTempGenInterval());
    this.showSuccessBorder = true;
    setTimeout(() => {
      this.showSuccessBorder = false; // Hide the border
    }, 2000); // 2000 milliseconds = 2 seconds
  }

  startTempGenInterval(): void {
    if (this.temp_generator) return;

    let current_temp = 10;

    // Subscribe to student's topics
    const topics = [`${this.studentId}/light`, `${this.studentId}/food`, `${this.studentId}/temp`];

    topics.forEach((topic) => {
      this.mqttService.subscribeToTopic(topic);
      console.log('Subscribed to topic:', topic);  // Log each topic
    });

    // Start generating temperature every 3 seconds
    this.temp_generator = interval(3000).subscribe(() => {
      current_temp += this.generator;
      if (current_temp > this.max_temp) {
        this.generator = -3;
      } else if (current_temp <= this.min_temp) {
        this.generator = 3;
      }
      this.current_temp = current_temp;

      // Send temperature message
      const messagePayload = `${current_temp}`;
      this.mqttService.sendMessage(`${this.studentId}/venus`, messagePayload);

      // Reset light, food, and temperature
      this.resetValues();
    });
  }

  resetValues(): void {
    this.mqttService.sendMessage('reset_light', '0');
    this.mqttService.sendMessage('reset_food', 'off');
    this.mqttService.sendMessage('reset_temp', '0');
  }

  stopGenerator(): void {
    if (this.temp_generator) {
      this.temp_generator.unsubscribe();
      this.temp_generator = null;
    }
    this.mqttService.disconnect();
  }

  handleSubmit() {
    if (this.studentId) {
      this.startGenerator();
    }
  }
}
