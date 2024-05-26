import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { countryCode } from '../../../../../../models/countryCode.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-countryList',
  templateUrl: './countryList.component.html',
  styleUrls: ['./countryList.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class CountryListComponent implements OnInit {
  // emit event with the selected country
  @Output() selected = new EventEmitter<countryCode>();
  // all countries list
  @Input() allCountries: countryCode[] = [];
  filterCountries: countryCode[] | null = null;
  language: string;

  ngOnInit(): void {
    this.language = localStorage.getItem('lang') || 'en';
  }

  // filter countries based on user input
  onSearch(e: Event) {
    // filter countries and store in filterCountries
    this.filterCountries = this.allCountries.filter((country) =>
      country.name
        .toLowerCase()
        .includes((e.target as HTMLInputElement).value.toLowerCase()),
    );
  }
  // change selected country
  onSelected(e: countryCode) {
    this.selected.emit(e);
  }
}
