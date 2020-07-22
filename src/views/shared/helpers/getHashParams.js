// Adapted from https://stackoverflow.com/a/4198132/13363321
export default (location => {
  const hashParams = {};

  let e;
  const a = /\+/g;  // Regex for replacing addition symbol with a space
  const r = /([^&;=]+)=?([^&;]*)/g;
  const d = s => decodeURIComponent(s.replace(a, ' '));
  const q = location.hash.substring(1);

  // eslint-disable-next-line no-cond-assign
  while (e = r.exec(q)) {
    hashParams[d(e[1])] = d(e[2]);
  }

  return hashParams;
});
