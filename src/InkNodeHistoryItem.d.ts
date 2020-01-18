import InkPathHistoryTypes = require('./InkPathHistoryTypes');

export interface InkNodeHistoryItem<T extends InkPathHistoryTypes = InkPathHistoryTypes> {
  readonly containerId: string;
  readonly content?: string | number;
  readonly id: string;
  readonly iterationIndex: number;
  readonly turnIndex: number;
  readonly type: T;
}
