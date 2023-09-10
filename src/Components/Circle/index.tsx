import React, { useRef } from "react"
import Number, { NumberRef } from "./Number"
import "./style.scss"
const parsePercent = (percent: number, index: 0 | 1) => {
  return index === 0 ? percent % 10 : Math.floor(percent / 10)
}
const Circle: React.FC<{ percent: number }> = ({ percent }) => {
  const p0 = parsePercent(percent, 0)
  const p1 = parsePercent(percent, 1)
  const numberRef = useRef<NumberRef>(null)

  // console.log(p0, p1)
  return (
    <div className="card" onClick={numberRef.current?.toggleNext}>
      <div className="rating">
        <h2>
          <span className="counter">
            <Number height="30px" value={p1} duration={400} mode="UnControl" />
            <Number value={p0} height="30px" duration={1000} mode="UnControl" />
          </span>
          <sup>%</sup>
          <br />
          HTML
        </h2>
        {Array(percent + 1)
          .fill(0)
          .map((_, idx) => {
            return (
              <div
                className="block"
                key={idx}
                style={{
                  transform: `rotate(${idx * 3.6}deg)`,
                  animationDelay: `${idx / 40}s`,
                }}
              ></div>
            )
          })}
      </div>
    </div>
  )
}

export default Circle
