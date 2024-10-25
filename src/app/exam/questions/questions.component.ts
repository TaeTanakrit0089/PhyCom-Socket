import {Component, Input} from '@angular/core';
import {FaIconComponent, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {faCheck, faClipboard} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-questions',
  standalone: true,
  templateUrl: './questions.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  @Input() student: string = '';

  // Track copied state for each topic
  copiedState: { [key: string]: boolean } = {};

  constructor(private library: FaIconLibrary) {
    this.library.addIcons(faClipboard, faCheck);
  }

  getStudentId(): string {
    return this.student && this.student.length > 0 ? this.student : 'student_id';
  }

  copyToClipboard(topic: string): void {
    const fullTopic = this.getStudentId() + topic;
    navigator.clipboard.writeText(fullTopic).then(() => {
      this.copiedState[topic] = true;

      // Revert back to clipboard icon after 2 seconds
      setTimeout(() => {
        this.copiedState[topic] = false;
      }, 1000);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }

  // Determine the icon based on the state
  getIcon(topic: string): string {
    return this.copiedState[topic] ? 'check' : 'clipboard';
  }
}
