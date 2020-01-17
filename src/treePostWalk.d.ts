import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkTree,
} from './InkTree';

declare function treePostWalk(args: {
  readonly overloads?: {
    readonly collectVisitsForTreePostRun?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<InkTree>;

    readonly filterTree?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<InkTree>;

    readonly resetStoryForNextWalk?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<void>;

    readonly treePostWalk?: (args: {
      readonly story: InklecateStory;
      readonly ticks: number;
      readonly tree: InkTree;
    }) => Promise<InkTree>;
  };

  readonly story: InklecateStory;
  readonly ticks: number;
  readonly tree: InkTree;
}): Promise<{
  readonly story: InklecateStory;
  readonly tree: InkTree;
}>;

export = treePostWalk;
