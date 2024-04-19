import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackModel } from '@core/models/tacks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    cover: 'https://i.scdn.co/image/ab67616d0000b27345ca41b0d2352242c7c9d4bc',
    album: 'Gioli & Assia',
    name: 'BEBE (Oficial)',
    url: 'https://open.spotify.com/',
    _id: 1,
  };

  listObservers$: Array<Subscription> = [];

  constructor(private multimediaPlayer: MultimediaService) {}

  ngOnInit(): void {
    const oberver1$: Subscription = this.multimediaPlayer.callback.subscribe(
      (response: TrackModel) => {
        console.log('Track playing: ', response);
      }
    );
    this.listObservers$.push(oberver1$);
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((observer) => observer.unsubscribe());
  }
}
