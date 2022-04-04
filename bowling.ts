export class Bowling {
  scoreFinal: number = 0;
  array: number[] = [];
  plenos: number = 0;
  start: boolean = false;
  public roll(pins: number): void {
    if (pins == 10) this.plenos++;
    this.start = true;

    

    if (Math.sign(pins) == -1) throw new Error("Negative roll is invalid");
   
    if (
      pins > 10 ||
      (this.array[this.array.length - 2] == 10 &&
        this.array[this.array.length - 2] != 10 &&
        this.array[this.array.length - 1] + pins > 10)
    )
      throw new Error("Pin count exceeds pins on the lane");
    if (
      this.array[this.array.length - 1] + pins > 10 &&
      this.array[this.array.length - 1] != 10 &&
      this.array.length % 2 !== 0
    ){
      throw new Error("Pin count exceeds pins on the lane");
    }
   
    this.array.push(pins);
  }

  public score(): number {
    if (
      !this.start ||
      this.array.length < 20 - this.plenos 
      
    ){
      throw new Error("Score cannot be taken until the end of the game");
    }
    let semi: boolean = false;
    let pleno: boolean = false;
    for (let i: number = 0; i < this.array.length; i++) {
      if (
        this.array[i] == 10 &&
        i + 3 != this.array.length &&
        i + 2 != this.array.length &&
        i + 1 != this.array.length
      ) {
        if (i + 4 != this.array.length) {
          if (!pleno) {
            this.scoreFinal +=
              this.array[i] +
              this.array[i + 1] +
              this.array[i + 1] +
              this.array[i + 2] +
              this.array[i + 2];
          } else {
            this.scoreFinal +=
              this.array[i + 1] + this.array[i + 2] + this.array[i + 2];
          }
        } else {
          this.scoreFinal += this.array[i + 1];
        }

        pleno = true;
      } else if (
        this.array[i - 1] + this.array[i] == 10 &&
        i % 2 != 0 &&
        i + 2 != this.array.length
      ) {
        pleno = false;
        semi
          ? (this.scoreFinal += this.array[i] + this.array[i + 1] * 2)
          : (this.scoreFinal += this.array[i] + this.array[i + 1] * 2);
        semi = !semi;
        i += 1;
      } else {
        if (pleno) {
          if (this.array[i + 1] != 10 && this.array[i + 2] != 10) {
            i += 2;
          }
        }

        semi ? "" : (this.scoreFinal += this.array[i]);
        pleno = false;
      }
    }
    return this.scoreFinal;
  }
}
