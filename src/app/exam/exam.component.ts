import {Subscription} from 'rxjs';
import {MqttService} from '../mqtt.service';
import {Title} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {StudentNodeComponent} from './student-node/student-node.component';
import {NgForOf, NgIf} from '@angular/common';
import {QuestionsComponent} from './questions/questions.component';
import {ExamConnectionComponent} from './exam-connection/exam-connection.component';
import {ExamMqttService} from './exam-mqtt.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  standalone: true,
  imports: [
    StudentNodeComponent,
    NgForOf,
    NgIf,
    QuestionsComponent,
    ExamConnectionComponent
  ],
  styleUrls: [
    './exam.component.css',
    '../mqtt/connection/connection.component.css'
  ]
})
export class ExamComponent {
  public STUDENTS: string[] = [];
  public temp_generator: Subscription | null = null;
  protected page_title: string = "PC 2023 Mock Exam";

  // Variables to store message data
  public MESSAGE_LIGHT: string = '0';
  public MESSAGE_FOOD: string = 'off';
  public MESSAGE_TEMP: string = '20';

  constructor(protected mqttService: ExamMqttService, private titleService: Title) {
    this.titleService.setTitle(this.page_title);
  }
}
