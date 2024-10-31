import {Injectable} from '@angular/core';
import {MqttService} from '../../mqtt.service';

@Injectable({
  providedIn: 'root',
})
export class Exam67MqttService extends MqttService {

  // String properties for light, food, and temp
  private _messageLight$: string = '';
  private _messageFood$: string = '';
  private _messageTemp$: string = '';
  private _messageEmail$: number = 0;
  private _venusTemp: number = 0;
  private _student_id: string = '';

  private _sunray_pckzy: number = 0;
  private _sunray_somchoon: number = 0;
  private _sunray_ohm: number = 0;
  private _sunray: number = 0;

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

  get messageEmail$(): number {
    return this._messageEmail$;
  }

  set messageEmail$(value: number) {
    this._messageEmail$ = value;
  }

  get messageLight$(): string {
    return this._messageLight$;
  }

  set messageLight$(value: string) {
    this._messageLight$ = value;
  }

  get messageFood$(): string {
    return this._messageFood$;
  }

  set messageFood$(value: string) {
    this._messageFood$ = value;
  }

  get messageTemp$(): string {
    return this._messageTemp$;
  }

  set messageTemp$(value: string) {
    this._messageTemp$ = value;
  }

  get student_id(): string {
    return this._student_id;
  }

  set student_id(value: string) {
    this._student_id = value;
  }

  get venusTemp(): number {
    return this._venusTemp;
  }

  set venusTemp(value: number) {
    this._venusTemp = value;
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
      this._messageLight$ = payload;
    } else if (topic.endsWith('/sunray')) {
      this.sunray = +payload;
    } else if (topic.endsWith('/temp')) {
      this._messageTemp$ = payload;
    }
  }
}
