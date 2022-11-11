const { PromiseQueue } = require('../src/promise-queue');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('PromiseQueue test', () => {
  beforeAll(() => jest.useFakeTimers());

  test('should run asynchronous tasks serially', () => {
    /**
     * expected value
     * @type {number}
     */
    let expectData = 1;

    /**
     * to compare
     * @type {number | undefined}
     */
    let globalData;

    /**
     * @type {PromiseQueue<number | undefined>}
     */
    const queue = new PromiseQueue(
      () => expect(globalData).toBeFalsy(),
      () => expect(globalData).toEqual(3),
      data => {
        expect(data).toEqual(expectData);
        expectData++;
      }
    );    

    queue.addTask(async (data) => {
      expect(data).toBeFalsy();
      await sleep(1000);      

      globalData = 1;
      
      return globalData;
    });

    queue.addTask(async (data) => {
      expect(data).toEqual(1);
      await sleep(1000);

      globalData = 2;

      return globalData;
    });

    queue.addTask(async (data) => {
      expect(data).toEqual(2);
      await sleep(1000);

      globalData = 3;

      return globalData;
    });

    jest.advanceTimersByTime(1000);    
  });

  test('should cancel all tasks in queue', () => {
    /**
     * @type {PromiseQueue<number | undefined>}
     */
    const queue = new PromiseQueue();

    queue.addTask(async (data) => {
      expect(data).toBeFalsy();
      await sleep(1000);

      return 1;
    });

    queue.addTask(async (data) => {
      expect(data).toEqual(1);
      await sleep(1000);

      return 2;
    });

    sleep(500).then(() => {
      queue.stop();

      queue.addTask(async (data) => {
        expect(data).toEqual(1);
        await sleep(1000);
      });
    });

    jest.advanceTimersByTime(1000);   
  });
});
