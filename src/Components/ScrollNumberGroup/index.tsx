import React, {
  useEffect,
  // useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import ScrollNumber, { ScrollNumberProps } from "../ScrollNumber"
import { ScrollNumberGroupProps } from "./interface"
import useLastValue from "../../hooks/useLastValue"

import splitNum2Digits from "../../utils/splitNum2Digits"
import { AnimationProp } from "../ScrollNumber/interface"

type ScrollNumberMode = ScrollNumberProps["mode"]
export type ScrollNumberGroupRef = {
  toggleNext: VoidFunction
  togglePrev: VoidFunction
}
const ScrollNumberGroup: React.ForwardRefRenderFunction<
  ScrollNumberGroupRef,
  ScrollNumberGroupProps
> = (props, ref) => {
  ref // erase the error
  
  const {
    digitsNumber,
    value: valueFromProps = 0,
    mode,
    duration = 3000,
  } = props
  // const [value, setValue] = useState(0)
  const lastValue = useLastValue(valueFromProps, 0)

  // const [value, setValue] = useState(valueFromProps)

  const digitPadding = useMemo(() => {
    return Array(digitsNumber).fill(0)
  }, [digitsNumber])
  const digits = useMemo(
    () => splitNum2Digits(valueFromProps),
    [valueFromProps]
  )
  const reversedDigits = [...digits].reverse()
  const digitItems = useMemo(() => {
    return digitPadding
      .map((item, index) => reversedDigits[index] | item)
      .reverse()
  }, [digitPadding, reversedDigits])

  const interpolatedDigits = useMemo(() => {
    const reversedValue = splitNum2Digits(lastValue).reverse()
    return digitPadding
      .map(
        (item, index) =>
          (reversedDigits[index] || 0) - (reversedValue[index] || 0)
      )
      .map((item) => (item < 0 ? item + 10 : item))
      .reverse()
  }, [digitPadding, lastValue, reversedDigits])

  // const ignoreInterpolation = Number(interpolatedDigits.join()) === 0
  // const [instance, setInstance] = useRefs<ScrollNumberRef>()
  // useEffect(() => {
  //   instance.get(1)?.toggleNext()
  // }, [instance])

  const [digitModes, setDigitModes] = useState<ScrollNumberMode[]>(() => {
    if (mode === "ScrollDirectly") {
      return digitPadding.map(() => "UnControl")
    } else if (mode === "ScrollByDigit") {
      return digitPadding.map(() => "Scroll")
    } else if (mode === "Control") {
      return digitPadding.map(() => "Control")
    }
    // default return
    return ["Control", "Control", "Control"]
  })

  console.log(digitModes)

  const scrollByDigitCallback = () => {
    ScrollByDigitRef.current--
    if (ScrollByDigitRef.current < 0) return
    setDigitModes((prev) => {
      const pending = [...prev]
      pending[ScrollByDigitRef.current] = "UnControl"
      return pending
    })
  }

  const ScrollByDigitRef = useRef(digitsNumber)
  const delay = mode === "ScrollByDigit" ? props.delay || 0 : 0
  useEffect(() => {
    if (mode === "ScrollByDigit") {
      const timeoutId = setTimeout(scrollByDigitCallback, delay)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [mode, delay])

  console.log(mode)
  // useImperativeHandle(ref, () => ({
  //   togglePrev: () => {
  //     setValue((prev) => prev + 1)
  //   },
  //   toggleNext,
  // }))
  return (
    <div className="scroll-number-group">
      {digitItems.map((item, index) => {
        let animationConfig: AnimationProp,
          onAnimationAllend: (() => void) | undefined = undefined
        if (mode === "ScrollDirectly") {
          animationConfig = {
            animationDuration: `${Math.floor(
              duration /
                (interpolatedDigits[index] === 0
                  ? 10
                  : interpolatedDigits[index])
            )}ms`,
          }
        } else if (mode === "ScrollByDigit") {
          animationConfig = {
            animationDuration: "100ms",
          }
          onAnimationAllend = scrollByDigitCallback
        } else {
          // Control
          animationConfig = {}
        }
        return (
          <ScrollNumber
            initialValue={0}
            animationConfig={animationConfig}
            mode={digitModes[index]}
            value={item}
            key={digitsNumber - index}
            onAnimationAllEnd={onAnimationAllend}
            // ref={(ele) => setInstance(index, ele)}
          />
        )
      })}
    </div>
  )
}

export default ScrollNumberGroup
