import { EventEmitter, Injectable, effect, signal } from '@angular/core';
import { TrackModel } from '@core/models/tacks.model';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>();
  public audio!: HTMLAudioElement;

  public trackInfoSignal = signal<TrackModel | undefined>(undefined);

  public timeElapsedSignal = signal<string>('00:00');

  public timeRemainingSignal = signal<string>('-00:00');

  public playerStatusSignal = signal<string>('paused');

  public playerPercentageSignal = signal<number>(0);

  constructor() {
    this.audio = new Audio();
    effect(() => {
      const dataInfo = this.trackInfoSignal();
      if (dataInfo) {
        this.setAudio(dataInfo);
      }
    });

    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
  }

  private setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentageSignal.set(percentage);
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatusSignal.set('play');
        break;
      case 'playing':
        this.playerStatusSignal.set('playing');
        break;
      case 'ended':
        this.playerStatusSignal.set('ended');
        break;
      default:
        this.playerStatusSignal.set('paused');
        break;
    }
  };

  private calculateTime = () => {
    const { duration, currentTime } = this.audio;

    this.setTimeElapsed(currentTime);
    this.setRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  };

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((seconds / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsedSignal.set(displayFormat);
  }

  private setRemaining(currentTime: number, duration: number): void {
    const remaining = duration - currentTime;
    let seconds = Math.floor(remaining % 60);
    let minutes = Math.floor((remaining / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const displayFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeRemainingSignal.set(displayFormat);
  }

  public setAudio(track: TrackModel): void {
    console.log('setAudio', track);
    this.audio.src = track.url;
    this.audio.play();
  }

  public togglePlayer(): void {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
