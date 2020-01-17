module.exports = ({
  choice,
  choiceIndex,
  overload,
  story,
  tree,
}) => new Promise(async (resolve, reject) => {
  if (typeof overload === 'function') {
    try {
      await overload({
        choice,
        choiceIndex,
        story,
        tree,
      });
    } catch (err) {
      return reject(err);
    }
  } else {
    try {
      story.ChooseChoiceIndex(choiceIndex);
    } catch (err) {
      return reject(err);
    }
  }

  return resolve();
});