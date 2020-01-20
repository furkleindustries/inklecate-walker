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
  } else if (type === InkNodeTypes.ChoiceSelection && content) {
    return content;
  } else if (type === InkNodeTypes.Line && content && content.text) {
    return content.text;
  }
};
