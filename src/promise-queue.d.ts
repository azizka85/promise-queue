export class PromiseQueue<TaskData = any> {
  protected queueStarted: boolean;
  protected tasks: ((data?: TaskData) => TaskData | void | Promise<TaskData> | Promise<void>)[];

  protected started?: () => void;
  protected finished?: () => void;
  protected taskFinished?: () => void;

  constructor(
    started?: () => void, 
    finished?: () => void, 
    taskFinished?: (data?: TaskData) => void
  );

  protected start(): Promise<void>;

  addTask(func: (data?: TaskData) => TaskData | void | Promise<TaskData> | Promise<void>): void;
  stop(): void;
}
