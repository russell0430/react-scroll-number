import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import ScrollNumber, { ScrollNumberProps } from "../ScrollNumber"
import { ScrollNumberGroupProps } from "./interface"
import useLastValue from "../../hooks/useLastValue"
import useMergedState from "../../hooks/useMergedState"
import splitNum2Digits from "../../utils/splitNum2Digits"
import { AnimationProp, ScrollNumberRef } from "../ScrollNumber/interface"
import useRefs from "../../hooks/useRefs"

type ScrollNumberMode = ScrollNumberProps["mode"]
export type ScrollNumberGroupRef = {
  toggleNext: VoidFunction
  togglePrev: VoidFunction
  getNumbersRef: () => Map<number, ScrollNumberRef>
}
export type { ScrollNumberGroupProps }
const ScrollNumberGroup: React.ForwardRefRenderFunction<
  ScrollNumberGroupRef,
  ScrollNumberGroupProps
> = (props, ref) => {
  const {
    digitsNumber,
    value: valueFromProps = 0,
    mode,
    duration = 3000,
  } = props
  const lastValue = useLastValue(valueFromProps, 0)

  const options = useMemo(() => {
    if (mode === "ScrollByDigit") return { value: valueFromProps }
    else if (mode === "ScrollDirectly") return { value: valueFromProps }
    else return { defaultValue: valueFromProps }
  }, [mode, valueFromProps])

  const [value, setValue] = useMergedState(valueFromProps, options)

  const digitPadding = useMemo(() => {
    return Array(digitsNumber).fill(0)
  }, [digitsNumber])
  const digits = useMemo(() => splitNum2Digits(value), [value])
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
        (_item, index) =>
          (reversedDigits[index] || 0) - (reversedValue[index] || 0)
      )
      .map((item) => (item < 0 ? item + 10 : item))
      .reverse()
  }, [digitPadding, lastValue, reversedDigits])

  const [instance, setInstance] = useRefs<ScrollNumberRef>()

  const [digitModes, setDigitModes] = useState<ScrollNumberMode[]>(() => {
    if (mode === "ScrollDirectly") {
      return digitPadding.map(() => "UnControl")
    } else if (mode === "ScrollByDigit") {
      return digitPadding.map(() => "Scroll")
    } else if (mode === "Control") {
      return digitPadding.map(() => "UnControl")
    }
    // default return
    return digitPadding.map(() => "Control")
  })

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

  useImperativeHandle(ref, () => ({
    togglePrev: () => {
      setValue((prev) => prev - 1)
    },
    toggleNext: () => {
      setValue((prev) => prev + 1)
    },
    getNumbersRef: () => instance,
  }))
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
            initialValue={digitModes[index] === "Control" ? item : 0}
            animationConfig={animationConfig}
            mode={digitModes[index]}
            value={item}
            key={digitsNumber - index}
            onAnimationAllEnd={onAnimationAllend}
            ref={(ele) => setInstance(index, ele)}
          />
        )
      })}
    </div>
  )
}

export default React.forwardRef(ScrollNumberGroup)
