export default function timeDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
