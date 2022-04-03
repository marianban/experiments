import { Component, OnInit, EventEmitter } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Track } from '../track';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-comparison-toolbar',
  templateUrl: './comparison-toolbar.component.html',
  styleUrls: ['./comparison-toolbar.component.scss'],
})
export class ComparisonToolbarComponent implements OnInit {
  private searchTerms = new Subject<string>();

  myControl = new FormControl();
  selectedTrack: Track = null;
  tracks$: Observable<Track[]>;

  constructor(
    private spotifyService: SpotifyService,
    private comparisonService: ComparisonService
  ) {}

  ngOnInit(): void {
    this.tracks$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.spotifyService.searchTracks(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  select(track: Track) {
    this.selectedTrack = track;
  }

  add() {
    this.comparisonService.addTrack(this.selectedTrack);
    this.myControl.reset();
    this.selectedTrack = null;
  }

  deleteComparison() {
    this.comparisonService.deleteComparison();
  }

  hasComparisons() {
    return !!this.comparisonService.getComparisons().length;
  }
}
