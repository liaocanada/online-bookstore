/* For statically handling dynamic IDs in url */
console.log(location);
console.log(location.hash);
console.log(location.hash.substring(1));
history.pushState({}, "Entry page", location.hash.substring(1));
