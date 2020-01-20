import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  InkTree,
} from './InkTree';

export function walkIteratively(
  args: DefaultWalkerArgs &
  {
    readonly overloads?: {
      readonly walkIteratively?: (args: DefaultWalkerArgs) => Promise<void>;
      readonly walkSingleTick?: (args: DefaultWalkerArgs) => Promise<boolean>;
      readonly treePostWalk?: (args: DefaultWalkerArgs) => Promise<void>;
      readonly treePreWalk?: (args: DefaultWalkerArgs) => Promise<void>;
    };
  },
): Promise<void>;
