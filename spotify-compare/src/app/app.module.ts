import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { TrackCardComponent } from './track-card/track-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ComparisonToolbarComponent } from './comparison-toolbar/comparison-toolbar.component';
import { ComparisonsListComponent } from './comparisons-list/comparisons-list.component';
import { ComparisonDetailComponent } from './comparison-detail/comparison-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AudioFeatureComponent } from './audio-feature/audio-feature.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackCardComponent,
    ComparisonToolbarComponent,
    ComparisonsListComponent,
    ComparisonDetailComponent,
    AudioFeatureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
