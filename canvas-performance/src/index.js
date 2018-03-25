import echarts from 'echarts'
import { Generator } from './Generator.js'
import { Chart } from './Chart.js'
import { findMinMax } from './find-min-max.js'

const generator = new Generator({ duration: 3000, samples: 600 });

const drawCharts = (numberOfCharts) => {
  const data = generator.generate();
  for (var i = 0; i < numberOfCharts; i++) {
    const id = `canvas_${i}`;
    const canvas = document.getElementById(id);
    const chart = new Chart(canvas);
    chart.draw(data);
  }
  window.requestAnimationFrame(() => drawCharts(numberOfCharts));
}

const createCharts = (numberOfCharts) => {
  const container = document.getElementById('container');
  for (var i = 0; i < numberOfCharts; i++) {
    const canvas = document.createElement('canvas');
    canvas.id = `canvas_${i}`;
    canvas.width = 600;
    canvas.height = 300;
    container.appendChild(canvas);
  }
}

const createECharts = (numberOfCharts) => {
  const container = document.getElementById('container');
  for (var i = 0; i < numberOfCharts; i++) {
    const canvas = document.createElement('div');
    canvas.id = `canvas_${i}`;
    canvas.style.width = '600px';
    canvas.style.height = '300px';
    container.appendChild(canvas);
    echarts.init(canvas)
  }
}

const drawECharts = (numberOfCharts) => {
  const data = generator.generate();
  for (var i = 0; i < numberOfCharts; i++) {
    const id = `canvas_${i}`;
    const canvas = document.getElementById(id);
    const chart = echarts.getInstanceByDom(canvas);
    const { minX, maxX, minY, maxY } = findMinMax(data);
    chart.setOption({
      animation: false,
      xAxis: [{
        show: true,
        min: minX,
        max: maxX
      }],
      yAxis: [{
        show: true,
        min: minY,
        max: maxY
      }],
      series: [
        {
          showSymbol: false,
          type: 'line',
          data: data,
          large: true,
        }
      ]
    }, false, true)
  }
  window.requestAnimationFrame(() => drawECharts(numberOfCharts));
}

window.onload = () => {
  const numberOfCharts = 6;
  const echarts = false;
  if (echarts) {
    createECharts(numberOfCharts);
    drawECharts(numberOfCharts);
  } else {
    createCharts(numberOfCharts);
    drawCharts(numberOfCharts);
  }
};
