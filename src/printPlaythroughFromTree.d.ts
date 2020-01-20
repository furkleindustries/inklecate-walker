import {
  InkTree,
} from './InkTree';

interface PrintPlaythroughFromTreeArgs {
  readonly iterationIndex: number;
  readonly nodeMap: InkTree['nodeMap'];
  readonly pathHistories: InkTree['pathHistories'];
}

export function printPlaythroughFromTree(
  args: PrintPlaythroughFromTreeArgs &
    {
      readonly overload?: (
        args: PrintPlaythroughFromTreeArgs,
      ) => Promise<string>;
    },
): Promise<string>;
