import {
  Story,
} from 'inkjs/engine/Story';
import {
  InkTree,
} from './InkTree';

export interface DefaultWalkerArgs {
  readonly story: Story;
  readonly tree: InkTree;
}
