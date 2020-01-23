import {
  InkNodeTypes,
} from './InkNodeTypes';

export const getStringFromAstNodeContentItem = ({
  item,
  overload,
}) => {
  if (typeof overload === 'function') {
    return overload(item);
  } else if (!item) {
    return;
  }

  const {
    content,
    type,
  } = item;

  if (type === InkNodeTypes.Choice && content) {
    return `* ${content}`;
  } else if (type === InkNodeTypes.ChoicePoint) {
    return '***';
  } else if (type === InkNodeTypes.ChoiceSelection) {
    const indexNum = Number(content);
    if (indexNum >= 0 && indexNum % 1 === 0) {
      /**
       * One-index the choice index.
       */
      return `> #${indexNum + 1}`;
    }
  } else if (type === InkNodeTypes.Line && content && content.text) {
    return content.text;
  }
};
