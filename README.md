# scroll-number
the component works for only one digit number, go for `scroll-number-group` if you need multi-digit number

there are 3 modes for Component ScrollNumber
- UnControl
- Control
- Scroll

## UnControl
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

## Control
you can control the mult-digit value showed in the component by youself
you can control the number by ref mounted in the component by calling the function `ref.current?.togglePrev()` and `ref.current?.toggleNext()`
(same as scroll-number)

## ScrollByDigit
every digit scroll to the target one By one

## ScrollDirectly
every digit scroll to the target simultaneously