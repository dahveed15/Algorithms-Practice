var maxDepth = function(root) {

  if(root === null)  {
      return 0;
  }
    var result = 0;

    function dfs( node, depth ){
        if( node.left !== null ){
            dfs( node.left, depth + 1 );
        }
        if( node.right !== null ){
            dfs( node.right, depth + 1 );
        }
        else result = Math.max( result, depth );
    }

    dfs( root, 1 );

    return result;

};

var isValidBST = function(root, upperBound=Infinity, lowerBound=-Infinity) {
  if (!root) {
    return true;
  }

  if (root.val >= upperBound || root.val <= lowerBound) {
      return false;
  }

  return isValidBST(root.left, Math.min(upperBound, root.val), lowerBound) &&
         isValidBST(root.right, upperBound, Math.max(lowerBound, root.val));
};

var rotate = function(nums, k) {

  nums.unshift(...nums.splice(nums.length - k, k));

};

function isIPv4Address(inputString) {
  let nums = inputString.split('.');

  if(nums.length !== 4) {
    return false;
  }

  //this is a check for if there's extra '.' in the string
  if(nums.some(el => el === '')) {
    return false;
  }

  return nums.every(num => num >= 0 && num <= 255);
}

var groupAnagrams = function(strs) {

  let obj = {};

  for(let i = 0; i < strs.length; i++) {
      //give me a key for a sorted word (e.g. 'eat' => 'aet'. then nothing else will be make for a key like 'ate' or 'tea')
      //this key will be what I push all of the anagrams in
      if(!(obj[sortedKey(strs[i])])) {
          obj[sortedKey(strs[i])] = [];
      }
  }

  for(let i = 0; i < strs.length; i++) {
      //each string will know which array to go in because its sorted value will be one of the keys from the last loop
      obj[sortedKey(strs[i])].push(strs[i]);
  }

  //now get rid of the keys and output a nested array of the anagrams
  return Object.values(obj);


};

function sortedKey(str) {
    return str.split('').sort().join('');
}



var maxProfit = function(prices) {
    let total = 0;

    for(var i = 0; i < prices.length; i++) {
        if(prices[i] < prices[i+1]) {
            total += prices[i+1] - prices[i];
        }
    }

    return total;
};

var containsDuplicate = function(nums) {
    if (nums.length === 0) {
        return false;
    }

    let sortedArr = nums.sort();

    for(let i = 0; i < sortedArr.length - 1; i++) {
      if (sortedArr[i] === sortedArr[i+1]) {
          return true;
      }
    }

   return false;
};

function checkEdit(str1, str2) {

  let obj1 = {};
  let obj2 = {};

  for(let i = 0; i < str1.length; i++) {
    if(!obj1[str1[i]]) {
      obj1[str1[i]] = 1;
    }
  }

  for(let i = 0; i < str2.length; i++) {
    if(!obj2[str2[i]]) {
      obj2[str2[i]] = 1;
    }
  }

  let charactersInBothStrings = 0;

  let maxWord = str1.length > str2.length ? str1 : str2;

  for(let i = 0; i < maxWord.length; i++) {
    //track all of the letters in common
    if((obj1[maxWord[i]] && obj2[maxWord[i]])) {
      charactersInBothStrings++;
    }
  }

  //there can be at most 1 edit
  return maxWord.length - charactersInBothStrings < 2;
}
