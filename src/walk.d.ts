import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkTree,
} from './InkTree';
import {
  WalkOptions,
} from './WalkOptions';

declare function walk(args: WalkOptions): Promise<InkTree>;

export = walk;
