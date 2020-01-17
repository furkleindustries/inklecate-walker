import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkNode,
} from './InkNode';
import {
  InkTree,
} from './InkTree';
import InkPathHistoryTypes = require('./InkPathHistoryTypes');

declare function getNextLines(args: {
  readonly overload: (args: {
    readonly story: InklecateStory;
    readonly tree: InkTree;
  }) => Promise<ReadonlyArray<InkNode<InkPathHistoryTypes.Line>>>;

  readonly story: InklecateStory,
  readonly tree: InkTree,
}): Promise<ReadonlyArray<InkNode<InkPathHistoryTypes.Line>>>;

export = getNextLines;
