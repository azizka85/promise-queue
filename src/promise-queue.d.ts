export class PromiseQueue {
  protected queueStarted: boolean;
  protected tasks: ((data?: any) => any | Promise<any>)[];

  protected started?: () => void;
  protected finished?: () => void;
  protected taskFinished?: () => void;

  constructor(
    started?: () => void, 
    finished?: () => void, 
    taskFinished?: (data?: any) => void
  );

  protected start(): Promise<void>;

  addTask(func: (data?: any) => any | Promise<any>): void;
  stop(): void;
}
