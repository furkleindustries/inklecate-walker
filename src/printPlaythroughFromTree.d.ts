import {
  InkTree,
} from './InkTree';

declare function printPlaythroughFromTree(tree: InkTree): Promise<string>;

export = printPlaythroughFromTree;
