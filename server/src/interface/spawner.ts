export interface ISpawner<T> {
  spawn(): T[];
  canSpawn(): boolean;
}
