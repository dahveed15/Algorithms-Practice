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
