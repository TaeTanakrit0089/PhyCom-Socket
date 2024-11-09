import {Title} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {StudentNodeComponent} from './student-node/student-node.component';
import {NgForOf, NgIf} from '@angular/common';
import {QuestionsComponent} from './questions/questions.component';
import {ExamConnectionComponent} from './exam-connection/exam-connection.component';
import {Exam66MqttService} from './exam66-mqtt.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-exam66',
  templateUrl: './exam66.component.html',
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
    './exam66.component.css',
    '../../mqtt/connection/connection.component.css'
  ]
})
export class Exam66Component {
  protected page_title: string = "PC 2023 Mock Exam";

  constructor(protected mqttService: Exam66MqttService, private titleService: Title) {
    this.titleService.setTitle(this.page_title);
  }
}
