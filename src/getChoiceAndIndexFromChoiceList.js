export const getChoiceAndIndexFromChoiceList = ({
  overload,
  story,
  story: { currentChoices },
  tree,
}) => {
  let retVal = null;
  const defaultVal = {
    choice: null,
    choiceIndex: -1,
  };

  if (typeof overload === 'function') {
    retVal = overload({
      story,
      tree,
    });
  } else {
    const index = Math.floor(Math.random() * currentChoices.length);
    retVal = {
      choice: currentChoices[index],
      choiceIndex: index,
    };
  }

  return retVal || defaultVal;
};
