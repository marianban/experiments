import { Component, OnInit } from '@angular/core';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-comparison-detail',
  templateUrl: './comparison-detail.component.html',
  styleUrls: ['./comparison-detail.component.scss'],
})
export class ComparisonDetailComponent implements OnInit {
  constructor(public comparisonService: ComparisonService) {}

  ngOnInit(): void {}
}
