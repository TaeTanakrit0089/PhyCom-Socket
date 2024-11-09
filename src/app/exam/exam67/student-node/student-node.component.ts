import {Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgStyle} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faDoorClosed, faDoorOpen} from '@fortawesome/free-solid-svg-icons';
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
  isNaN: Function = Number.isNaN;

  // 1.Sunray
  @Input() sunray_pckzy!: number;
  @Input() sunray_somchoon!: number;
  @Input() sunray_ohm!: number;
  @Input() sunray!: number;
  // 3. 7-Segment
  @Input() segment_number!: number;
  // 4, Temperature
  @Input() temperature!: number;
  // 5. Push Button
  faDoorOpen = faDoorOpen;
  faDoorClose = faDoorClosed;
  protected readonly faDoorClosed = faDoorClosed;
  // 2. EmaiSpin
  private _emailspinLocation: string = 'assets/exam67/emailspin/';
  private _intervalId: any;

  constructor(protected mqttService: Exam67MqttService, private emailSpinService: EmailSpinService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.sunray_pckzy = this.mqttService.sunray_pckzy
    this.sunray = this.mqttService.sunray
  }

  private _spinSpeed: number = 0;

  @Input()
  get spinSpeed(): number {
    return this._spinSpeed;
  }

  set spinSpeed(value: number) {
    this._spinSpeed = Math.max(0, Math.min(value, 1024));
    this.startEmailSpin();  // Restart email spin with updated speed
  }

  get emailspinFrame(): string {
    return this._emailspinLocation + 'emailspin-' + this.emailSpinService.getCurrentFrame() + '.png';
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
