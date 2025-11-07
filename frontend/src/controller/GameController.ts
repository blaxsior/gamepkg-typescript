import { GameData } from "@/interface/packet";
import { GameView } from "@/view/GameView";
import { Socket } from 'socket.io-client';

export class GameController {
  private gameView: GameView;
  private socket: Socket;

  constructor(socket: Socket, gameView: GameView) {
    this.socket = socket;
    this.gameView = gameView;
  }

  // 사용자의 입력을 바인딩하는 코드 작성
  bindUserAction() {
    // 사용자의 키보드 입력을 등록
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
        case 'A':
          console.log('click TURN_LEFT');
          this.handleUserAction('ROT_LEFT');
          break;
        case 'd':
        case 'D':
          console.log('click TURN_RIGHT');
          this.handleUserAction('ROT_RIGHT');
          break;
      }
    });

    // 사용자의 버튼 클릭을 등록
    const view = document.querySelector('down-panel-view')!;
    const fireButton = view.shadowRoot!.querySelector('#fireButton') as HTMLButtonElement;
    fireButton.addEventListener('click',
      () => {
        this.handleUserAction('FIRE');
      }
    );
  }

  initGame() {
    this.socket.emit('init');
  }

  runGame() {
    this.socket.emit('run');
  }

  bindServerAction() {
    this.socket.on('init', (data) => {
      console.log(data);
    });

    // 뷰를 업데이트하는 액션을 클라이언트 - 서버 사이에 연결한다.
    this.socket.on('run', (data: GameData) => {
      this.updateView(data);
    });

    // 게임 종료 시 연결할 액션.
    this.socket.on('game-over', () => {
      console.log('game over!');
    });
  }

  /**
   * 유저의 입력을 다루는 메서드. 서버에 메시지를 보내 입력을 알린다.
   * server/src/interface/user-action.ts 참고
   */
  private handleUserAction(action: string) {
    this.socket.emit('input', action);
  }

  updateView(data: GameData) {
    this.gameView.render(data);
  }
}