import {
  InkNode,
} from './InkNode';
import {
  InkTree,
} from './InkTree';

export function query(
  tree: InkTree,
  id: string,
  options?: {
    readonly type;
    readonly typeInHistory;
    readonly iterationIndexInHistory?: number;
    readonly turnIndexInHistory?: number;
  },
): Promise<InkNode | null>;
