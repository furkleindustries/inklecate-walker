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
  readonly targetId: T extends InkNodeTypes.ChoicePoint ?
    string :
    undefined;

  readonly turnIndex: number;
  readonly type: T;
}
