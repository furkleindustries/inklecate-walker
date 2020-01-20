import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  InkTree,
} from './InkTree';

export function filterTree(
  args: DefaultWalkerArgs &
    { readonly overload?: (args: DefaultWalkerArgs) => Promise<InkTree>; },
): Promise<InkTree>;
