import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkTree,
} from './InkTree';

declare function walkBlockHandler(args: {
  readonly overload?: (args: {
    readonly story: InklecateStory;
    readonly tree: InkTree;
  }) => Promise<void>;

  readonly story: InklecateStory;
  readonly tree: InkTree;
}): Promise<void>;

export = walkBlockHandler;
