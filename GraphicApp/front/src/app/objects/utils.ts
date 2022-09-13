export class Utils {

  static randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static degToRad(ang: number): number {
    return ang / 180 * Math.PI;
  }

  static mapRange(inputNumber: number, maxInput: number, minInput: number, maxOutput: number, minOutput: number): number {
    let outputNumber = 0;
    if (inputNumber <= maxInput && inputNumber >= minInput) {
      let tempNumber =  ((maxOutput - minOutput) * (inputNumber - minInput )) / (maxInput - minInput);
      outputNumber = maxOutput - tempNumber;
    }
    return outputNumber;
  }

}
