import InkPathHistoryTypes = require('./InkPathHistoryTypes');

export interface InkNodeHistoryItem<T extends InkPathHistoryTypes> {
  readonly containerId: string;
  readonly content?: string;
  readonly id: string;
  readonly iterationIndex: number;
  readonly type: T;
  readonly turnIndex: number;
}
