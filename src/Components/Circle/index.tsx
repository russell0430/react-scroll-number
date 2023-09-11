import React from "react"
import ScrollNumberGroup from "../ScrollNumberGroup"
import "./style.scss"

const Circle: React.FC<{ percent: number }> = ({ percent }) => {
  // console.log(p0, p1)
  return (
    <div className="card">
      <div className="rating">
        <h2>
          <span className="counter">
            <ScrollNumberGroup
              mode="ScrollDirectly"
              value={percent}
              digitsNumber={2}
            ></ScrollNumberGroup>
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
