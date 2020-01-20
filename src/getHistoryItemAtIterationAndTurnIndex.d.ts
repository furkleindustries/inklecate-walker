import {
  InkNode,
} from 'inklecate/types/InkNode';
import {
  InkNodeHistoryItem,
} from './InkNodeHistoryItem';

export function getHistoryItemAtIterationAndTurnIndex(args: {
  readonly iterationIndex: number,
  readonly node: InkNode,
  readonly turnIndex: number,
}): InkNodeHistoryItem | null;
