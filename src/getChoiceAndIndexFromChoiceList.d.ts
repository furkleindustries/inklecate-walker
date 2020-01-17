import {
  InklecateStory,
} from 'inklecate/types/InklecateStory';
import {
  InkTree,
} from './InkTree';

declare function getChoiceAndIndexFromChoiceList(args: {
  readonly overload?: (args: {
    readonly story: InklecateStory;
    readonly tree: InkTree;
  }) => {
    readonly choice: any;
    readonly choiceIndex: number;
  };

  readonly story: InklecateStory;
  readonly tree: InkTree;
}): {
  readonly choice: any;
  readonly choiceIndex: number;
};

export = getChoiceAndIndexFromChoiceList;
