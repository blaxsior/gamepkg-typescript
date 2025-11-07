/**
 * 외부에 노출할 객체 데이터를 생성하는 매니저
 */
export class OutputManager {
  private output: Record<string,any>;

  private static manager: OutputManager|null = null;

  static get instance(): OutputManager {
    if(!this.manager) {
      this.manager = new OutputManager();
    }
    return this.manager;
  }

  private constructor() {
    this.output = {};
  }

  clearOutput() {
    this.output = {};
  }

  setOutput(key: string, value: any) {
    this.output[key] = value;
  }

  getOutput() {
    return this.output;
  }
}