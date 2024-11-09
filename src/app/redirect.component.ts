import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-redirect-to-google',
  standalone: true,
  template: ''
})
export class RedirectToGoogleComponent implements OnInit {
  ngOnInit(): void {
    window.location.href = 'https://bit.ly/ICSIntro01';
  }
}
