import {interval, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {StudentNodeComponent} from "../student-node/student-node.component";
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {QuestionsComponent} from "../questions/questions.component";
import {FormsModule} from "@angular/forms";
import {Exam67MqttService} from '../exam67-mqtt.service';


@Component({
  selector: 'exam67-connection',
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
  styleUrls: ['./exam-connection.component.css', '../../../mqtt/connection/connection.component.css']
})
export class ExamConnectionComponent {
  public temp_generator: Subscription | null = null;
  protected page_title: string = "PC 2024 Final Exam";

  public studentId: string = '';
  public host: string = 'phycom.it.kmitl.ac.th';
  public port: string = '8884';
  public client_ID: string = 'client_' + Math.random().toString(16).substr(2, 8);

  public showSuccessBorder: boolean = false;
  private connectingSubscription!: Subscription;
  isConnecting: boolean = false;


  constructor(protected mqttService: Exam67MqttService, private titleService: Title) {
    this.titleService.setTitle(this.page_title);
    this.connectingSubscription = this.mqttService.isConnecting$.subscribe(
      (connecting) => {
        this.isConnecting = connecting;
      }
    );
  }

  ngOnInit() {
    // Subscribe to message events
    this.mqttService.messageArrived$.subscribe((message) => {
      this.handleMqttMessage(message);
    });
  }

  // Handle MQTT messages
  private handleMqttMessage(message: { topic: string, payload: string }) {
    console.log(`Topic: ${message.topic}, Payload: ${message.payload}`);
  }

  // Start the temperature generator
  startGenerator(): void {
    if (this.temp_generator) return;
    if (!this.studentId || this.studentId.trim() === '') {
      alert('Student ID is required');
      return;
    }

    this.client_ID = 'Server_' + new Date().getTime();
    console.log('Connect with client ID', this.client_ID);

    // Use the bound studentId
    this.mqttService.connect(this.host, +this.port, this.client_ID, () => this.startTempGenInterval());
    this.mqttService.student_id = this.studentId;
    this.showSuccessBorder = true;
    setTimeout(() => {
      this.showSuccessBorder = false; // Hide the border
    }, 2000); // 2000 milliseconds = 2 seconds
  }

  startTempGenInterval(): void {
    if (this.temp_generator) return;

    // Subscribe to student's topics
    const topics = [
      `${this.studentId}/emailspin`,
      `${this.studentId}/sunray`,
      `${this.studentId}/temp`,
      `${this.studentId}/door`,
    ];

    topics.forEach((topic) => {
      this.mqttService.subscribeToTopic(topic);
      console.log('Subscribed to topic:', topic);  // Log each topic
    });

    // Start generating temperature every 3 seconds
    this.temp_generator = interval(3000).subscribe(() => {
      this.updateSunrayValues();
    });
  }

  private updateSunrayValues(): void {
    const maxSunrayValue = 2000;
    const deviationLimit = 150;

    // Generate new random values for sunray
    let newValueSomchoon = this.getRandomSunrayValue(maxSunrayValue, deviationLimit);
    let newValuePckzy = this.getRandomSunrayValue(maxSunrayValue, deviationLimit, newValueSomchoon);
    let newValueOhm = this.getRandomSunrayValue(maxSunrayValue, deviationLimit, newValueSomchoon, newValuePckzy);
    let newValueSegment = Math.floor(Math.random() * 10);

    // Update the values in the mqttService
    this.mqttService.sunray_somchoon = newValueSomchoon;
    this.mqttService.sunray_pckzy = newValuePckzy;
    this.mqttService.sunray_ohm = newValueOhm;
    this.mqttService.segment_number = newValueSegment;

    // Send the updated values
    this.mqttService.sendMessage(`${this.studentId}/sunray_somchoon`, `${newValueSomchoon}`);
    this.mqttService.sendMessage(`${this.studentId}/sunray_pckzy`, `${newValuePckzy}`);
    this.mqttService.sendMessage(`${this.studentId}/sunray_ohm`, `${newValueOhm}`);
    this.mqttService.sendMessage(`${this.studentId}/prob_stat`, `${newValueSegment}`);
  }

// Function to generate random sunray values with constraints
  private getRandomSunrayValue(maxValue: number, deviationLimit: number, ...previousValues: number[]): number {
    let newValue: number;

    do {
      // Generate a random number between 1 and maxValue
      newValue = Math.floor(Math.random() * maxValue) + 1;

      // Check for deviation from previous values
    } while (previousValues.some((value) => Math.abs(value - newValue) >= deviationLimit));

    return newValue;
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
