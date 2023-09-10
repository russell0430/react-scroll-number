import React from "react"
export type Direction = "up" | "down"
export type AnimationProp = Pick<
  React.CSSProperties,
  | "animationDuration"
  | "animationTimingFunction"
  | "animationFillMode"
  | "animationDelay"
>
type UnControlMode = {
  mode: "UnControl"
  direction?: Direction
  value: number
}
type ControlMode = {
  mode: "Control"
}
type ScrollMode = {
  mode: "Scroll"
}
export type ScrollNumberProps = {
  initialValue: number
  animationConfig?: Partial<AnimationProp>
  onAnimationEnd?: () => void
  onAnimationAllEnd?: () => void
  height?: React.CSSProperties["height"]
  withAnimation?: boolean
  background?: React.CSSProperties["background"]
  color?: React.CSSProperties["color"]
} & (UnControlMode | ControlMode | ScrollMode)

export interface ScrollNumberRef {
  togglePrev: () => void
  toggleNext: () => void
}
