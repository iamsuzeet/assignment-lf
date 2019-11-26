var items = [
  'js',
  'java',
  'php',
  'python',
  'go',
  'js',
  'java',
  'php',
  'python',
  'go',
  'ruby',
  'c#',
  'js',
  'java',
  'php',
  'python',
  'go',
  'js',
  'java',
  'php',
  'python',
  'go',
  'js',
  'java',
  'php',
  'python',
  'go'
];

var getUnique = items.filter(function(item, i, oldArray) {
  return oldArray.indexOf(item) === i;
});
console.log(getUnique);

/// alternatives

// var getUnique = Array.from(new Set(items));
// console.log(getUnique);

var counts = {};
items.forEach(function(item, i, items) {
  counts[items[i]] = 1 + (counts[items[i]] || 0);
});

console.log(counts);
