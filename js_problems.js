var maxDepth = function(root) {
  if (root === null) {
    return 0;
  }
  var result = 0;

  function dfs(node, depth) {
    if (node.left !== null) {
      dfs(node.left, depth + 1);
    }
    if (node.right !== null) {
      dfs(node.right, depth + 1);
    } else result = Math.max(result, depth);
  }

  dfs(root, 1);

  return result;
};

var isValidBST = function(root, upperBound = Infinity, lowerBound = -Infinity) {
  if (!root) {
    return true;
  }

  if (root.val >= upperBound || root.val <= lowerBound) {
    return false;
  }

  return (
    isValidBST(root.left, Math.min(upperBound, root.val), lowerBound) &&
    isValidBST(root.right, upperBound, Math.max(lowerBound, root.val))
  );
};

var rotate = function(nums, k) {
  nums.unshift(...nums.splice(nums.length - k, k));
};

function isIPv4Address(inputString) {
  let nums = inputString.split('.');

  if (nums.length !== 4) {
    return false;
  }

  //this is a check for if there's extra '.' in the string
  if (nums.some(el => el === '')) {
    return false;
  }

  return nums.every(num => num >= 0 && num <= 255);
}

var groupAnagrams = function(strs) {
  let obj = {};

  for (let i = 0; i < strs.length; i++) {
    //give me a key for a sorted word (e.g. 'eat' => 'aet'. then nothing else will be make for a key like 'ate' or 'tea')
    //this key will be what I push all of the anagrams in
    if (!obj[sortedKey(strs[i])]) {
      obj[sortedKey(strs[i])] = [];
    }
  }

  for (let i = 0; i < strs.length; i++) {
    //each string will know which array to go in because its sorted value will be one of the keys from the last loop
    obj[sortedKey(strs[i])].push(strs[i]);
  }

  //now get rid of the keys and output a nested array of the anagrams
  return Object.values(obj);
};

function sortedKey(str) {
  return str
    .split('')
    .sort()
    .join('');
}

var maxProfit = function(prices) {
  let total = 0;

  for (var i = 0; i < prices.length; i++) {
    if (prices[i] < prices[i + 1]) {
      total += prices[i + 1] - prices[i];
    }
  }

  return total;
};

var containsDuplicate = function(nums) {
  if (nums.length === 0) {
    return false;
  }

  let sortedArr = nums.sort();

  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i] === sortedArr[i + 1]) {
      return true;
    }
  }

  return false;
};

function checkEdit(str1, str2) {
  let obj1 = {};
  let obj2 = {};

  for (let i = 0; i < str1.length; i++) {
    if (!obj1[str1[i]]) {
      obj1[str1[i]] = 1;
    }
  }

  for (let i = 0; i < str2.length; i++) {
    if (!obj2[str2[i]]) {
      obj2[str2[i]] = 1;
    }
  }

  let charactersInBothStrings = 0;

  let maxWord = str1.length > str2.length ? str1 : str2;

  for (let i = 0; i < maxWord.length; i++) {
    //track all of the letters in common
    if (obj1[maxWord[i]] && obj2[maxWord[i]]) {
      charactersInBothStrings++;
    }
  }

  //there can be at most 1 edit
  return maxWord.length - charactersInBothStrings < 2;
}

function stringCompression(str) {
  let obj = {};

  for (let i = 0; i < str.length; i++) {
    if (!obj[str[i]]) {
      obj[str[i]] = 1;
    }
  }

  let result = '';

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      obj[str[i]]++;
    } else {
      result += str[i] + obj[str[i]];
      obj[str[i]] = 1;
    }
  }

  return result.length > str.length ? str : result;
}

var numJewelsInStones = function(J, S) {
  //make an object with key values for J
  //iterate through S and increase the counter if that key exists in J

  let obj = {};

  for (let i = 0; i < J.length; i++) {
    obj[J[i]] = 1;
  }

  let count = 0;

  for (let i = 0; i < S.length; i++) {
    if (obj[S[i]]) {
      count++;
    }
  }

  return count;
};

//matrix = [[1, 0, 0, 2],
// [0, 5, 0, 1],
// [0, 0, 3, 5]]

//constructSubmatrix(matrix, [1], [0, 2]) => [[0, 2],
// [0, 5]]

function constructSubmatrix(matrix, rowsToDelete, columnsToDelete) {
  let subRows = [];

  for (let i = 0; i < matrix.length; i++) {
    if (rowsToDelete.length === 0 || i !== rowsToDelete[0]) {
      subRows.push(matrix[i]);
    } else {
      rowsToDelete.shift();
    }
  }

  let result = [];

  //need the amount of [] that I got from the subRows to add the elements that aren't in the deleted columns
  for (let i = 0; i < subRows.length; i++) {
    result.push([]);
  }

  for (let i = 0; i < subRows.length; i++) {
    for (let j = 0; j < subRows[i].length; j++) {
      if (!columnsToDelete.includes(j)) {
        result[i].push(subRows[i][j]);
      }
    }
  }

  return result;
}

function myFlatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      result = result.concat(myFlatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

function permute(permutation) {
  let result = [permutation.slice()];
  let arr = new Array(permutation.length).fill(0);
  let oldSpot;
  let newSpot;
  let i = 1;

  while (i < permutation.length) {
    if (arr[i] < i) {
      newSpot = i % 2 !== 0 ? arr[i] : i % 2;

      oldSpot = permutation[i];

      //permutation is constantly being overwritten
      permutation[i] = permutation[newSpot];
      permutation[newSpot] = oldSpot;

      //we need this so that we can basically keep reverting positions of arr back to 0
      arr[i]++;
      i = 1;
      result.push(permutation.slice());
    } else {
      arr[i] = 0;
      i++;
    }
  }

  return result;
}

function expandedForm(num) {
  // Your code here

  if (num < 10) {
    return String(num);
  }

  let strNum = String(num);

  let endPoint = strNum.length - 1;

  //70304
  //enpoint = 4
  //7 * 10 ^ 4 = 70000
  //skip if strNum[i] === '0'
  //this way, we only focus on the 7, 3, and 4

  //70000 + => 300 + => 4

  let result = '';

  for (let i = 0; i < strNum.length; i++) {
    if (strNum[i] === '0') {
      continue;
    }

    let n = parseInt(strNum[i]) * Math.pow(10, endPoint - i);
    result += n + ' + ';
  }

  //chop off the ' + ' part at the end
  return result.slice(0, result.length - 3);
}

//Equal Sides of An Array
function findEvenIndex(arr) {
  //case for last example in the description
  // You are given the array {20,10,-80,10,10,15,35}
  // At index 0 the left side is {}
  // The right side is {10,-80,10,10,15,35}
  // They both are equal to 0 when added. (Empty arrays are equal to 0 in this problem)
  // Index 0 is the place where the left side and right side are equal.
  if (arr.reduce((acc, el) => acc + el) === 0 || arr.length === 0) {
    return 0;
  }

  //start the index at 1
  //we don't need to check the last element of the array because there's nothing to the right of it
  for (let i = 1; i < arr.length - 1; i++) {
    let leftSlice = arr.slice(0, i);
    //the spot after the index to the end of the array
    let rightSlice = arr.slice(i + 1);

    //check if the sums of the left and right slices of the index we're on are equal
    if (
      leftSlice.reduce((acc, el) => acc + el) ===
      rightSlice.reduce((acc, el) => acc + el)
    ) {
      return i;
    }
  }

  //if nothing is found, return -1
  return -1;
}

function listSquared(m, n) {
  // your code
  let result = [];

  for (let i = m; i <= n; i++) {
    if (divisors(i)) {
      result.push(divisors(i));
    }
  }

  return result;
}

function divisors(num) {
  let nums = [];

  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      nums.push(i);
    }
  }

  let divisorSum = nums
    .map(el => Math.pow(el, 2))
    .reduce((acc, el) => acc + el);

  return Math.sqrt(divisorSum) % 1 === 0 ? [num, divisorSum] : null;
}

//strip comments
function solution(input, markers) {
  //split on "\n"

  let lines = input.split('\n');

  return lines.map(line => checkLine(line, markers)).join('\n');
}

function checkLine(str, markers) {
  //iteratate and add result string
  //if we run across a marker return string immediately
  //else return it out of the loop

  let obj = {};

  for (let i = 0; i < markers.length; i++) {
    if (!obj[markers[i]]) {
      obj[markers[i]] = true;
    }
  }

  let result = '';

  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      //we need to filter out everything not equal to empty string to strip away white space
      return result
        .split(' ')
        .filter(el => el !== '')
        .join(' ');
    } else {
      result += str[i];
    }
  }

  //we need to filter out everything not equal to empty string to strip away white space
  return result
    .split(' ')
    .filter(el => el !== '')
    .join(' ');
}

var moveZeroes = function(nums) {
  let len = nums.length;

  for (let i = 0; i < len; i++) {
    //[151, 0, 234, 21, 0, 35, 0] => [151, 234, 21, 0, 35, 0, 0] => [151, 234, 21, 35, 0, 0, 0] => [151, 234, 21, 35, 0, 0, 0]
    if (nums[i] == 0) {
      nums.splice(i, 1);
      nums.push(0);
      i--;
      //decrease the end to reach the point of no zeroes
      len--;
    }
  }
};

//we need to use result in both methods, so we put it in the outer scope so that in can be updated in both methods
let result;

var sumOfLeftLeaves = function(root) {
  //start it at 0, and then it will be updated in the dfs method
  result = 0;

  //case for empty tree
  if (!root) {
    return 0;
  }

  dfsTree(root, false);

  return result;
};

function dfsTree(node, leftFlag) {
  if (!node) {
    return;
  }

  //if we reach a left node with no children, add the result
  if (!node.left && !node.right && leftFlag) {
    result += node.val;
  }

  //tack on the true for each left path recursively to see if we've reached the end of it
  dfsTree(node.left, true);
  dfsTree(node.right, false);
}

var kthSmallest = function(root, k) {
  //traverse the tree and add everything to an array
  //sort the array and return array[k - 1]

  let elements = [];

  function dfs(node) {
    if (!node) {
      return;
    }

    elements.push(node.val);

    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);

  let sortedElements = elements.sort(function(a, b) {
    return a - b;
  });

  return sortedElements[k - 1];
};

function getAllSubsets(arr) {
  return arr.reduce(
    (subsets, value) => subsets.concat(subsets.map(set => [...set, value])),
    [[]]
  );
}

function flattenObject(nested) {
  let obj = {};

  for (var char in nested) {
    //second conditional is for an empty object
    if (
      typeof nested[char] !== 'object' ||
      Object.keys(nested[char]).length === 0
    ) {
      obj[char] = nested[char];
    } else {
      let inner = flattenObject(nested[char]);
      let concatenatedChar = char;

      for (var innerChar in inner) {
        obj[concatenatedChar + '.' + innerChar] = inner[innerChar];
      }
    }
  }

  return obj;
}
