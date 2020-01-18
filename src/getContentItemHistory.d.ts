import {
  InkNodeHistoryItem,
} from './InkNodeHistoryItem';
import {
  InkTree,
} from './InkTree';

declare function getContentItemHistory(args: {
  readonly iterationIndex: number;
  readonly nodeMap: InkTree['nodeMap'];
  readonly overload?: (args: {
    readonly iterationIndex: number;
    readonly nodeMap: InkTree['nodeMap'];
    readonly pathHistories: InkTree['pathHistories'];  
  }) => Promise<readonly InkNodeHistoryItem[]>;

  readonly pathHistories: InkTree['pathHistories'];
}): Promise<readonly InkNodeHistoryItem[]>;

export = getContentItemHistory;
