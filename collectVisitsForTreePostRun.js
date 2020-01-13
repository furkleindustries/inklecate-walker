module.exports = (story, tree) => {
  const {
    state: { visitCounts },
  } = story;

  Array.from(visitCounts.entries()).forEach(([ key, value ]) => {
    if (key === 'global decl') {
      return;
    }

    if (!(key in tree.namedContentVisits)) {
      tree.namedContentVisits[key] = 0;
    }

    tree.namedContentVisits[key] += value;
  });

  return tree;
};
