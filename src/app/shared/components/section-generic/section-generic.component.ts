import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tacks.model';
import { CardPlayerComponent } from '../card-player/card-player.component';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css'],
  standalone: true,
  imports: [NgClass, NgFor, CardPlayerComponent],
})
export class SectionGenericComponent {
  @Input() title: string = '';
  @Input() mode: 'small' | 'big' = 'big';
  @Input() dataTracks: Array<TrackModel> = [];

  constructor() {}

  ngOnInit(): void {}
}
