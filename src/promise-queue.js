/**
 * @template TaskData
 */
class PromiseQueue {
  /**
   * Indicate that this queue is started to process tasks
   * @type {boolean}
   * @protected
   */
  queueStarted = false;

  /**
   * The list of tasks needs to process
   * @type {((data?: TaskData) => TaskData | void | Promise<TaskData> | Promise<void>)[]}
   * @protected
   */
  tasks = [];

  /**
   * Handler to process the event when the queue is started to process tasks
   * @type {(() => void) | undefined}
   * @protected
   */
  started;

  /**
   * Handler to process the event when the queue is finished to process tasks
   * @type {(() => void) | undefined}
   * @protected
   */
  finished;

  /**
   * Handler to process the event when the task is finished process and removes from the queue
   * @type {((data?: TaskData) => void) | undefined}
   * @protected
   */
  taskFinished;

  /**
   * @param {(() => void) | undefined} started Handler to process the event when the queue is started to process tasks
   * @param {(() => void) | undefined} finished Handler to process the event when the queue is finished to process tasks
   * @param {((data?: TaskData) => void) | undefined} taskFinished Handler to process the event when the task is finished process and removes from the queue
   */
  constructor(started = undefined, finished = undefined, taskFinished = undefined) {
    this.started = started;
    this.finished = finished;
    this.taskFinished = taskFinished;
  }

  /**
   * Start to process tasks
   * @return {Promise<void>}
   * @protected
   */
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

  /**
   * Add new task into the list and start to process the queue
   * @param {(data?: TaskData) => TaskData | void | Promise<TaskData> | Promise<void>} func 
   * @public
   */
  addTask(func) {
    this.tasks.push(func);

    this.start();
  }

  /**
   * Clear the tasks list
   * @return {void}
   * @public
   */
  stop() {
    this.tasks = [];
  }
}

module.exports = {
  PromiseQueue
};
