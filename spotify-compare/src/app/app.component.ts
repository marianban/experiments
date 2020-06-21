import { Component } from '@angular/core';
import { ComparisonService } from './comparison.service';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'spotify-compare';
  links = ['2020-06-12 09:09:59', '2020-06-12 09:09:59', '2020-06-12 09:09:59'];

  constructor(
    private comparisonService: ComparisonService,
    public spotifyService: SpotifyService
  ) {}

  async ngOnInit() {
    await this.spotifyService.authenticate();
    this.comparisonService.loadData();
  }
}
