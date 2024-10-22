import { Component, Input, OnInit } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-student-node',
  templateUrl: './student-node.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  styleUrls: ['./student-node.component.css']
})
export class StudentNodeComponent implements OnInit {
  @Input() student!: string;
  @Input() light_color: string = 'rgba(255, 0, 0, 1)';
  @Input() open_food: boolean = true;
  @Input() temp: number = 20;

  constructor() {}

  ngOnInit(): void {}
}
