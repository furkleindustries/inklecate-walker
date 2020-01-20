import {
  InkNode,
} from './InkNode';
import {
  InkTree,
} from './InkTree';

export function query(tree: InkTree, id: string): Promise<InkNode | null>;
