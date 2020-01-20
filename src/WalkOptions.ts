import {
  StartOptions,
} from './StartOptions';
import {
  Story,
} from 'inkjs/engine/Story';

export interface WalkOptions extends StartOptions {
  readonly story: Story;
}
