import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkTree,
} from './InkTree';

export function walkIteratively(args: {
  readonly overloads?: {
    readonly walkIteratively?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<void>;

    readonly walkSingleTick?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<boolean>;

    readonly treePostWalk?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<void>;

    readonly treePreWalk?: (args: {
      readonly story: InklecateStory;
      readonly tree: InkTree;
    }) => Promise<void>;
  };

  readonly story: InklecateStory;
  readonly tree: InkTree;
}): Promise<void>;
