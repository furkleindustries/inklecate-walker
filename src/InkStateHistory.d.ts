import InkPathHistoryTypes = require("./InkPathHistoryTypes");

export interface InkStateHistory {
  readonly content: Record<string, string>;
  readonly iterationIndex: number;
  readonly turnIndex: number;
  readonly type: InkPathHistoryTypes;
}
