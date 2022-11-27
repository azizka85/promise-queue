/**
 * @template TaskData
 */
export class PromiseQueue<TaskData> {
    /**
     * @param {(() => void) | undefined} started Handler to process the event when the queue is started to process tasks
     * @param {(() => void) | undefined} finished Handler to process the event when the queue is finished to process tasks
     * @param {((data?: TaskData) => void) | undefined} taskFinished Handler to process the event when the task is finished process and removes from the queue
     */
    constructor(started: (() => void) | undefined, finished: (() => void) | undefined, taskFinished: (data?: TaskData) => void);
    /**
     * Indicate that this queue is started to process tasks
     * @type {boolean}
     * @protected
     */
    protected queueStarted: boolean;
    /**
     * The list of tasks needs to process
     * @type {((data?: TaskData) => TaskData | void | Promise<TaskData> | Promise<void>)[]}
     * @protected
     */
    protected tasks: ((data?: TaskData) => TaskData | void | Promise<TaskData> | Promise<void>)[];
    /**
     * Handler to process the event when the queue is started to process tasks
     * @type {(() => void) | undefined}
     * @protected
     */
    protected started: (() => void) | undefined;
    /**
     * Handler to process the event when the queue is finished to process tasks
     * @type {(() => void) | undefined}
     * @protected
     */
    protected finished: (() => void) | undefined;
    /**
     * Handler to process the event when the task is finished process and removes from the queue
     * @type {((data?: TaskData) => void) | undefined}
     * @protected
     */
    protected taskFinished: (data?: TaskData) => void;
    /**
     * Start to process tasks
     * @return {Promise<void>}
     * @protected
     */
    protected start(): Promise<void>;
    /**
     * Add new task into the list and start to process the queue
     * @param {(data?: TaskData) => TaskData | void | Promise<TaskData> | Promise<void>} func
     * @public
     */
    public addTask(func: (data?: TaskData) => TaskData | void | Promise<TaskData> | Promise<void>): void;
    /**
     * Clear the tasks list
     * @return {void}
     * @public
     */
    public stop(): void;
}
