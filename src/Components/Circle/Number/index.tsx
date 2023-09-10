import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import wrapperRaf from "../../../utils/raf"
import "./style.scss"
type Mode = "Control" | "UnControl"
export interface NumberProps {
  // should be a single number between 0 ~ 9
  mode: Mode
  value?: number
  height?: number | string
  duration?: number
  onTransitionEnd?: () => void
}

export interface NumberRef {
  reset: () => void
  toggleNext: () => void
}
//               0  1  2  3  4  5  6  7  8  9  10 11
const numbers = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const Number: React.ForwardRefRenderFunction<NumberRef, NumberProps> = (
  { mode, value = 0, height = "30px", duration = 300, onTransitionEnd },
  ref
) => {
  const valueRef = useRef(value)
  valueRef.current = value
  const isPendingRef = useRef(false)
  const [index, setIndex] = useState(0)
  const rafRef = useRef<number | null>(null)
  const toggleNextNumber = useCallback(() => {
    isPendingRef.current = true
    setIndex((idx) => idx + 1)
  }, [])

  if (index === 11) {
    setIndex(0)
    if (valueRef.current !== 0 || mode === "Control")
      rafRef.current = wrapperRaf(() => {
        setIndex(1)
        rafRef.current = null
      })
  } else if (rafRef.current && index !== 0) {
    wrapperRaf.cancel(rafRef.current)
    rafRef.current = null
  }

  const onInternalTransitionEnd = useCallback(() => {
    if (valueRef.current !== index && mode === "UnControl") {
      toggleNextNumber()
    } else {
      isPendingRef.current = false
      onTransitionEnd && onTransitionEnd()
    }
  }, [index, mode, onTransitionEnd, toggleNextNumber])

  useEffect(() => {
    if (valueRef.current !== 0 && mode === "Control") {
      isPendingRef.current = true
      rafRef.current = wrapperRaf(() => {
        setIndex(1)
      })
    }
  }, [mode])

  useEffect(() => {
    if (value !== index && !isPendingRef.current) {
      isPendingRef.current = true
      toggleNextNumber()
    }
  }, [index, toggleNextNumber, value])

  const reset = () => {}

  useImperativeHandle(ref, () => ({
    reset,
    toggleNext: mode !== "Control" ? () => {} : toggleNextNumber,
  }))

  return (
    <ul style={{ height }} className="react-scroll-number">
      <div className="bounce">
        <div
          className={`number-wrapper animate`}
          style={{
            transform: `translateY(-${index + 1}00%)`,
            height: "100%",
            transitionDuration: `${duration}ms`,
            transitionProperty: index === 11 || index == 0 ? "none" : "all",
          }}
          onAnimationStart={() => console.log("ss")}
          onTransitionEndCapture={onInternalTransitionEnd}
        >
          {numbers.map((num, index) => (
            <li className="number-index" key={index}>
              <span>{num}</span>
            </li>
          ))}
        </div>
      </div>
    </ul>
  )
}

export default React.forwardRef<NumberRef, NumberProps>(Number)
