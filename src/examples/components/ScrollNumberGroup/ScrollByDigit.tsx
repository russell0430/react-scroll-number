import { ScrollNumberGroup } from "../../../../dist/react-scroll-number"

const ScrollByDigit: React.FC = () => {
  return (
    <div>
      <h1>ScrollByDigit</h1>
      <div>
        <div>
          <ScrollNumberGroup
            mode="ScrollByDigit"
            value={66}
            digitsNumber={2}
          ></ScrollNumberGroup>
        </div>
        <div>
          <h2>delay = 2000</h2>
          <ScrollNumberGroup
            mode="ScrollByDigit"
            value={88}
            delay={2000}
            digitsNumber={4}
          ></ScrollNumberGroup>
        </div>
      </div>
    </div>
  )
}

export default ScrollByDigit
