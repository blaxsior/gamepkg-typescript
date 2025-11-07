import { Vec2D } from './vector';

export type GameData = {
  objects: ScreenData;

  hp?: number;
  score?: number;
  angle?: number;
};

export type ScreenData = {
  enemies: GameObjectData[];
  bullets: GameObjectData[];
  gun?: GameObjectData;
};

export type GameObjectData = {
  direction: Vec2D;
  position: Vec2D;
};

export type InitialGameData = {
  screen_size: {
    width: number;
    height: number;
  };
  game_data: GameData;
};
