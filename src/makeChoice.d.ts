import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkTree,
} from './InkTree';

declare function makeChoice(args: {
  readonly choice: any;
  readonly choiceIndex: number;
  readonly overload?: (args: {
    readonly choice: any;
    readonly choiceIndex: number;
    readonly story: InklecateStory;
    readonly tree: InkTree;
  }) => Promise<void>;

  readonly story: InklecateStory;
  readonly tree: InkTree;
}): Promise<void>;

export = makeChoice;
