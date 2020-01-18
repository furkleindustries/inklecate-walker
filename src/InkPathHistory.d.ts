import InkPathHistoryTypes = require('./InkPathHistoryTypes');

export interface InkPathHistory<T extends InkPathHistoryTypes = InkPathHistoryTypes> {
  readonly choiceIndex: T extends InkPathHistoryTypes.ChoiceSelection ?
    number :
    undefined;

  readonly containerId: string;
  readonly id: string;
  readonly iterationIndex: number;
  readonly turnIndex: number;
  readonly type: T;
}
