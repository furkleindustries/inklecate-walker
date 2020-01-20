import {
  Story,
} from 'inkjs/engine/Story';
import {
  InkTree,
} from './InkTree';

interface InitializeTreeArgs {
  readonly inputFilepath: string;
  readonly iterationCount: number;
  readonly story: Story;
}

export function initializeTree(
  args: InitializeTreeArgs &
    { readonly overload?: (args: InitializeTreeArgs) => Promise<InkTree>; },
): Promise<InkTree>;
