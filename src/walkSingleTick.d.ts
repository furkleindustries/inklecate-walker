import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  InkNode,
} from './InkNode';
import {
  InkNodeTypes,
} from './InkNodeTypes';
import {
  InkTree,
} from './InkTree';

export function walkSingleTick(
  args: DefaultWalkerArgs &
    {
      readonly overloads?: {
        readonly getNextLines?: (
          args: DefaultWalkerArgs,
        ) => Promise<ReadonlyArray<InkNode<InkNodeTypes.Line>>>;

        readonly walkBlockHandler?: (args: DefaultWalkerArgs) => Promise<void>;
        readonly walkLineHandler?: (
          args: DefaultWalkerArgs &
            { readonly line: InkNode<InkNodeTypes.Line>; },
        ) => Promise<void>;

        readonly walkSingleTick?: (args: DefaultWalkerArgs) => Promise<boolean>;
      };
    },
): Promise<boolean>;
