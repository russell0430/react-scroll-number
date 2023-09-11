// learn from https://github.com/react-component/util/blob/master/src/hooks/useMergedState.ts
import { useState, useLayoutEffect } from "react"
import useLayoutUpdateEffect from "./useLayoutEffect"

type Updater<T> = (updater: T | ((prev: T) => T)) => void

function hasValue<T>(value: unknown): value is T {
  return value !== undefined
}

const useMergedState = <T, R = T>(
  defaultStateValue: T | (() => T),
  options?: {
    defaultValue?: T | (() => T)
    value?: T
    onChange?: (value: T, prevValue: T) => void
    postState?: (value: T) => T
  }
): [R, Updater<T>] => {
  const { defaultValue, value, onChange, postState } = options || {}
  const [innerValue, setInnerValue] = useState<T>(() => {
    if (hasValue<T>(value)) {
      return value
    } else if (hasValue<T>(defaultValue)) {
      return typeof defaultValue === "function"
        ? (defaultValue as () => T)()
        : defaultValue
    } else {
      return typeof defaultStateValue === "function"
        ? (defaultStateValue as () => T)()
        : defaultStateValue
    }
  })

  // 优先使用外部的 value
  const mergedValue = hasValue<T>(value) ? value : innerValue
  const postmergedValue = postState ? postState(mergedValue) : mergedValue
  const [prevValue, setPrevValue] = useState<[T]>([mergedValue])

  useLayoutEffect(() => {
    const prev = prevValue[0]
    if (innerValue !== prev) {
      onChange?.(innerValue, prev)
    }
  }, [innerValue, onChange, prevValue])

  useLayoutUpdateEffect(() => {
    if (!hasValue(value)) {
      setInnerValue(value)
    }
  }, [value])

  const triggerChange: Updater<T> = (updater) => {
    setInnerValue(updater)
    setPrevValue([mergedValue])
  }
  return [postmergedValue as unknown as R, triggerChange]
}

export default useMergedState
