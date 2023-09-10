// import Circle from "./Components/Circle"
import { useEffect, useRef, useState } from "react"
import ScrollNumber, { ScrollNumberRef } from "./Components/ScrollNumber"
import ScrollNumberGroup from "./Components/ScrollNumberGroup"
function App() {
  const ref = useRef<ScrollNumberRef>(null)

  useEffect(() => {
    const listener = () => ref.current?.togglePrev()
    window.addEventListener("click", listener)
    return () => window.removeEventListener("click", listener)
  }, [])
  useEffect(() => {
    // setTimeout(() => {
    //   setV(81)
    // }, 7000)
    // setTimeout(() => {
    //   setV(30)
    // }, 10500)
  }, [])
  return (
    <>
      {/* <Circle percent={50}></Circle> */}
      <ScrollNumberGroup digitsNumber={5} mode="ScrollDirectly" value={35} />
      {/* <Number value={6} height={30} ref={numberRef}></Number> */}
    </>
  )
}

export default App
