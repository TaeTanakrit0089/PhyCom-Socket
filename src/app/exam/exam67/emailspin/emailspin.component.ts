import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-email-spin',
  template: `<img [src]="currentFrame" alt="Email Animation">`,
  standalone: true,
})
export class EmailSpinComponent implements OnInit, OnDestroy {
  frames: string[] = [];
  currentFrame: string = '';
  intervalId: any;
  frameIndex = 0;
  frameSpeed = 100; // Speed in milliseconds

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Load all the frames
    this.frames = [
      'assets/emailspin-0.png',
      'assets/emailspin-1.png',
      'assets/emailspin-2.png',
      'assets/emailspin-3.png',
      'assets/emailspin-4.png',
      'assets/emailspin-5.png',
      'assets/emailspin-6.png',
      'assets/emailspin-7.png',
      'assets/emailspin-8.png',
      'assets/emailspin-9.png',
      'assets/emailspin-10.png',
      'assets/emailspin-11.png',
      'assets/emailspin-12.png',
      'assets/emailspin-13.png',
      'assets/emailspin-14.png',
      'assets/emailspin-15.png',
      'assets/emailspin-16.png',
      'assets/emailspin-17.png'
    ];

    // Start the animation
    this.startAnimation();
  }

  startAnimation() {
    this.intervalId = setInterval(() => {
      this.currentFrame = this.frames[this.frameIndex];
      this.frameIndex = (this.frameIndex + 1) % this.frames.length; // Loop back to the first frame
      this.cd.detectChanges(); // Ensure the view updates
    }, this.frameSpeed);
  }

  ngOnDestroy() {
    // Clear the interval to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
