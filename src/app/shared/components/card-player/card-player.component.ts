import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tacks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css'],
  standalone: true,
  imports: [NgIf, NgClass, ImgBrokenDirective],
})
export class CardPlayerComponent {
  @Input({ required: true }) mode: 'small' | 'big' = 'small';
  @Input({ required: true, alias: 'trackObject' }) track: TrackModel = {
    _id: 0,
    name: '',
    album: '',
    url: '',
    cover: '',
  };

  constructor(private multimediaService: MultimediaService) {}

  ngOnInit(): void {}

  sendPlay(track: TrackModel): void {
    this.multimediaService.trackInfo$.next(track);
  }
}
