import {
  InkNodeHistoryItemLineContent,
} from './InkNodeHistoryItemLineContent';
import {
  InkNodeTypes,
} from './InkNodeTypes';

export interface InkNodeHistoryItem<T extends InkNodeTypes = InkNodeTypes> {
  readonly containerId: string;
  readonly content?:
    InkNodeHistoryItemLineContent |
    string |
    number;

  readonly id: string;
  readonly iterationIndex: number;
  readonly turnIndex: number;
  readonly type: T;
}