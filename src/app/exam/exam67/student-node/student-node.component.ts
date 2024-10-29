import {Component, Inject, Input, numberAttribute, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgStyle} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLightbulb, faPaw } from '@fortawesome/free-solid-svg-icons';
import { EmailSpinService } from '../emaispin.service';

@Component({
  selector: 'app-student-node',
  templateUrl: './student-node.component.html',
  standalone: true,
  imports: [FontAwesomeModule, NgStyle],
  styleUrls: ['./student-node.component.css'],
})
export class StudentNodeComponent implements OnInit, OnDestroy {
  private _student!: string;
  private _light: number = 0;
  private _open_food: string = '';
  private _temp: number = 20;
  private _emailspinLocation: string = 'assets/exam67/emailspin/';
  private _intervalId: any;
  private _spinInterval: number = 0; // Change this value to set the interval (0 = no spin)

  faLightbulb = faLightbulb;
  faPaw = faPaw;
  isNaN: Function = Number.isNaN;

  constructor(private emailSpinService: EmailSpinService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this._spinInterval > 0) {
      // Start the spin and set the interval to update the frame if the interval is greater than 0
      this._intervalId = setInterval(() => {
        this.emailSpinService.incrementFrame();
      }, this._spinInterval);
    }
  }

  ngOnDestroy() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  get emailspinFrame(): string {
    // Use the service to get the current frame
    return this._emailspinLocation + 'emailspin-' + this.emailSpinService.getCurrentFrame() + '.png';
  }

  // Getter and setter for student
  @Input()
  get student(): string {
    return this._student;
  }

  set student(value: string) {
    this._student = value;
  }

  // Getter and setter for light
  @Input({ transform: numberAttribute })
  get light(): number {
    return this._light;
  }

  set light(value: number) {
    this._light = value;
  }

  // Getter and setter for open_food
  @Input()
  get open_food(): string {
    return this._open_food;
  }

  set open_food(value: string) {
    this._open_food = value;
  }

  // Getter and setter for temp
  @Input({ transform: numberAttribute })
  get temp(): number {
    return this._temp;
  }

  set temp(value: number) {
    this._temp = value;
  }

  // Getter and setter for spin interval
  @Input()
  get spinInterval(): number {
    return this._spinInterval;
  }

  set spinInterval(value: number) {
    this._spinInterval = value;
  }
}
