import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tacks.model';
import { Subscription } from 'rxjs';
import { SectionGenericComponent } from '../../../../shared/components/section-generic/section-generic.component';
import {
  getAllRandom$,
  getAllTracks$,
} from '@modules/tracks/services/track2.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css'],
  standalone: true,
  imports: [SectionGenericComponent, CommonModule],
})
export class TracksPageComponent {
  @Input() currentUser: any;
  @Input() category: string | undefined;

  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];
  listObservers$: Array<Subscription> = [];

  constructor() {
    getAllTracks$().subscribe((response) => {
      this.tracksTrending = response;
    });

    getAllRandom$().subscribe((response: TrackModel[]) => {
      this.tracksRandom = response;
    });
  }
}
