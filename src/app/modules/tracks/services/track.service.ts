import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tacks.model';
import { Observable, of } from 'rxjs';
import * as dataRaw from '../../../data/tracks.json';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  dataTracksTrending$: Observable<TrackModel[]> = of([]);
  dataTracksRandom$: Observable<TrackModel[]> = of([]);

  constructor() {
    const { data } = (dataRaw as any).default;
    this.dataTracksTrending$ = of(data);

    this.dataTracksRandom$ = new Observable((observer) => {
      const trackExample: TrackModel = {
        _id: 9,
        name: 'Track 9',
        album: 'Album 9',
        url: 'https://www.youtube.com/watch?v=9',
        cover: 'https://picsum.photos/200/200',
      };
      setTimeout(() => {
        observer.next([trackExample]);
      }, 3500);
    });
  }
}
