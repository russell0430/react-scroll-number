import Scroll from "./components/ScrollNumber/Scroll"
import Control from "./components/ScrollNumber/Control"
import UnControl from "./components/ScrollNumber/UnControl"

import ScrollByDigit from "./components/ScrollNumberGroup/ScrollByDigit"
import ScrollDirectly from "./components/ScrollNumberGroup/ScrollDirectly"
import ControlGroup from "./components/ScrollNumberGroup/Control"
const Example: React.FC = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <h2 style={{ fontSize: "30px", color: "blue" }}>Scroll Number</h2>
        <Scroll />
        <Control />
        <UnControl />
      </div>
      <div style={{ width: "100%", borderBottom: "solid black 4px" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <h2 style={{ fontSize: "30px", color: "blue" }}>Scroll Number Group</h2>
        <ScrollByDigit />
        <ScrollDirectly />
        <ControlGroup />
      </div>
    </>
  )
}
export default Example
