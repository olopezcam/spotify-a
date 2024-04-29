import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MediaPlayerComponent } from '../../../../shared/components/media-player/media-player.component';
import { SideBarComponent } from '../../../../shared/components/side-bar/side-bar.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [SideBarComponent, MediaPlayerComponent, RouterOutlet],
  providers: [
    {
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          paramMap: {
            get: () => '1', // representa el valor 'id' en la ruta
          },
        },
        params: of({ id: '1' }), // representa un Observable de los parámetros de la ruta
      },
    },
  ],
})
export class HomePageComponent {}
