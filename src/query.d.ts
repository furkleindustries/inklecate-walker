import {
  InkNode,
} from './InkNode';
import InkPathHistoryTypes = require('./InkPathHistoryTypes');
import {
  InkTree,
} from './InkTree';

declare function query(tree: InkTree, id: string): Promise<InkNode<InkPathHistoryTypes>> | null;

export = query;
