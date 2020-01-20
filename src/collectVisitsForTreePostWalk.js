export const collectVisitsForTreePostWalk = ({
  overload,
  story,
  tree,
  tree: {
    iterationIndex,
    namedContentVisits: { [iterationIndex]: namedContentVisitArr },
  },
}) => new Promise(async (resolve, reject) => {
  try {
    if (typeof overload === 'function') {
      try {
        return resolve(await overload({
          story,
          tree,
        }));
      } catch (err) {
        return reject(err);
      }
    }

    const {
      state: { visitCounts },
    } = story;
  
    Array.from(visitCounts.entries()).forEach(([ key, value ]) => {
      if (key === 'global decl') {
        return;
      }
  
      if (!(key in namedContentVisitArr)) {
        namedContentVisitArr[key] = 0;
      }
  
      namedContentVisitArr[key] += value;
    });
  } catch (err) {
    return reject(err);
  }

  return resolve(tree);
});
