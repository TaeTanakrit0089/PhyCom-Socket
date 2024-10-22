import {Component, Input} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'student-node',
  standalone: true,
  templateUrl: './student-node.component.html',
  imports: [
    NgStyle,
    NgClass,
    NgIf
  ],
  styleUrls: ['./student-node.component.css']
})
export class StudentNodeComponent {
  @Input() student!: string; // The '!' indicates that this input is required.
  light_color: string = 'rgba(255, 0, 0, 0)'; // Default light color
  open_food: boolean = false; // Default food state
  temp: number = 0; // Default temperature

  // Example methods to update properties can be added here
  setLight(value: number) {
    this.light_color = `rgba(255, 0, 0, ${value})`;
  }

  setFood(value: string) {
    this.open_food = value.toLowerCase() === 'on';
  }

  setTemp(value: number) {
    this.temp = value;
  }
}
