import {
  InkNodeTypes,
} from './InkNodeTypes';

export const getLastIds = ({
  iterationIndex,
  pathHistories: { [iterationIndex]: pathHistory },
}) => {
  if (iterationIndex) {
    debugger;
  }

  for (let ii = pathHistory.length - 1; ii >= 0; ii -= 1) {
    const item = pathHistory[ii];
    const {
      containerId,
      id,
      type,
    } = item;

    if (type === InkNodeTypes.NextContent) {
      return {
        containerId,
        id,
      }; 
    }
  }

  return {
    containerId: null,
    id: null,
  };
};
