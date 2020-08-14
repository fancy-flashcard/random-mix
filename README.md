# random-mix

Deno module to create a random mix of elements, e.g. when shuffling songs for a playlist or when randomly selecting flashcards.
You can control the random selection using weights, e.g. based on ratings.

## Example

```typescript
import { RandomMix } from "https://deno.land/x/random_mix@0.1.0/mod.ts";

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

```

You can also run the above example via command line:

```
deno run https://deno.land/x/random_mix@0.1.0/example.ts
```
