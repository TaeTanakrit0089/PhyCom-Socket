import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {StudentNodeComponent} from './student-node/student-node.component';
import {NgForOf, NgIf} from '@angular/common';
import {QuestionsComponent} from './questions/questions.component';
import {ExamConnectionComponent} from './exam-connection/exam-connection.component';
import {ExamMqttService} from '../exam-mqtt.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-exam67',
  templateUrl: './exam67.component.html',
  standalone: true,
  imports: [
    StudentNodeComponent,
    NgForOf,
    NgIf,
    QuestionsComponent,
    ExamConnectionComponent,
    RouterLink
  ],
  styleUrls: [
    './exam67.component.css',
    '../../mqtt/connection/connection.component.css'
  ]
})
export class Exam67Component {
  public STUDENTS: string[] = [];
  public temp_generator: Subscription | null = null;
  protected page_title: string = "PC 2023 Mock Exam";

  constructor(protected mqttService: ExamMqttService, private titleService: Title) {
    this.titleService.setTitle(this.page_title);
  }
}
