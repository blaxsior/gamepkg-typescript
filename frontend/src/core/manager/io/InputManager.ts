/**
 * 사용자의 액션을 감지하는 매니저
 * 사용자 액션은 키 입력을 의미하지 않는다.
 */
export class InputManager {
  private inputs: Set<string>;

  private static manager: InputManager|null = null;

  static get instance(): InputManager {
    if(!this.manager) {
      this.manager = new InputManager();
    }
    return this.manager;
  }

  private constructor() {
    this.inputs = new Set();
  }

  clearInput() {
    this.inputs.clear();
  }

  checkInput(action: string): boolean {
    return this.inputs.has(action);
  }

  setUserInput(action: string) {
    this.inputs.add(action);
  }
}