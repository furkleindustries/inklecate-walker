import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  InkTree,
} from './InkTree';

export function collectVisitsForTreePostWalk(
  args: DefaultWalkerArgs &
    { readonly overload: (args: DefaultWalkerArgs) => Promise<InkTree>; },
): Promise<InkTree>;

