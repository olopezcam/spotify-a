import { Component, OnInit, Input } from '@angular/core';
import { TrackModel } from '@core/models/tacks.model';
import { OrderListPipe } from '../../pipe/order-list.pipe';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';
import { NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-play-list-body',
    templateUrl: './play-list-body.component.html',
    styleUrls: ['./play-list-body.component.css'],
    standalone: true,
    imports: [
        NgFor,
        NgTemplateOutlet,
        ImgBrokenDirective,
        OrderListPipe,
    ],
})
export class PlayListBodyComponent implements OnInit {
  @Input() tracks: TrackModel[] = [];
  optionSort: { property: string | null; order: string } = {
    property: null,
    order: 'asc',
  };

  constructor() {}
  ngOnInit(): void {}

  changeSort(property: string): void {
    const { order } = this.optionSort;
    this.optionSort = {
      property: property,
      order: order === 'asc' ? 'desc' : 'asc',
    };
    console.log(this.optionSort);
  }
}
function Imput(target: PlayListBodyComponent, propertyKey: 'tracks'): void {
  throw new Error('Function not implemented.');
}
