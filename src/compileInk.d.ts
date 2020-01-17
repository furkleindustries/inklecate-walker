import {
  InklecateReturn,
} from 'inklecate/types/InklecateReturn';

declare function compileInk(inputFilepath: string): Promise<InklecateReturn>;

export = compileInk;
