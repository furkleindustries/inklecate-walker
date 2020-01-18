import {
  InkTree,
} from './InkTree';

declare function printPlaythroughFromTree(args: {
  readonly iterationIndex: number;
  readonly nodeMap: InkTree['nodeMap'];
  readonly overloads?: {
    readonly printPlaythroughFromTree?: (args: {
      readonly iterationIndex: number;
      readonly nodeMap: InkTree['nodeMap'];
      readonly pathHistories: InkTree['pathHistories'];
    }) => Promise<string>;
  };

  readonly pathHistories: InkTree['pathHistories'];
}): Promise<string>;

export = printPlaythroughFromTree;
