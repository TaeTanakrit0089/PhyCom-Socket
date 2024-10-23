import {Component} from '@angular/core';
import {StudentNodeComponent} from './student-node/student-node.component';
import {MqttService} from '../mqtt.service';
import {interval, Subscription} from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';
import {QuestionsComponent} from './questions/questions.component';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-hive',
  templateUrl: './hive.component.html',
  standalone: true,
  imports: [
    StudentNodeComponent,
    NgForOf,
    NgIf,
    QuestionsComponent
  ],
  styleUrls: ['./hive.component.css']
})
export class HiveComponent {
  public STUDENTS: string[] = [];
  public current_temp: number = 0;
  public temp_data: number[][] = [[]];
  public temp_generator: Subscription | null = null;
  protected page_title: string = "PC 2023 Mock Exam";
  private client_ID: string = '';
  private max_temp: number = 50;
  private min_temp: number = 10;
  private generator: number = 3;

  constructor(private mqttService: MqttService, private titleService: Title) {
    this.titleService.setTitle(this.page_title);
  }

  ngOnInit() {
    // The MQTT connection will be initialized by the service
  }

  sendMessage() {
    this.mqttService.sendMessage('World', 'Hello again');
  }

  // Start the temperature generator
  startGenerator(): void {
    const studentId = (document.getElementById('student-id') as HTMLInputElement).value;
    this.STUDENTS = [studentId];
    if (this.temp_generator) return;

    this.client_ID = 'Server_' + new Date().getTime();
    console.log('Connect with client ID', this.client_ID);

    this.mqttService.connectClient("broker.hivemq.com", 8884, this.client_ID, () => this.startTempGenInterval());
  }

  // Initialize temperature generator interval
  startTempGenInterval(): void {
    if (this.temp_generator) return;

    let current_temp = 10;

    // Subscribe to student's topics
    this.STUDENTS.forEach((student) => {
      this.mqttService.subscribeToTopic(`${student}/light`);
      this.mqttService.subscribeToTopic(`${student}/food`);
      this.mqttService.subscribeToTopic(`${student}/temp`);
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
      const studentId = (document.getElementById('student-id') as HTMLInputElement).value;
      this.mqttService.sendMessage(`${studentId}/venus`, messagePayload);

      // Reset light, food, and temperature
      this.resetValues();
    });
  }

  // Reset the student node values
  resetValues(): void {
    this.mqttService.sendMessage('reset_light', '0');
    this.mqttService.sendMessage('reset_food', 'off');
    this.mqttService.sendMessage('reset_temp', '0');
  }

  // Stop the temperature generator
  stopGenerator(): void {
    if (this.temp_generator) {
      this.temp_generator.unsubscribe();
      this.temp_generator = null;
    }
  }

  handleEnter(input: HTMLInputElement) {
    if (this.temp_generator) {
      this.stopGenerator();
    } else {
      this.startGenerator();
    }
    input.blur();  // Deselect the input field
  }
}

