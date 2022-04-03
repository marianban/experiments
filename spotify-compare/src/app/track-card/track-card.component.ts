import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../track';
import { AudioFeatures } from '../audio-features';
import { SpotifyService } from '../spotify.service';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.scss'],
})
export class TrackCardComponent implements OnInit {
  @Input() track: Track;
  audioFeatures: AudioFeatures;

  constructor(
    public spotifyService: SpotifyService,
    private comparisonService: ComparisonService
  ) {}

  ngOnInit(): void {
    this.spotifyService
      .getTrackAudioFeatures(this.track.id)
      .subscribe((audioFeatures) => {
        this.audioFeatures = audioFeatures;
      });
  }

  delete(track: Track) {
    this.comparisonService.deleteTrack(track);
  }
}
