import {
  InkNode,
} from './InkNode';
import {
  InkNodeMap,
} from './InkNodeMap';
import {
  InkPathHistory,
} from './InkPathHistory';
import InkPathHistoryTypes = require('./InkPathHistoryTypes');
import {
  InkStateHistory,
} from './InkStateHistory';

export interface InkTree {
  readonly getPrintout: (iterationIndex: number) => Promise<string>;
  readonly inputFilepath: string;
  readonly iterationCount: number;
  readonly iterationIndex: number;
  readonly namedContentVisits: ReadonlyArray<Record<string, number>>;
  readonly nodeMap: InkNodeMap;
  readonly pathHistories: ReadonlyArray<
    ReadonlyArray<
      InkPathHistory<InkPathHistoryTypes>
    >
  >;

  readonly stateHistories: readonly InkStateHistory[][];
  readonly tickCounts: readonly number[];
}
