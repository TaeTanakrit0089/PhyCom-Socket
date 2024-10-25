import {Injectable} from '@angular/core';
import {MqttService} from '../mqtt.service';

@Injectable({
  providedIn: 'root',
})
export class ExamMqttService extends MqttService {
  // String properties for light, food, and temp
  public messageLight$: string = '';
  public messageFood$: string = '';
  public messageTemp$: string = '';
  public venusTemp: number = 0;
  public student_id: string = '';

  constructor() {
    super();
    // Subscribe to message events
    this.messageArrived$.subscribe(({topic, payload}) => {
      this.handleIncomingMessage(topic, payload);
    });
  }

  handleIncomingMessage(topic: string, payload: string) {
    if (topic.endsWith('/light')) {
      this.messageLight$ = payload;
    } else if (topic.endsWith('/food')) {
      this.messageFood$ = payload;
    } else if (topic.endsWith('/temp')) {
      this.messageTemp$ = payload;
    }
  }
}
