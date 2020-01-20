import {
  InkTree,
} from './InkTree';

interface LastIds {
  readonly containerId: string;
  readonly id: string;
}

export function getLastIds(tree: InkTree): LastIds;
