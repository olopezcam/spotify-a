import { Component, OnInit } from '@angular/core';
import * as dataRaw from '../../../../data/tracks.json';
import { TrackModel } from '@core/models/tacks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css'],
})
export class TracksPageComponent implements OnInit {
  // mockTrackList: Array<TrackModel> = [];
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    // const { data }: any = (dataRaw as any).default;
    // this.mockTrackList = data;
    const obserer1$ = this.trackService.dataTracksTrending$.subscribe(
      (response) => {
        this.tracksTrending = response;
      }
    );

    const obserer2$ = this.trackService.dataTracksRandom$.subscribe(
      (response) => {
        this.tracksRandom = [...this.tracksRandom, ...response];
      }
    );

    this.listObservers$.push(obserer1$, obserer2$);
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((observer) => {
      observer.unsubscribe();
    });
  }
}
