import ScrollNumberGroup from "../../../Components/ScrollNumberGroup"

const ScrollByDigit: React.FC = () => {
  return (
    <div>
      <h2>ScrollByDigit</h2>
      <div>
        <div>
          <h2>digitNumber = 2 </h2>
          <ScrollNumberGroup
            mode="ScrollByDigit"
            value={66}
            digitsNumber={2}
          ></ScrollNumberGroup>
        </div>
        <div>
          <h2>digitNumber = 4 , delay = 2000</h2>
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
