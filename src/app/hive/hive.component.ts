import {Component} from '@angular/core';
import {StudentNodeComponent} from "./student-node/student-node.component";

@Component({
    selector: 'app-hive',
    standalone: true,
    imports: [StudentNodeComponent],
    templateUrl: './hive.component.html',
    styleUrls: ['./hive.component.css']  // Corrected from styleUrl to styleUrls
})
export class HiveComponent {
    current_temp: number = 5; // It's also a good practice to explicitly type the variable
}

