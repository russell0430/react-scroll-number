import { useRef } from "react"
import {
  ScrollNumber,
  ScrollNumberRef,
} from "../../../../dist/react-scroll-number"

const Control: React.FC = () => {
  const ref = useRef<ScrollNumberRef>(null)
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Control</h2>
      <ScrollNumber mode="Control" ref={ref}></ScrollNumber>
      <div>
        <button type="button" onClick={() => ref.current?.toggleNext()}>
          +
        </button>
        <button type="button" onClick={() => ref.current?.togglePrev()}>
          -
        </button>
      </div>
    </div>
  )
}

export default Control
