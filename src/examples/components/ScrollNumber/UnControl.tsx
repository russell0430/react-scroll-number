import { ScrollNumber } from "../../../../dist/react-scroll-number"

const UnControl: React.FC = () => {
  return (
    <div>
      <h2>UnControl</h2>
      <ScrollNumber mode="UnControl" value={8} initialValue={0}></ScrollNumber>
    </div>
  )
}

export default UnControl
