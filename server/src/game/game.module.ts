import { Module } from '@nestjs/common';
import { GameServerGateway } from './game.gateway';
import { GameManager } from './GameManager';

@Module({
  imports: [],
  controllers: [],
  providers: [GameServerGateway, GameManager],
})
export class GameModule {}
