// email-spin.service.ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailSpinService {
  private _emailspinFrame = 0;
  private totalFrames = 18;

  incrementFrame() {
    this._emailspinFrame = (this._emailspinFrame + 1) % this.totalFrames; // Cycle through frames
  }

  getCurrentFrame() {
    return this._emailspinFrame;
  }
}
