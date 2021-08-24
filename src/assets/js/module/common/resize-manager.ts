//- window resize
type myFunction = () => void;

export class ResizeManager {
  windowWidth: number;
  windowHeight: number;
  functions: myFunction[];
  length: number;
  fps: number;
  isRunning: boolean;
  constructor() {
    this.windowWidth = 0;
    this.windowHeight = 0;
    this.functions = [];
    this.length = 0;
    this.fps = 60;
    this.isRunning = false;
  }

  init(): void {
    this.update();
    window.addEventListener('resize', () => {
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
    }, false);
  }

  add(targetFunction: myFunction): void {
    if (targetFunction && typeof targetFunction === 'function') {
      this.functions.push(targetFunction);
      this.length = this.functions.length;
    }
  }

  // remove(targetFunction: myFunction) void {
  //   this.functions.splice(targetFunction, 1);
  //   this.length = this.functions.length;
  // }

  update(): void {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerWidth;

    for (let i = 0; i < this.length; i++) {
      const thisFunction = this.functions[i];
      if (thisFunction && typeof thisFunction === 'function') {
        thisFunction();
      }
    }

    this.isRunning = false;
  }
}
