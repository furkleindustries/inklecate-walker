import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  Story,
} from 'inkjs/engine/Story';
import {
  InkTree,
} from './InkTree';

export function resetStoryForNextWalk(
  args: DefaultWalkerArgs &
    { readonly overload?: (args: DefaultWalkerArgs) => Promise<Story>; },
): Promise<Story>;
