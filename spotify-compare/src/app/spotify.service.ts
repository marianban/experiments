import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Track } from './track';
import { AudioFeatures } from './audio-features';

// OBTAIN CREDENTIALS FROM YOUR SPOTIFY DEV DASHBOARD https://developer.spotify.com/dashboard/applications/
const CLIENT_ID = '';
const CLIENT_SECRET = '';

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken = null;

  constructor(private http: HttpClient) {}

  // uses client credentials OAuth2 flow
  // very insecure for SPAs and should not be used in production but
  // functional for this demo app
  authenticate() {
    return new Promise((resolve, reject) => {
      const secretPair = `${CLIENT_ID}:${CLIENT_SECRET}`;
      const base64Secret = btoa(secretPair);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64Secret}`,
      });
      this.http
        .post<any>(
          // using proxy defined in proxy.config.json to overcome CORS error in browser
          '/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
          }).toString(),
          {
            headers,
          }
        )
        .pipe(tap(console.log))
        .subscribe((response) => {
          this.accessToken = response.access_token;
          resolve();
        });
    });
  }

  logout() {
    this.accessToken = null;
  }

  searchTracks(query: string): Observable<Track[]> {
    if (!query) {
      return of([]);
    }
    const q = encodeURIComponent(query);
    const url = `${this.apiUrl}/search?q=${q}&type=track`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      tap(console.log),
      map((response: any) => {
        return response.tracks.items.map(
          (track) =>
            new Track(
              track.id,
              track.name,
              track.album.name,
              track.album.images[0]?.url
            )
        );
      }),
      catchError(this.handleError<Track[]>('getTracks', []))
    );
  }

  getTrackAudioFeatures(trackId: string): Observable<AudioFeatures> {
    if (!trackId) {
      throw new Error('Empty trackId argument exception');
    }
    const url = `${this.apiUrl}/audio-features/${encodeURIComponent(trackId)}`;
    return this.http
      .get<AudioFeatures>(url, this.httpOptions)
      .pipe(
        tap(console.log),
        catchError(this.handleError<Track[]>('getTracks', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      if (error.status === 401) {
        // reload page to get a fresh access token
        location.reload();
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      }),
    };
  }
}
