import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  AnimationProp,
  ScrollNumberProps,
  ScrollNumberRef,
  Direction,
} from "./interface"
import "./style.less"

const defaultAnimationConfig: Required<AnimationProp> = {
  animationDelay: "0",
  animationDuration: "300ms",
  animationFillMode: "forwards",
  animationTimingFunction: "linear",
}
const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const ScrollNumber: React.ForwardRefRenderFunction<
  ScrollNumberRef,
  ScrollNumberProps
> = (props, ref) => {
  const {
    mode,
    initialValue = 0,
    height = 30,
    animationConfig: animationConfigFromProps = defaultAnimationConfig,
    onAnimationEnd,
    onAnimationAllEnd,
    background,
    color,
  } = props

  const valueFromProps = mode === "UnControl" ? props.value : 0

  const [innerValue, setInnerValue] = useState(initialValue)

  // implement it with scrollTo
  // const targetRef = useRef(valueFromProps)
  // targetRef.current = valueFromProps

  const directionRef = useRef<Direction>(
    mode === "UnControl" ? props.direction || "down" : "down"
  )
  if (mode === "UnControl") {
    directionRef.current = props.direction || "down"
  }
  const inAnimationRef = useRef(false)
  const shouldAnimationRef = useRef(false)

  const animationStyle: AnimationProp = useMemo(() => {
    let name
    if (directionRef.current === "up") {
      name = innerValue
    } else {
      name = innerValue - 1
      name += name < 0 ? 10 : 0
    }
    return {
      animationName: `scroll-${directionRef.current}-${name}`,
      ...defaultAnimationConfig,
      ...animationConfigFromProps,
    }
  }, [animationConfigFromProps, innerValue])

  const toggleNext = useCallback(() => {
    setInnerValue((memorizedValue) => {
      directionRef.current = "down"
      let pendingValue = memorizedValue + 1
      if (pendingValue >= 10) pendingValue -= 10
      shouldAnimationRef.current = true
      inAnimationRef.current = true
      return pendingValue
    })
  }, [])

  const togglePrev = useCallback(() => {
    setInnerValue((memorizedValue) => {
      directionRef.current = "up"
      let pendingValue = memorizedValue - 1
      if (pendingValue < 0) pendingValue += 10
      shouldAnimationRef.current = true
      inAnimationRef.current = true
      return pendingValue
    })
  }, [])

  const continueAnimation = useCallback(() => {
    if (
      (mode === "UnControl" &&
        innerValue !== valueFromProps &&
        !inAnimationRef.current) ||
      (mode === "Scroll" && !inAnimationRef.current)
    ) {
      if (directionRef.current === "up") {
        togglePrev()
      } else if (directionRef.current === "down") {
        toggleNext()
      }
    }
  }, [innerValue, mode, toggleNext, togglePrev, valueFromProps])

  // TODO
  // const scrollTo = useCallback(
  //   (target: number, direction: Direction) => {
  //     targetRef.current = target
  //     directionRef.current = direction
  //     continueAnimation()
  //   },
  //   [continueAnimation]
  // )

  const onInternalAnimationEnd: React.AnimationEventHandler<
    HTMLDivElement
  > = () => {
    inAnimationRef.current = false
    onAnimationEnd?.()
    if (mode === "UnControl" && innerValue === valueFromProps) {
      // all end
      // only UnControl mode trigger this callback
      onAnimationAllEnd?.()
    }
    continueAnimation()
  }

  useEffect(() => {
    continueAnimation()
  }, [continueAnimation])

  useImperativeHandle(ref, () => ({
    togglePrev,
    toggleNext,
    scrollTo,
  }))
  const size = typeof height === "string" ? height : `${height}px`

  return (
    <div
      className={`scroll-number`}
      style={{
        height: size,
        fontSize: size,
        background,
        color,
      }}
    >
      <div
        className="number"
        onAnimationEnd={onInternalAnimationEnd}
        style={{
          ...(shouldAnimationRef.current ? animationStyle : {}),
          height: size,
          top: `-${innerValue}00%`,
        }}
      >
        {numberArray.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  )
}

export default React.forwardRef(ScrollNumber)
export type { ScrollNumberProps, ScrollNumberRef }
