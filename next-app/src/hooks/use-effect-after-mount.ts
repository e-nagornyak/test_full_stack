import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react"

function useEffectAfterMount(effect: EffectCallback, deps?: DependencyList) {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useEffectAfterMount
