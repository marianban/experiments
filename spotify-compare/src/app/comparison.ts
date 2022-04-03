import { Track } from './track';
import { v4 } from 'uuid';

export class Comparison {
  constructor(public id: string, public date: Date, public tracks: Track[]) {}

  public static NewComparison() {
    const comparison = new Comparison(v4(), new Date(), []);
    return comparison;
  }

  addTrack(track: Track) {
    this.tracks.push(track);
  }

  deleteTrack(track: Track) {
    const trackToRemoveIndex = this.tracks.findIndex((t) => t.id === track.id);
    if (trackToRemoveIndex > -1) {
      this.tracks.splice(trackToRemoveIndex, 1);
    }
  }
}
