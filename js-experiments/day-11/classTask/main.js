console.log('----loop and functions------');
function pattern() {
  // var input = prompt("enter input:")
  var star = '';
  for (var i = input; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      star += '* ';
    }
    console.log(star);
    star = '';
  }
}

console.log('-----objects NO.1-------');
const myInfo = {
  name: 'Sujit',
  address: 'Gwarko',
  email: 'abc@gmail.com',
  interests: 'gaming',
  education: [
    { name: 'NCS', enrolledDate: 2000 },
    { name: 'Aberdeen', enrolledDate: 2006 }
  ]
};

myInfo.education.forEach(function(education) {
  console.log(
    'Name: ' + education.name + ', ' + 'Date :' + education.enrolledDate
  );
});

console.log('-----object NO.2------');

var fruits = [
  { id: 1, name: 'Banana', color: 'Yellow' },
  { id: 2, name: 'Apple', color: 'Red' }
];

function searchByName(fruits, name) {
  var results = [];
  fruits.map(function(fruit) {
    if (fruit.name === name) {
      results.push(fruit);
    }
  });

  console.log(results);
}

searchByName(fruits, 'Apple');

console.log('--------functions------');
var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
  var tran = [];
  collection.forEach(function(item) {
    tran.push(tranFunc(item));
  });
  return tran;
}

var output = transform(numbers, function(num) {
  return num * 2;
});

console.log(output);

console.log('---------sorting---------');
var arr = [
  {
    id: 1,
    name: 'John'
  },
  {
    id: 2,
    name: 'Mary'
  },
  {
    id: 3,
    name: 'Andrew'
  }
];

function sortBy(array, key) {
  var newArr = array.slice();
  var key = key;

  newArr.sort(function(a, b) {
    var compareA = a[key];

    var compareB = b[key];
    if (compareA < compareB) {
      return -1;
    }

    if (compareA > compareB) {
      return 1;
    }

    return 0;
  });

  console.log('sorted array');
  console.log(newArr);

  console.log('old array');
  console.log(arr);
}

var sorted = sortBy(arr, 'name');

console.log('------Normalization-----');

// From this
var input = {
  '1': {
    id: 1,
    name: 'John',
    children: [
      { id: 2, name: 'Sally' },
      { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
    ]
  },
  '5': {
    id: 5,
    name: 'Mike',
    children: [{ id: 6, name: 'Peter' }]
  }
};

function normalize(input) {
  var keys = Object.keys(input);

  return keys.reduce(function(acc, key) {
    if (!acc[key]) {
      acc[key] = input[key];
    }

    flattenChild(acc[key], acc);

    return acc;
  }, {});
}

function flattenChild(obj, parent) {
  if (!obj.children) {
    return;
  }

  obj.children.forEach(function(value, index) {
    parent[value.id] = value;
    obj.children[index] = value.id;

    flattenChild(value, parent);
  });
}

var output = normalize(input);

console.log(output);
