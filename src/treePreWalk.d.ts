import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  InkTree,
} from './InkTree';

export function treePreWalk(
  args: DefaultWalkerArgs &
    { readonly overload: (args: DefaultWalkerArgs) => Promise<InkTree>; },
): Promise<InkTree>;
