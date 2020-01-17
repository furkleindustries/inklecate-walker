import {
  InkTree,
} from './InkTree';
import {
  StartOptions,
} from './StartOptions';

declare function start(options: StartOptions): Promise<InkTree>;

export = start;
