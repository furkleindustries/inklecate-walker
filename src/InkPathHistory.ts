import {
  InkNodeTypes,
} from './InkNodeTypes';

export interface InkPathHistory<T extends InkNodeTypes = InkNodeTypes> {
  readonly choiceIndex: T extends InkNodeTypes.ChoiceSelection ?
    number :
    undefined;

  readonly containerId: string;
  readonly id: string;
  readonly iterationIndex: number;
  readonly turnIndex: number;
  readonly type: T;
}
