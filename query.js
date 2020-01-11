module.exports = ({ map }, query) => (
  query in map ? map[query] : null
);
