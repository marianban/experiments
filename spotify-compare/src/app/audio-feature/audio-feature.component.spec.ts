import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioFeatureComponent } from './audio-feature.component';

describe('AudioFeatureComponent', () => {
  let component: AudioFeatureComponent;
  let fixture: ComponentFixture<AudioFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
