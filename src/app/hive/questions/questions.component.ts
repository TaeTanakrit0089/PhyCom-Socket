import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  @Input() student!: string[];

  getStudentId(): string {
    return this.student && this.student.length > 0 ? this.student[0] : 'student_id';
  }
}
