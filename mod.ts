interface IRandomMixElement<T> {
  obj: T;
  weight: number;
}

export class RandomMix<T> {
  universe: IRandomMixElement<T>[] = [];
  randomMix: IRandomMixElement<T>[] = [];
  currentElementIndex: number = 0;
  elementsToSelectFrom: IRandomMixElement<T>[] = [];

  constructor(universe: IRandomMixElement<T>[]) {
    universe.forEach((element) => {
      if (element.weight < 0) {
        throw new Error("Weights can't be negative.");
      }
    });

    this.universe = shallowCopy(universe);
    this.randomMix = [];
    this.currentElementIndex = 0;
    this.elementsToSelectFrom = shallowCopy(universe);

    this.injectNewElementAtEndOfRandomMix();
  }

  injectNewElementAtEndOfRandomMix(): void {
    if (this.getNumberOfElementsToSelectFrom() === 0) {
      return;
    }
    const randomElementIndex = this.getRandomElementIndex();
    this.randomMix.push(this.elementsToSelectFrom[randomElementIndex]);
    this.elementsToSelectFrom.splice(randomElementIndex, 1);
  }

  getRandomElementIndex(): number {
    const sumWeights = this.elementsToSelectFrom.reduce(
      (sum, element) => sum + element.weight,
      0
    );
    const randomNumberInWeightSumRange = Math.random() * sumWeights;
    let curWeightSum = 0;
    for (let index = 0; index < this.elementsToSelectFrom.length; index++) {
      curWeightSum += this.elementsToSelectFrom[index].weight;
      if (curWeightSum > randomNumberInWeightSumRange) {
        return index;
      }
    }
    throw new Error("Unreachable code. For-loop will return. Always.");
  }

  getCurrentElement(): T {
    return this.randomMix[this.currentElementIndex]?.obj;
  }

  getNumberOfElementsToSelectFrom(): number {
    return this.elementsToSelectFrom.length;
  }

  moveToNextRandomMixElement(): void {
    if (this.currentElementIndex === this.randomMix.length - 1) {
      if (this.getNumberOfElementsToSelectFrom() === 0) {
        return;
      }
      this.injectNewElementAtEndOfRandomMix();
    }
    this.currentElementIndex++;
  }

  moveToPreviousRandomMixElement(): void {
    if (this.currentElementIndex > 0) {
      this.currentElementIndex--;
    }
  }
}

function shallowCopy(arr: any[]): any[] {
  return arr.slice(0);
}
