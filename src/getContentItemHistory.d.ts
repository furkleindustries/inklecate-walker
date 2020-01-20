import {
  InkNodeHistoryItem,
} from './InkNodeHistoryItem';
import {
  InkTree,
} from './InkTree';

interface GetContentItemHistoryArgs {
  readonly iterationIndex: number;
  readonly nodeMap: InkTree['nodeMap'];
  readonly pathHistories: InkTree['pathHistories'];
}

export function getContentItemHistory(
  args: GetContentItemHistoryArgs &
    {
      readonly overload?: (
        args: GetContentItemHistoryArgs,
      ) => Promise<readonly InkNodeHistoryItem[]>;
    },
): Promise<readonly InkNodeHistoryItem[]>;
