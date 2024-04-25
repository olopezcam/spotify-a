import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  listObservers$: Array<Subscription> = [];
  state: string = 'paused';
  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$.subscribe(
      (status) => (this.state = status)
    );
    this.listObservers$ = [observer1$];
  }

  handlePosition(event: MouseEvent): void {
    const progressBar = this.progressBar.nativeElement as HTMLDivElement;
    const width = progressBar.clientWidth;
    const clickX = event.offsetX;
    const duration = this.multimediaService.audio.duration;
    this.multimediaService.audio.currentTime = (clickX / width) * duration;
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((observer) => observer.unsubscribe());
  }
}
