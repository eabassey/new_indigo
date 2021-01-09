import { Subscription, timer } from 'rxjs';
export class FunctionExecutionTimer {
  // ===========================================  Variables ===========================================================
  // ---------------------------------------- Internal Variables ------------------------------------------
  // The timer being executed and controlled by this class
  private _currentTimer!: Subscription | null;
  // The name of this Timer
  private _name: string;
  // the function that this timer will execute
  private _toDoFn;
  // the date / time in ms that this timer will end on
  private _dueTime: number | Date;
  // ============================================= getters =============================================================

  private get context() {
    return {
      name: this._name,
      toDoFn: this._toDoFn,
      dueTime: this._dueTime
    };
  }

  get name() {
    return this._name;
  }
  // ============================================= setters ============================================================

  set toDoFn(val: any) {
    // this.reset(null, val);
  }

  set dueTime(val: number | Date) {
    // this.reset(val);
  }
  // ============================================ Constructor =========================================================
  /**
   * Creates a timer class that can be used to run a particular method after a timeout
   * @param dueTime the ms till this must execute or the date on which this must execute
   * @param toDoFn new function to eb executed by this timer when it restarts
   * @param name The name for this timer, to be used as a way to reference a particular timer among a set
   */
  constructor(dueTime: number | Date, toDoFn: () => void, name = '') {
    this._name = name;
    this._toDoFn = toDoFn;
    this._dueTime = dueTime;
    // console.log({ c: this.context });
  }
  // ============================================= Methods ============================================================

  /**
   * Used to start the timer with its current configuration
   */
  start() {
    if (!this._name || !this._toDoFn || !this._dueTime) {
      throw {
        err: 'Class parameters not defined',
        context: this.context
      };
    }

    if (!this._currentTimer) {
      this._currentTimer = timer(this._dueTime).subscribe(x => this._toDoFn());
    }
  }

  /**
   * Stop the timer and cancel any functions related to it
   */
  stop() {
    if (this._currentTimer) {
      // clear out the current timer
      this._currentTimer.unsubscribe();
      this._currentTimer = null;
    }
  }


  // ------------------------------------------ Internal Methods ------------------------------------------
}
