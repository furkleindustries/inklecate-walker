import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  InkTree,
} from './InkTree';

export function treePostWalk(
  args: DefaultWalkerArgs &
    {
      readonly overloads?: {
        readonly collectVisitsForTreePostWalk?: (
          args: DefaultWalkerArgs,
        ) => Promise<InkTree>;

        readonly filterTree?: (args: DefaultWalkerArgs) => Promise<InkTree>;
        readonly resetStoryForNextWalk?: (
          args: DefaultWalkerArgs,
        ) => Promise<void>;

        readonly treePostWalk?: (
          args: DefaultWalkerArgs &
            { readonly ticks: number; },
        ) => Promise<InkTree>;
      };

    readonly ticks: number;
  },
): Promise<DefaultWalkerArgs>;
