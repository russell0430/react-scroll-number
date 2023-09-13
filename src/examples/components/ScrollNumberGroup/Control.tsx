import { useRef } from "react"
import {
  ScrollNumberGroup,
  ScrollNumberGroupRef,
} from "../../../../dist/react-scroll-number"

const Control: React.FC = () => {
  const ref = useRef<ScrollNumberGroupRef>(null)
  return (
    <div>
      <h1>Scroll Number Group Scroll</h1>
      <ScrollNumberGroup mode="Control" ref={ref} digitsNumber={2} value={50} />
      <button type="button" onClick={() => ref.current?.toggleNext()}>
        +
      </button>
      <button type="button" onClick={() => ref.current?.togglePrev()}>
        -
      </button>
    </div>
  )
}
export default Control
