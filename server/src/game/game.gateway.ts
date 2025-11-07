import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameManager } from '../game/GameManager';
import { setTimeout } from 'timers/promises';
import { InitialGameData } from 'src/interface/packet';

@WebSocketGateway(8001, { cors: '*' })
export class GameServerGateway implements OnGatewayDisconnect {
  constructor(private gameManager: GameManager) {}
  handleDisconnect() {
    // 사용자가 나갈 때 게임을 멈춤 상태로 만들어, 진행 중인 게임 시뮬레이션을 종료한다.
    console.log('disconnect');
    this.gameManager.stopGame();
  }
  @WebSocketServer() server: Server;

  @SubscribeMessage('init')
  async initGame() {
    this.gameManager.initGame();
    const screen_size = this.gameManager.getScreenSize();
    const game_data = this.gameManager.getCurrentGameState();

    const data: InitialGameData = {
      screen_size: screen_size,
      game_data: game_data,
    };

    return { event: 'init', data: data };
  }

  @SubscribeMessage('input')
  userInput(@MessageBody() input: string) {
    this.gameManager.onInput(input);
  }

  @SubscribeMessage('run')
  async runGame() {
    // run을 여러 번 호출하더라도 한번만 실행되도록
    if (this.gameManager.isGameRunning()) return;
    this.gameManager.startGame();
    while (this.gameManager.isGameRunning() && !this.gameManager.isGameOver()) {
      this.gameManager.run();
      const gameData = this.gameManager.getCurrentGameState();
      this.server.emit('run', gameData);
      await setTimeout(25); // 40프레임 수준
    }
    this.server.emit('game over');
  }
}
