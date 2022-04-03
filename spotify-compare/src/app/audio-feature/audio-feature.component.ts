import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audio-feature',
  templateUrl: './audio-feature.component.html',
  styleUrls: ['./audio-feature.component.scss'],
})
export class AudioFeatureComponent implements OnInit {
  @Input() label: string;
  @Input() value: string;

  constructor() {}

  ngOnInit(): void {}
}
