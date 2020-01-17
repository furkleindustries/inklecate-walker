import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkTree,
} from './InkTree';

declare function filterTree(args: {
  readonly overload?: (args: {
    readonly story: InklecateStory;
    readonly tree: InkTree;
  }) => Promise<InkTree>;

  readonly story: InklecateStory;
  readonly tree: InkTree;
}): Promise<InkTree>;

export = filterTree;
