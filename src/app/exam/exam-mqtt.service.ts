import {Injectable} from '@angular/core';
import {MqttService} from '../mqtt.service';

@Injectable({
  providedIn: 'root',
})
export class ExamMqttService extends MqttService {
  // String properties for light, food, and temp
  private _messageLight$: string = '';
  private _messageFood$: string = '';
  private _messageTemp$: string = '';
  private _venusTemp: number = 0;
  private _student_id: string = '';


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
    if (topic.endsWith('/light')) {
      this._messageLight$ = payload;
    } else if (topic.endsWith('/food')) {
      this._messageFood$ = payload;
    } else if (topic.endsWith('/temp')) {
      this._messageTemp$ = payload;
    }
  }
}
