const splitNum2Digits = (num: number): number[] => {
  if (num < 0) {
    throw new Error("只支持正整数")
  }

  const digits: number[] = []

  while (num >= 1) {
    const digit = num % 10
    digits.unshift(digit)
    num = Math.floor(num / 10)
  }

  return digits
}

export default splitNum2Digits
