const updateInterval = 1000 / 60;

const generateData = (resolution, offset = 1) => {
  const data = new Array(resolution);
  let index = 0;
  for (let i=offset; i<resolution + offset; i++) {
    const x = (16 * Math.PI) * (i / resolution);
    data[index] = [
      x,
      Math.sin(x)
    ];
    index++;
  }

  return data;
};

export class Generator {
  constructor(config) {
    this.duration = config.duration;
    this.samples = config.samples;
    this.generate = this.generate.bind(this);
    this.offset = 0;
  }
  generate() {
    const totalNumberOfUpdates = this.duration / updateInterval;
    const offsetIncrement = this.samples / totalNumberOfUpdates;
    this.offset = this.offset + offsetIncrement;
    const data = generateData(this.samples, this.offset);
    return data;
  }
}
