import {
  InkNodeHistoryItemLineContent,
} from './InkNodeHistoryItemLineContent';
import {
  InkNodeTypes,
} from './InkNodeTypes';

export interface InkNodeHistoryItem<T extends InkNodeTypes = InkNodeTypes> {
  readonly choiceIndex?: number;
  readonly containerId: string;
  readonly content: T extends InkNodeTypes.Line ?
    InkNodeHistoryItemLineContent :
    (string | number);

  readonly id: string;
  readonly iterationIndex: number;
  readonly targetId: T extends InkNodeTypes.Choice ?
    string :
    undefined;
  readonly turnIndex: number;
  readonly type: T;
}
