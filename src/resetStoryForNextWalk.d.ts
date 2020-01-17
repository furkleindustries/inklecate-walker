import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkTree,
} from './InkTree';

declare function resetStoryForNextWalk(args: {
  readonly overload?: (args: {
    readonly story: InklecateStory;
    readonly tree: InkTree;
  }) => Promise<InklecateStory>;

  readonly story: InklecateStory;
  readonly tree: InkTree;
}): Promise<InklecateStory>;

export = resetStoryForNextWalk;
