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
