"use client"

import { useMemo, useState } from "react"

import { isBrowser, useIsomorphicEffect } from "../use-isomorphic-effect"

export function create<TScreens extends Record<string, string>>(
  screens: TScreens
) {
  const useBreakpoint = (breakpoint: keyof TScreens) => {
    const [match, setMatch] = useState<boolean | null>(null)

    useIsomorphicEffect(() => {
      if (typeof window === "undefined" || !("matchMedia" in window)) return

      const mediaQuery = window.matchMedia(
        `(min-width: ${screens[breakpoint]})`
      )
      const updateMatch = () => setMatch(mediaQuery.matches)

      updateMatch()
      mediaQuery.addEventListener("change", updateMatch)

      return () => mediaQuery.removeEventListener("change", updateMatch)
    }, [breakpoint])

    return match
  }

  function useBreakpointEffect(
    breakpoint: keyof TScreens,
    effect: (match: boolean) => void
  ) {
    const match = useBreakpoint(breakpoint)

    useIsomorphicEffect(() => {
      if (match) {
        effect(match)
      }
    }, [match])
  }

  function useBreakpointValue<T, U>(
    breakpoint: keyof TScreens,
    valid: T,
    invalid: U
  ) {
    const match = useBreakpoint(breakpoint)

    return useMemo(
      () => (match === null ? null : match ? valid : invalid),
      [invalid, match, valid]
    )
  }

  function useAllBreakpoints(): Record<keyof TScreens | "active", boolean> {
    const [isClient, setIsClient] = useState(false)

    const breakpointsState = {
      xs: useBreakpoint("xs"),
      sm: useBreakpoint("sm"),
      md: useBreakpoint("md"),
      lg: useBreakpoint("lg"),
      xl: useBreakpoint("xl"),
    }

    useIsomorphicEffect(() => {
      if (isBrowser) setIsClient(true)
    }, [])

    const activeBreakpoint = isClient
      ? (Object.keys(breakpointsState)
          .reverse()
          .find(
            (key) => breakpointsState[key as keyof typeof breakpointsState]
          ) ?? "unknown")
      : "SSR"

    return {
      ...breakpointsState,
      active: activeBreakpoint,
    } as Record<keyof TScreens | "active", boolean>
  }

  return {
    useBreakpoint,
    useBreakpointEffect,
    useBreakpointValue,
    useAllBreakpoints,
  }
}
