import echarts from 'echarts'
import * as d3 from 'd3'
import { Generator } from './Generator.js'
import { Chart } from './Chart.js'
import { findMinMax } from './find-min-max.js'

const generator = new Generator({ duration: 3000, samples: 600 })

const createCharts = numberOfCharts => {
  const container = document.getElementById('container')
  for (var i = 0; i < numberOfCharts; i++) {
    const canvas = document.createElement('canvas')
    canvas.id = `canvas_${i}`
    canvas.width = 600
    canvas.height = 300
    container.appendChild(canvas)
  }
}

const drawCharts = numberOfCharts => {
  const data = generator.generate()
  for (var i = 0; i < numberOfCharts; i++) {
    const id = `canvas_${i}`
    const canvas = document.getElementById(id)
    const chart = new Chart(canvas)
    chart.draw(data)
  }
  window.requestAnimationFrame(() => drawCharts(numberOfCharts))
}

const createECharts = numberOfCharts => {
  const container = document.getElementById('container')
  for (var i = 0; i < numberOfCharts; i++) {
    const canvas = document.createElement('div')
    canvas.id = `canvas_${i}`
    canvas.style.width = '600px'
    canvas.style.height = '300px'
    container.appendChild(canvas)
    echarts.init(canvas)
  }
}

const drawECharts = numberOfCharts => {
  const data = generator.generate()
  for (var i = 0; i < numberOfCharts; i++) {
    const id = `canvas_${i}`
    const canvas = document.getElementById(id)
    const chart = echarts.getInstanceByDom(canvas)
    const { minX, maxX, minY, maxY } = findMinMax(data)
    chart.setOption(
      {
        animation: false,
        xAxis: [
          {
            show: true,
            min: minX,
            max: maxX,
          },
        ],
        yAxis: [
          {
            show: true,
            min: minY,
            max: maxY,
          },
        ],
        series: [
          {
            showSymbol: false,
            type: 'line',
            data: data,
            large: true,
          },
        ],
      },
      false,
      true,
    )
  }
  window.requestAnimationFrame(() => drawECharts(numberOfCharts))
}

const createD3Charts = numberOfCharts => {
  const container = document.getElementById('container')
  for (var i = 0; i < numberOfCharts; i++) {
    const svg = document.createElement('svg')
    svg.id = `svg_${i}`
    svg.setAttribute('width', '600')
    svg.setAttribute('height', '300')
    const path = document.createElement('path')
    svg.appendChild(path)
    container.appendChild(svg)
  }
}

const drawD3Charts = numberOfCharts => {
  const data = generator.generate()
  for (var i = 0; i < numberOfCharts; i++) {
    const id = `#svg_${i}`
    const svg = d3.select(id)
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const width = 600 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const { minX, maxX, minY, maxY } = findMinMax(data)
    const x = d3.scaleLinear().domain([minX, maxX]).range([0, width])
    const y = d3.scaleLinear().domain([minY, maxY]).range([height, 0])

    var line = d3
      .line()
      .x(function(d) {
        // console.log(x(d[0]))
        return x(d[0])
      })
      .y(function(d) {
        return y(d[1])
      })

    const path = line(data)

    /*
    g
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))

    g.append('g').call(d3.axisLeft(y))
    */

    svg.removeChild(svg.lastChild)

    svg.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', path)
  }
  window.requestAnimationFrame(() => drawD3Charts(numberOfCharts))
}

window.onload = () => {
  const numberOfCharts = 1
  const type = 'D' //E,D/C
  if (type === 'E') {
    createECharts(numberOfCharts)
    drawECharts(numberOfCharts)
  } else if (type === 'C') {
    createCharts(numberOfCharts)
    drawCharts(numberOfCharts)
  } else if (type === 'D') {
    createD3Charts(numberOfCharts)
    drawD3Charts(numberOfCharts)
  }
}
