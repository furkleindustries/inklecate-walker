import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  StartOptions,
} from './StartOptions';

export interface WalkOptions extends StartOptions {
  readonly story: InklecateStory;
}
