import {
  InkNodeHistoryItem,
} from './InkNodeHistoryItem';

export function getStringFromAstNodeContentItem(args: {
  readonly item: InkNodeHistoryItem;
  readonly overload?: (item: InkNodeHistoryItem) => string;
}): string;
