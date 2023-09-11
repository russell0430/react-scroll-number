import Scroll from "./components/ScrollNumber/Scroll"
import Control from "./components/ScrollNumber/Control"
import UnControl from "./components/ScrollNumber/UnControl"

import ScrollByDigit from "./components/ScrollNumberGroup/ScrollByDigit"
import ScrollDirectly from "./components/ScrollNumberGroup/ScrollDirectly"
import ControlGroup from "./components/ScrollNumberGroup/Control"
const Example: React.FC = () => {
  return (
    <>
      <div>
        <h2 style={{ fontSize: "30px", color: "blue" }}>Scroll Number</h2>
        <Scroll />
        <div style={{ width: "100%", borderBottom: "solid black 2px" }}></div>
        <Control />
        <div style={{ width: "100%", borderBottom: "solid black 2px" }}></div>
        <UnControl />
      </div>
      <div style={{ width: "100%", borderBottom: "solid black 4px" }}></div>
      <div>
        <h2 style={{ fontSize: "30px", color: "blue" }}>Scroll Number Group</h2>
        <ScrollByDigit />
        <div style={{ width: "100%", borderBottom: "solid black 2px" }}></div>
        <ScrollDirectly />
        <div style={{ width: "100%", borderBottom: "solid black 2px" }}></div>
        <ControlGroup />
      </div>
    </>
  )
}
export default Example
