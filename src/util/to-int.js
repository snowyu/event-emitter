const round = Math.round
export function toInt(value) {
  if (isNaN(value)) {return 0}
  value = Number(value)
  if (value === 0 || !isFinite(value)) {return value}
  return round(value)
}

export default toInt
