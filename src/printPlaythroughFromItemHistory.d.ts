import {
  getStringFromAstNodeContentItem,
} from './getStringFromAstNodeContentItem';
import {
  InkNodeHistoryItem,
} from './InkNodeHistoryItem';

export function printPlaythroughFromItemHistory(
  args: {
    readonly itemHistory: readonly InkNodeHistoryItem[];
    readonly overloads?: {
      readonly getStringFromAstNodeContentItem?: (
        item: InkNodeHistoryItem,
      ) => string;

      readonly printPlaythroughFromItemHistory?: (
        itemHistory: readonly InkNodeHistoryItem[],
      ) => string;
    };
  },
): string;
