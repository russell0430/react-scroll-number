// learnt from rc/virtual-list/ ( useChildren & useHeight & Item) 
import { useRef } from "react"

const useRefs = <T>(): [
  Map<number, T>,
  (idx: number, instance?: T | null) => void
] => {
  const instancesRef = useRef(new Map<number, T>())

  const setInstanceRef = (index: number, instance?: T | null) => {
    if (instance) {
      instancesRef.current.set(index, instance)
    } else {
      instancesRef.current.delete(index)
    }
  }
  return [instancesRef.current, setInstanceRef]
}

export default useRefs
