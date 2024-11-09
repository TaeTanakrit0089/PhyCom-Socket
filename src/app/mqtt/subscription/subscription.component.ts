import {Component} from '@angular/core';
import {MqttService} from '../../mqtt.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgStyle} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  topic: string = 'testtopic/#';
  qos: number = 0;
  subscribedTopics: { topic: string; bgColor: string }[] = []; // Updated structure
  isConnected: boolean = false;
  private connectionSubscription!: Subscription;
  // Colors that work well in light mode
  private colors: string[] = [
    '#FFCCBC', // Light peach
    '#FFABAB', // Light red
    '#FFC3A0', // Light coral
    '#FF677D', // Light pink
    '#D4E157', // Light lime green
    '#A5D8DD', // Light cyan
    '#D7B2E6', // Light lavender
    '#FFE156', // Light yellow
    '#C0E8D5', // Light mint
    '#F9AFAF'  // Light blush
  ];

  private usedColors: Set<string> = new Set(); // Track used colors

  constructor(protected mqttService: MqttService) {
    this.connectionSubscription = this.mqttService.isConnectedGlobal$.subscribe(
      (connecting) => {
        this.isConnected = connecting;
      }
    );
  }

  subscribeTopic(): void {
    if (this.topic.trim() !== '') { // Check if the topic is not empty
      const bgColor = this.getRandomColor(); // Get a unique background color
      this.mqttService.subscribeToTopic(this.topic);
      this.subscribedTopics.push({topic: this.topic, bgColor}); // Store topic and its background color
      this.topic = ''; // Optionally clear the input after subscription
    } else {
      console.warn('Cannot subscribe to an empty topic.');
    }
  }

  unsubscribeTopic(index: number): void {
    if (index >= 0 && index < this.subscribedTopics.length) {
      const topicToUnsubscribe = this.subscribedTopics[index].topic;
      this.mqttService.unsubscribeFromTopic(topicToUnsubscribe); // Call your unsubscribe method here
      this.subscribedTopics.splice(index, 1); // Remove the topic from the array
    } else {
      console.warn('Invalid index for unsubscribing from topic.');
    }
  }

  ngOnDestroy(): void {
    this.connectionSubscription.unsubscribe();
  }

  private getRandomColor(): string {
    if (this.usedColors.size === this.colors.length) {
      console.warn('All colors have been used. No more unique colors available.');
      return '#FFFFFF'; // Return a default color if all are used
    }

    let randomColor: string;
    do {
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      randomColor = this.colors[randomIndex];
    } while (this.usedColors.has(randomColor)); // Keep selecting until a unique color is found

    this.usedColors.add(randomColor); // Mark this color as used
    return randomColor;
  }

}
