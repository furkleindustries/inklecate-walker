import {
  Choice,
} from 'inkjs/engine/Choice';
import {
  DefaultWalkerArgs,
} from './DefaultWalkerArgs';

interface ChoiceAndIndex {
  readonly choice: Choice;
  readonly choiceIndex: number;
}

export function getChoiceAndIndexFromChoiceList(
  args: DefaultWalkerArgs &
    { readonly overload?: (args: DefaultWalkerArgs) => ChoiceAndIndex; },
): ChoiceAndIndex;
