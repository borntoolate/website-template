//- window resize
type myFunction = () => void;

export class ResizeManager {
  winWidth: number;
  winHeight: number;
  fnArray: myFunction[];
  fnArrayLength: number;
  fps: number;
  isRunning: boolean;
  constructor() {
    this.winWidth = 0;
    this.winHeight = 0;
    this.fnArray = [];
    this.fnArrayLength = 0;
    this.fps = 60;
    this.isRunning = false;
  }

  init(): void {
    this.update();
    window.addEventListener(
      'resize',
      () => {
        if (!this.isRunning) {
          this.isRunning = true;
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(() => {
              this.update();
            });
          } else {
            setTimeout(() => {
              this.update();
            }, 1000 / this.fps);
          }
        }
      },
      false
    );
  }

  add(targetFn: myFunction): void {
    if (targetFn && typeof targetFn === 'function') {
      this.fnArray.push(targetFn);
      this.fnArrayLength = this.fnArray.length;
    }
  }

  remove(targetFn: myFunction): void {
    if (targetFn && typeof targetFn === 'function') {
      const fnOrder = this.fnArray.indexOf(targetFn);
      this.fnArray.splice(fnOrder, 1);
      this.fnArrayLength = this.fnArray.length;
    }
  }

  update(): void {
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;

    for (let i = 0; i < this.fnArrayLength; i++) {
      const handledFn = this.fnArray[i];
      if (handledFn && typeof handledFn === 'function') {
        handledFn();
      }
    }

    this.isRunning = false;
  }
}
