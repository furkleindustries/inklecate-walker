import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';
import {
  Choice,
} from 'inkjs/engine/Choice';

interface MakeChoiceArgs extends DefaultWalkerArgs {
  readonly choice: Choice;
  readonly choiceIndex: number;
}

export function makeChoice(
  args: MakeChoiceArgs &
    { readonly overload?: (args: MakeChoiceArgs) => Promise<void>; },
): Promise<void>;
