import React from "react"
function canUseDom() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  )
}
const useInternalLayoutEffect = canUseDom()
  ? React.useLayoutEffect
  : React.useEffect

const useLayoutEffect = (
  callback: (mount: boolean) => void | VoidFunction,
  deps?: React.DependencyList
) => {
  const firstMountRef = React.useRef(true)
  useInternalLayoutEffect(() => {
    return callback(firstMountRef.current)
  }, deps)
  useInternalLayoutEffect(() => {
    firstMountRef.current = false
    return () => {
      firstMountRef.current = true
    }
  }, [])
}
export const useLayoutUpdateEffect: typeof React.useEffect = (
  callback,
  deps
) => {
  useLayoutEffect((firstMount) => {
    if (!firstMount) {
      return callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useLayoutUpdateEffect
