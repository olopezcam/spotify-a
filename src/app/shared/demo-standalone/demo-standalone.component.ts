import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-standalone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-standalone.component.html',
  styleUrls: ['./demo-standalone.component.css']
})
export class DemoStandaloneComponent {

}
