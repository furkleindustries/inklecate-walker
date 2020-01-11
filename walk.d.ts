import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  Results,
} from './Results';

declare const walk: (story: InklecateStory) => Promise<Results>;
export = walk;
