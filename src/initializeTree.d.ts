import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkTree,
} from './InkTree';

declare function initializeTree(args: {
  readonly inputFilepath: string;
  readonly iterationCount: number;
  readonly overload?: (args: {
    readonly inputFilepath: string;
    readonly iterationCount: number;
    readonly story: InklecateStory;
  }) => Promise<InkTree>;

  readonly story: InklecateStory;
}): Promise<InkTree>;

export = initializeTree;
