import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkNode,
} from './InkNode';
import {
  InkTree,
} from './InkTree';
import {
  InkNodeTypes,
} from './InkNodeTypes';

export function getNextLines(
  args: DefaultWalkerArgs &
    {
      readonly overload: (
        args: DefaultWalkerArgs,
      ) => Promise<ReadonlyArray<InkNode<InkNodeTypes.Line>>>;
    },
): Promise<ReadonlyArray<InkNode<InkNodeTypes.Line>>>;
