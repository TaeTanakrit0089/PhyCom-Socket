import {Component, Inject, Input, numberAttribute, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgStyle} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faLightbulb, faPaw} from '@fortawesome/free-solid-svg-icons';
import {EmailSpinService} from '../emaispin.service';
import {Exam67MqttService} from '../exam67-mqtt.service';

@Component({
  selector: 'exam67-student-node',
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

  faLightbulb = faLightbulb;
  faPaw = faPaw;
  isNaN: Function = Number.isNaN;
  private _spinSpeed: number = 0;
  // 1.Sunray
  public sunray_pckzy: number = 0;
  public sunray_somchoon: number = 0;
  public sunray_ohm: number = 0;
  @Input() sunray!: number;

  constructor(protected mqttService: Exam67MqttService, private emailSpinService: EmailSpinService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.sunray_pckzy = this.mqttService.sunray_pckzy
    this.sunray = this.mqttService.sunray
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startEmailSpin();
    }
  }

  ngOnDestroy() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  get emailspinFrame(): string {
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
  @Input({transform: numberAttribute})
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
  @Input({transform: numberAttribute})
  get temp(): number {
    return this._temp;
  }

  set temp(value: number) {
    this._temp = value;
  }

  // Getter and setter for spin speed (0 to 1024)

  @Input()
  get spinSpeed(): number {
    return this._spinSpeed;
  }

  set spinSpeed(value: number) {
    this._spinSpeed = Math.max(0, Math.min(value, 1024));
    this.startEmailSpin();  // Restart email spin with updated speed
  }

  private startEmailSpin(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
    if (this._spinSpeed > 0) {
      const intervalDelay = this.calculateInterval(this._spinSpeed);
      this._intervalId = setInterval(() => {
        this.emailSpinService.incrementFrame();
      }, intervalDelay);
    }
  }

  private calculateInterval(speed: number): number {
    const minInterval = 15;
    const maxInterval = 150;

    if (speed === 0) return Infinity;

    const interval = maxInterval - ((speed - 1) * (maxInterval - minInterval) / 1023);
    return Math.max(interval, minInterval);
  }
}
