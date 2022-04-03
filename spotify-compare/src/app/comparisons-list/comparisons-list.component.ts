import { Component, OnInit } from '@angular/core';
import { ComparisonService } from '../comparison.service';
import { Comparison } from '../comparison';

@Component({
  selector: 'app-comparisons-list',
  templateUrl: './comparisons-list.component.html',
  styleUrls: ['./comparisons-list.component.scss'],
})
export class ComparisonsListComponent implements OnInit {
  constructor(public comparisonService: ComparisonService) {}

  ngOnInit(): void {}

  newComparison() {
    this.comparisonService.newComparison();
  }

  selectComparison(comparison: Comparison) {
    this.comparisonService.selectComparison(comparison);
  }
}
