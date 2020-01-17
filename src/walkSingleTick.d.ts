import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkNode,
} from './InkNode';
import InkPathHistoryTypes = require('./InkPathHistoryTypes');
import {
  InkTree,
} from './InkTree';

declare function walkSingleTick(args: {
  readonly overloads?: {
    readonly getNextLines?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<ReadonlyArray<InkNode<InkPathHistoryTypes.Line>>>;

    readonly walkBlockHandler?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<void>;

    readonly walkLineHandler?: (args: {
      readonly line: InkNode<InkPathHistoryTypes.Line>;
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<void>;

    readonly walkSingleTick?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<boolean>;
  };

  readonly story: InklecateStory;
  readonly tree: InkTree;
}): Promise<boolean>;

export = walkSingleTick;
