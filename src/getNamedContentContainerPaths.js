module.exports = (id) => {
  const val = id && typeof id.split === 'function' ?
    id
      .split('.')
      .map((aa) => aa.trim())
      .filter(Boolean)
      .filter((aa) => new RegExp(/^[^0-9]/).test(aa)) :
    [];

  return val;
};
