import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  InkNode,
} from './InkNode';
import {
  InkNodeTypes,
} from './InkNodeTypes';

export function walkLineHandler(
  args: DefaultWalkerArgs &
    {
      readonly line: InkNode<InkNodeTypes.Line>;
      readonly overload: (
        args: DefaultWalkerArgs &
          { readonly line: InkNode<InkNodeTypes.Line>; },
      ) => Promise<void>;
    },
): Promise<void>;
