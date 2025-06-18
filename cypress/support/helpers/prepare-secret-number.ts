export function generateRandomSecretNumberAndStub(): {
  secretNumber: number;
  stubValue: number;
} {
  const secretNumber = Math.floor(Math.random() * 25) + 1;
  const stubValue = (secretNumber - 1) / 25;
  return { secretNumber, stubValue };
}
