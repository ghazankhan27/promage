export function generatePin() {
  // Generate a random number between 100000 and 999999
  const min: number = 0;
  const max: number = 999999;
  const randomPin: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomPin.toString().padStart(6, "0");
}
