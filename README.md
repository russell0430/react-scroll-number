# scroll-number

the component works for only one digit number, go for `scroll-number-group` if you need multi-digit number

there are 3 modes for Component ScrollNumber

- UnControl
- Control
- Scroll

| property           | required                          | type                | desc                            |
| ------------------ | --------------------------------- | ------------------- | ------------------------------- |
| initialValue       | false ( 0 by default)             | single-digit number | the number show at the start    |
| animtionConfig     | false (there is a default config) | part of CSSProperty | the config of the aniamtion     |
| onAnimationEnd     | false (VoidFunction by default)   | () => void          | call every single animation end |
| onAnimationAllEnd  | false (VoidFunction by default)   | () => void          | call All animation end          |
| height             | false (30 by default)             | number or string    | height of the component         |
| background & Color | false                             | CSSProperty         | css property                    |

## UnControl

| property  | required                  | type           | desc             |
| --------- | ------------------------- | -------------- | ---------------- |
| direction | false ("down" by default) | "up" or "down" | scroll direction |

given a value, the component will scroll to the value
when the value from the props changes, the number will scroll to the new one automatically

## Scroll

the component will scroll in a loop until the mode changed
when the mode changes to `UnControl` with the value provided, the number will scroll to the value automatically

## Control

you can control the value showed in the component by youself
you can control the number by ref mounted in the component by calling the function `ref.current?.togglePrev()` and `ref.current?.toggleNext()`

# scroll-number-group

there are many modes for scroll-number-group

- Control
- ScrollByDigit
- ScrollDirectly

| property     | required                | type    | desc                      |
| ------------ | ----------------------- | ------- | ------------------------- |
| digitsNumber | true                    | integer | the digits for the number |
| duration     | false (1000 by default) | number  | the duration of animation |

## Control

you can control the mult-digit value showed in the component by youself
you can control the number by ref mounted in the component by calling the function `ref.current?.togglePrev()` and `ref.current?.toggleNext()`
(same as scroll-number)

## ScrollByDigit

every digit scroll to the target one By one,
| property | required | type | desc |
| -- | -- | -- | -- |
| value | true | integer| the number show up|
| delay | false ( 0 by default )| number | duration to delay for the first digit|

## ScrollDirectly

every digit scroll to the target simultaneously
| property | required | type | desc |
| -- | -- | -- | -- |
| value | true | integer| the number show up|
