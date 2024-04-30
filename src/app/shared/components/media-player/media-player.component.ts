import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
  effect,
} from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { destroyCustom } from '@core/utils/destoyCustom';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
  standalone: true,
  imports: [NgTemplateOutlet, NgIf, NgClass, AsyncPipe],
})
export class MediaPlayerComponent {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  state: string = 'paused';
  multimediaService = inject(MultimediaService);
  destroyCustom = destroyCustom();

  constructor() {
    effect(() => {
      const state = this.multimediaService.playerStatusSignal();
      this.state = state;
    });
  }

  handlePosition(event: MouseEvent): void {
    const progressBar = this.progressBar.nativeElement as HTMLDivElement;
    const width = progressBar.clientWidth;
    const clickX = event.offsetX;
    const duration = this.multimediaService.audio.duration;
    this.multimediaService.audio.currentTime = (clickX / width) * duration;
  }
}
