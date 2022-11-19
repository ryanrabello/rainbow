import * as d3 from "d3";
import "./App.css";
import { Wave } from "./Wave/Wave";

// const colors = ["ff595e", "ffca3a", "8ac926", "1982c4", "6a4c93"];
const colors = ["ffadad","ffd6a5","fdffb6","caffbf","9bf6ff","a0c4ff","bdb2ff","ffc6ff","fffffc"];

const bgColor = colors.shift();

document.body.style.background = `#${bgColor}`;

const yScale = d3
  .scaleLinear()
  .domain([-1, colors.length])
  .range([0, document.body.getBoundingClientRect().height]);

function App() {
  return (
    <svg width="100%" height="100%">
      {colors.map((color, i) => (
        <Wave key={i} centerLine={yScale(i)} color={`#${color}`} />
      ))}
    </svg>
  );
}

export default App;
