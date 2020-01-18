import {
  InkNodeHistoryItem,
} from './InkNodeHistoryItem';

declare function getStringFromAstNodeContentItem(args: {
  readonly item: InkNodeHistoryItem;
  readonly overload?: (item: InkNodeHistoryItem) => void;
}): string;

export = getStringFromAstNodeContentItem;
