import {Component, Input, numberAttribute, OnInit} from '@angular/core';
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
  faLightbulb = faLightbulb;
  faPaw = faPaw;
  isNaN: Function = Number.isNaN;

  constructor() {
  }

  private _student!: string;

  // Getter and setter for student
  @Input()
  get student(): string {
    return this._student;
  }

  set student(value: string) {
    this._student = value;
  }

  private _light: number = 0;

  // Getter and setter for light
  @Input({transform: numberAttribute})
  get light(): number {
    return this._light;
  }

  set light(value: number) {
    this._light = value;
  }

  private _open_food: string = '';

  // Getter and setter for open_food
  @Input()
  get open_food(): string {
    return this._open_food;
  }

  set open_food(value: string) {
    this._open_food = value;
  }

  private _temp: number = 20;

  // Getter and setter for temp
  @Input({transform: numberAttribute})
  get temp(): number {
    return this._temp;
  }

  set temp(value: number) {
    this._temp = value;
  }

  ngOnInit(): void {
  }
}
