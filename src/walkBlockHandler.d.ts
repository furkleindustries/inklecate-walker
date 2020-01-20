import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';

export function walkBlockHandler(
  args: DefaultWalkerArgs &
    { readonly overload?: (args: DefaultWalkerArgs) => Promise<void>; },
): Promise<void>;

