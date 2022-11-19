import * as d3 from "d3";
import SimplexNoise from "simplex-noise";

const dimensions = {
  width: document.body.getBoundingClientRect().width,
  height: document.body.getBoundingClientRect().height,
};

const POINT_COUNT = 7;
const bezierOffset = dimensions.width / (POINT_COUNT * 2);
type point = [number, number];

const xScale = d3
  .scaleLinear()
  .domain([1, POINT_COUNT])
  .range([0, dimensions.width]);

export class WaveManager {
  pathEl?: SVGPathElement | null;
  readonly centerLine: number;
  private simplexTime: number;
  private readonly pointOrigins: point[];
  private readonly simplex: SimplexNoise;
  constructor(centerLine: number) {
    this.centerLine = centerLine;
    this.simplexTime = 0;
    this.pointOrigins = Array.from(new Array(10)).map((_, i) => [
      xScale(i),
      this.centerLine,
    ]);

    this.simplex = new SimplexNoise();
    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    if (this.pathEl) {
      let points = this.getPoints(this.simplexTime);
      let path = this.getPath(points);
      this.pathEl.setAttribute("d", path);
      this.simplexTime++;
    }
  }

  getPoints(tOffset: number): point[] {
    const simplexScale = 0.5;
    const simplexTimeScale = 0.0015;
    return this.pointOrigins.map((point, i) => {
      const yOffset =
        (this.simplex.noise2D(i * simplexScale, tOffset * simplexTimeScale) - 0.5) *
        100;
      return [point[0], point[1] + yOffset];
    });
  }

  getPath(points: point[]) {
    let prevPoint: typeof points["0"] = points[0];
    const path = `
    M 0 ${dimensions.height}
    L 0 ${this.centerLine}
    ${points
      .map((point) => {
        const curve = `C ${prevPoint[0] + bezierOffset} ${prevPoint[1]}, ${
          point[0] - bezierOffset
        } ${point[1]}, ${point[0]} ${point[1]} `;
        prevPoint = point;
        return curve;
      })
      .join("")}
    L ${dimensions.width} ${this.centerLine}
    L ${dimensions.width} ${dimensions.height}
  `;
    return path;
  }
}
