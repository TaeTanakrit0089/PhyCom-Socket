import {Injectable} from '@angular/core';
import {MqttService} from '../../mqtt.service';

@Injectable({
  providedIn: 'root',
})
export class Exam67MqttService extends MqttService {
  get is_door_open(): boolean {
    return this._is_door_open;
  }

  set is_door_open(value: boolean) {
    this._is_door_open = value;
  }

  // String properties for light, food, and temp
  private _student_id: string = '';

  // 1. Sunray
  private _sunray_pckzy: number = 0;
  private _sunray_somchoon: number = 0;
  private _sunray_ohm: number = 0;
  private _sunray: number = 0;

  // 2. EmailSpin
  private _messageEmailSpin: number = 0;

  // 3. 7-Segment
  private _segment_number: number = 0;

  // 4. Temperature
  private _temperature: number = NaN;

  // 5. Open Door
  private _is_door_open: boolean = false;

  get temperature(): number {
    return this._temperature;
  }

  set temperature(value: number) {
    this._temperature = value;
  }

  get segment_number(): number {
    return this._segment_number;
  }

  set segment_number(value: number) {
    this._segment_number = value;
  }


  get sunray_pckzy(): number {
    return this._sunray_pckzy;
  }

  set sunray_pckzy(value: number) {
    this._sunray_pckzy = value;
  }

  get sunray_somchoon(): number {
    return this._sunray_somchoon;
  }

  set sunray_somchoon(value: number) {
    this._sunray_somchoon = value;
  }

  get sunray_ohm(): number {
    return this._sunray_ohm;
  }

  set sunray_ohm(value: number) {
    this._sunray_ohm = value;
  }

  get sunray(): number {
    return this._sunray;
  }

  set sunray(value: number) {
    this._sunray = value;
  }

  get messageEmailSpin(): number {
    return this._messageEmailSpin;
  }

  set messageEmailSpin(value: number) {
    this._messageEmailSpin = value;
  }

  get student_id(): string {
    return this._student_id;
  }

  set student_id(value: string) {
    this._student_id = value;
  }

  constructor() {
    super();
    // Subscribe to message events
    this.messageArrived$.subscribe(({topic, payload}) => {
      this.handleIncomingMessage(topic, payload);
    });
  }

  handleIncomingMessage(topic: string, payload: string) {
    if (topic.endsWith('/emailspin')) {
      this._messageEmailSpin = +payload;
    } else if (topic.endsWith('/sunray')) {
      this.sunray = +payload;
    } else if (topic.endsWith('/temp')) {
      this._temperature = +payload;
    } else if (topic.endsWith('/door')) {
      this._is_door_open = payload.toLowerCase() === 'on';
    }
  }
}
