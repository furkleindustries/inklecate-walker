module.exports = (id) => (
  id && typeof id.split === 'function' ?
    id
      .split('.')
      .map((aa) => aa.trim())
      .filter(Boolean)
      .filter((aa) => new RegExp(/^[^0-9]/).test(aa)) :
    []
);
