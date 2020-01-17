import {
  InkTree,
} from './InkTree';

declare function getLastIds(tree: InkTree): {
  readonly containerId: string;
  readonly id: string;
};

export = getLastIds;
