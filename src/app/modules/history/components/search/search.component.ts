import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    standalone: true,
    imports: [FormsModule],
})
export class SearchComponent implements OnInit {
  @Output() callbackData: EventEmitter<any> = new EventEmitter();
  src: string = '';

  constructor() {}

  ngOnInit(): void {}

  callSearch(term: string): void {
    if (term.length >= 3) {
      this.callbackData.emit(term);
      console.log('Buscando...', term);
    }
  }
}
