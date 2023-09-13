import { useState } from "react"
import { ScrollNumberGroup } from "../../../../dist/react-scroll-number"

const ScrollDirectly: React.FC = () => {
  const [value, setValue] = useState(0)
  const [input, setInput] = useState("")
  return (
    <div>
      <h1>Scroll Directly</h1>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="button" onClick={() => setValue(Number(input))}>
        submit
      </button>
      <div>
        <div>
          <h2>digitNumber = 2 </h2>
          <ScrollNumberGroup
            mode="ScrollDirectly"
            value={value}
            digitsNumber={2}
          ></ScrollNumberGroup>
        </div>
        <div>
          <h2>digitNumber = 4 </h2>
          <ScrollNumberGroup
            mode="ScrollDirectly"
            value={value}
            digitsNumber={4}
          ></ScrollNumberGroup>
        </div>
      </div>
    </div>
  )
}

export default ScrollDirectly
