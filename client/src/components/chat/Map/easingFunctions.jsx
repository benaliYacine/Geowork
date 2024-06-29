export function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}
export function easeInCubic(x) {
  return x * x * x;
}
export function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}
