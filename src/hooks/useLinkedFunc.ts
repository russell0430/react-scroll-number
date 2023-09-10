import { useCallback, useRef } from "react"

const useLinkedFunc = () => {
  const linkedListRef = useRef<(() => void)[]>([])

  const shiftAndExecute = useCallback(() => {
    const callback = linkedListRef.current.shift()
    if (callback) {
      callback()
      shiftAndExecute()
    }
  },[])

  const push = (func: () => void) => {
    linkedListRef.current.push(func)
  }

  const cancel = () => {
    linkedListRef.current = []
  }

  return { push, cancel,start:shiftAndExecute }
}

export default useLinkedFunc
