import { Injectable } from '@angular/core';
import { Comparison } from './comparison';
import { Track } from './track';
import { min } from 'rxjs/operators';

type Comparisons = Record<string, Comparison>;
const DATA_LOCAL_STORAGE_KEY = 'SPOTIFY_COMPARE_DATA';
const ACTIVE_LOCAL_STORAGE_KEY = 'SPOTIFY_COMPARE_DATA_ACTIVE';

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {
  comparisons: Comparisons = {};
  activeComparisonId: string = null;

  constructor() {}

  loadData() {
    this.loadComparisons();
    this.loadActiveComparison();
  }

  selectComparison(comparison: Comparison) {
    this.activeComparisonId = comparison.id;
    this.save();
  }

  getComparisons(): Comparison[] {
    return Object.values(this.comparisons);
  }

  getTracks(comparisonId) {
    if (!this.activeComparison) {
      return [];
    }

    return this.activeComparison.tracks;
  }

  addTrack(track: Track) {
    this.activeComparison.addTrack(track);
    this.save();
  }

  deleteTrack(track: Track) {
    this.activeComparison.deleteTrack(track);
    this.save();
  }

  deleteComparison() {
    delete this.comparisons[this.activeComparisonId];
    const comparisons = this.getComparisons();
    if (comparisons.length) {
      this.activeComparisonId = comparisons[0].id;
    } else {
      this.activeComparisonId = null;
    }
    this.save();
  }

  newComparison() {
    const comparison = Comparison.NewComparison();
    this.comparisons[comparison.id] = comparison;
    this.activeComparisonId = comparison.id;
    this.save();
  }

  public get activeComparison(): Comparison {
    if (!this.activeComparisonId) {
      return null;
    }

    return this.comparisons[this.activeComparisonId];
  }

  private save() {
    localStorage.setItem(
      DATA_LOCAL_STORAGE_KEY,
      JSON.stringify(this.comparisons)
    );
    localStorage.setItem(
      ACTIVE_LOCAL_STORAGE_KEY,
      JSON.stringify(this.activeComparisonId)
    );
  }

  private loadComparisons() {
    const data = localStorage.getItem(DATA_LOCAL_STORAGE_KEY);
    if (data) {
      try {
        const initial: Comparisons = {};
        const values = Object.values(JSON.parse(data));
        this.comparisons = values.reduce((acc: Comparisons, c: any) => {
          acc[c.id] = new Comparison(c.id, c.date, c.tracks);
          return acc;
        }, initial) as Comparisons;
      } catch (error) {
        console.error(
          'Corrupted local storage data. Resetting to empty state. Details: \n' +
            error
        );
        localStorage.removeItem(DATA_LOCAL_STORAGE_KEY);
      }
    }
  }

  private loadActiveComparison() {
    const data = localStorage.getItem(ACTIVE_LOCAL_STORAGE_KEY);
    if (data) {
      try {
        this.activeComparisonId = JSON.parse(data);
      } catch (error) {
        console.error(
          'Corrupted local storage data. Resetting to empty state. Details: \n' +
            error
        );
        localStorage.removeItem(ACTIVE_LOCAL_STORAGE_KEY);
      }
    }
  }
}
