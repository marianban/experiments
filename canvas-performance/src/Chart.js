import { scaleLinear } from 'd3-scale'
import { findMinMax } from './find-min-max.js'
import simplify from './simplify.js'

export class Chart {
  constructor(element, config = {}) {
    this.padding = config.padding || 0;
    this.element = element;
    this.width = element.width;
    this.height = element.height;

    this.draw = this.draw.bind(this);
    this.scaleData = this.scaleData.bind(this);
    this.drawLine = this.drawLine.bind(this);
  }
  scaleData(data) {
    const { minX, maxX, minY, maxY } = findMinMax(data);

    const xScale = scaleLinear()
      .domain([minX.toFixed(2), maxX.toFixed(2)])
      .range([this.padding, this.width - this.padding]);

    const yScale = scaleLinear()
      .domain([minY.toFixed(2), maxY.toFixed(2)])
      .range([this.height - this.padding, this.padding]);

    for (let i=0; i<data.length; i++) {
      data[i][0] = xScale(data[i][0]);
      data[i][1] = yScale(data[i][1]);
    }

    return simplify(data);
  }
  drawLine(data) {
    var ctx = this.element.getContext('2d', { alpha: false });
    ctx.lineWidth=2;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.beginPath();
    const [x, y] = data[0];
    ctx.moveTo(x, y);
    for (var i = 0; i < data.length; i++) {
      const [x, y] = data[i];
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }
  draw(data) {
    const scalledData = this.scaleData(data);
    this.drawLine(scalledData);
  }
}
