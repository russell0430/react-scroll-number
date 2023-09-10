export type Mode = "UnControl" | "Control"
export type ScrollNumberGroupProps =
  | {
      digitsNumber: number
      duration?: number
    } & (
      | {
          mode: "Control"
          value?: number
        }
      | {
          mode: "ScrollByDigit"
          value: number
          delay?: number
        }
      | {
          mode: "ScrollDirectly"
          value: number
        }
    )
