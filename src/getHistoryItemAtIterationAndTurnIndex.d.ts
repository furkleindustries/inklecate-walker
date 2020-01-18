import {
  InkNode,
} from 'inklecate/types/InkNode';
import {
  InkNodeHistoryItem,
} from './InkNodeHistoryItem';

declare function getHistoryItemAtTurnIndex(args: {
  readonly iterationIndex: number,
  readonly node: InkNode,
  readonly turnIndex: number,
}): InkNodeHistoryItem | null;

export = getHistoryItemAtTurnIndex;
