const {
  Choice,
  ChoicePoint,
  ChoiceSelection,
  Line,
} = require('./InkPathHistoryTypes');

module.exports = ({
  item,
  overload,
}) => {
  if (typeof overload === 'function') {
    return overload(item);
  } else if (!item) {
    return;
  }

  const {
    choiceIndex,
    content,
    type,
  } = item;

  if (type === Choice && content) {
    return `* ${content}`;
  } else if (type === ChoicePoint) {
    return '***';
  } else if (type === ChoiceSelection && content) {
    return content;
  } else if (type === Line && content && content.text) {
    return content.text;
  }
};
