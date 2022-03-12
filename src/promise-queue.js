class PromiseQueue {
  queueStarted = false;
  tasks = [];

  started;
  finished;
  taskFinished;

  constructor(started, finished, taskFinished) {
    this.started = started;
    this.finished = finished;
    this.taskFinished = taskFinished;
  }

  async start() {
    if(!this.queueStarted) {
      this.queueStarted = true;

      this.started?.();

      let data;

      while(this.tasks.length > 0) {
        const task = this.tasks.splice(0, 1)[0];

        data = await task(data);

        this.taskFinished?.(data);
      }

      this.queueStarted = false;

      this.finished?.();
    }
  }

  addTask(func) {
    this.tasks.push(func);

    this.start();
  }

  stop() {
    this.tasks = [];
  }
}

module.exports = {
  PromiseQueue
};
