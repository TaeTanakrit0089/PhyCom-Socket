import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faLightbulb, faPaw} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-node',
  templateUrl: './student-node.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    FontAwesomeModule,
    NgStyle
  ],
  styleUrls: ['./student-node.component.css']
})
export class StudentNodeComponent implements OnInit {
  @Input() student!: string;
  @Input() light_color: string = 'rgba(255, 0, 0, 1)';
  @Input() open_food: boolean = true;
  @Input() temp: number = 20;

  faLightbulb = faLightbulb;
  faPaw = faPaw;

  constructor() {
  }


  ngOnInit(): void {
  }
}
