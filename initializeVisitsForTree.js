module.exports = (story, tree) => {
  const {
    mainContentContainer: { namedOnlyContent },
  } = story;

  tree.namedContentVisits = {};

  Array.from(namedOnlyContent.entries()).forEach(([ key, value ]) => {
    if (key === 'global decl') {
      return;
    }

    tree.namedContentVisits[key] = 0;
  });

  return tree;
};
