import { RandomMix } from "./mod.ts";

const randomMix = new RandomMix<string>([
  { obj: "A ~73,2%", weight: 1337 },
  { obj: "B ~23%", weight: 420 },
  { obj: "C ~3,8%", weight: 69 },
]);

while (true) {
  console.log(randomMix.currentElementIndex, randomMix.getCurrentElement());
  if (randomMix.getNumberOfElementsToSelectFrom() === 0) {
    break;
  }
  randomMix.moveToNextRandomMixElement();
}
