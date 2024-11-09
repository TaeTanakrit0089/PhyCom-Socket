import {Injectable} from '@angular/core';
import {MqttService} from '../../mqtt.service';

@Injectable({
  providedIn: 'root',
})
export class Exam66MqttService extends MqttService {
  constructor() {
    super();
    // Subscribe to message events
    this.messageArrived$.subscribe(({topic, payload}) => {
      this.handleIncomingMessage(topic, payload);
    });
  }

  // String properties for light, food, and temp
  private _messageLight$: string = '';

  get messageLight$(): string {
    return this._messageLight$;
  }

  set messageLight$(value: string) {
    this._messageLight$ = value;
  }

  private _messageFood$: string = '';

  get messageFood$(): string {
    return this._messageFood$;
  }

  set messageFood$(value: string) {
    this._messageFood$ = value;
  }

  private _messageTemp$: string = '';

  get messageTemp$(): string {
    return this._messageTemp$;
  }

  set messageTemp$(value: string) {
    this._messageTemp$ = value;
  }

  private _venusTemp: number = 0;

  get venusTemp(): number {
    return this._venusTemp;
  }

  set venusTemp(value: number) {
    this._venusTemp = value;
  }

  private _student_id: string = '';

  get student_id(): string {
    return this._student_id;
  }

  set student_id(value: string) {
    this._student_id = value;
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
