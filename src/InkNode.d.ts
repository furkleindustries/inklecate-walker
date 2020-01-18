import {
  InkNodeHistoryItem,
} from './InkNodeHistoryItem';
import InkPathHistoryTypes = require('./InkPathHistoryTypes');

export interface InkNode<T extends InkPathHistoryTypes = InkPathHistoryTypes> {
  readonly containerId: string;
  readonly id: string;
  readonly history: readonly InkNodeHistoryItem<T>[];
  readonly type: T;
}
