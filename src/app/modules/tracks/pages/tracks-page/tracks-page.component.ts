import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tacks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
import { SectionGenericComponent } from '../../../../shared/components/section-generic/section-generic.component';

@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrls: ['./tracks-page.component.css'],
    standalone: true,
    imports: [SectionGenericComponent],
})
export class TracksPageComponent implements OnInit {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
  }

  async loadDataAll(): Promise<any> {
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise();
    // this.tracksRandom = await this.trackService.getAllTracks$().toPromise();
    // this.trackService.getAllTracks$().subscribe((tracks: TrackModel[]) => {
    //   this.tracksTrending = tracks;
    // });
    // const dataRaw = await this.trackService
    //   .getAllTracks$()
    //   .toPromise()
    //   .then((res: TrackModel[]) => {
    //     this.tracksTrending = res;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  loadDataRandom(): void {
    this.trackService.getAllRandom$().subscribe((tracks: TrackModel[]) => {
      console.log(tracks);
      this.tracksRandom = tracks;
    });
  }

  ngOnDestroy(): void {}
}
