const {
  Choice,
  ChoicePoint,
  ChoiceSelection,
  Line,
} = require('./InkPathHistoryTypes');

module.exports = (item, overload) => {
  if (typeof overload === 'function') {
    return overload(item);
  }

  if (type === Choice && item && item.content) {
    return `* ${item.content}`;
  } else if (type === ChoicePoint) {
    return '***';
  } else if (type === ChoiceSelection) {
    return `> #${choiceIndex + 1}\n***\n`;
  } else if (type === Line && item && item.content) {
    const {
      content: { text },
    } = item;

    if (text) {
      return text;
    }
  }
};
