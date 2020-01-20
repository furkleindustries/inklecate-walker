import {
  InkNodeHistoryItem,
} from './InkNodeHistoryItem';
import {
  InkNodeTypes,
} from './InkNodeTypes';

export interface InkNode<T extends InkNodeTypes = InkNodeTypes> {
  readonly containerId: string;
  readonly id: string;
  readonly history: readonly InkNodeHistoryItem<T>[];
  readonly type: T;
}
