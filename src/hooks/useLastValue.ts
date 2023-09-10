import { useRef } from "react"

const useLastValue = <T>(value: T, initialValue: T) => {
  const lastValueRef = useRef(initialValue)
  const valueRef = useRef(value)

  if (valueRef.current !== value) {
    lastValueRef.current = valueRef.current
    valueRef.current = value
  }
  return lastValueRef.current
}

export default useLastValue
