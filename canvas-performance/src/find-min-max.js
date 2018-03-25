export const findMinMax = (data) => {
  let minX = Number.MAX_SAFE_INTEGER, maxX = Number.MIN_SAFE_INTEGER, minY = Number.MAX_SAFE_INTEGER, maxY = Number.MIN_SAFE_INTEGER

  for (let i=0; i<data.length; i++) {
    const [x, y] = data[i]
    if (x < minX) {
      minX = x
    } else if (x > maxX) {
      maxX = x
    }
    if (y < minY) {
      minY = y
    } else if (y > maxY) {
      maxY = y
    }
  }

  return {
    minX,
    maxX,
    minY,
    maxY
  }
}
