import screens, { type Screens } from "@/config/screens"

import { create } from "./use-breakpoint"

export const {
  useBreakpoint,
  useAllBreakpoints,
  useBreakpointEffect,
  useBreakpointValue,
} = create<Screens>(screens)
