function parseVariableDeclaration(tokens, i, kind) {
  //[let,x,=,10]
  //we are at 0th index
  //let + 1 = variable name
  //let + 2 = assignement
  //let + 3 = value
  //Js goes though code in 2 phases
  //in first it only declared nodes
  //Memory Phase 1:
  //   {
  //     let x = undefined;
  //     var arr = undefined;
  //   }
  //Memory Phase 2:
  //   {
  //     let x = 10;
  //     var arr = [1,2,3,4];
  //   }

  //create two nodes: declaration node, assignment node

  const declarationNode = {
    nodeType: "VariableDeclaration",
    metaData: {
      name: tokens[i + 1],
      value: undefined,
      kind: kind,
      dataType: findTokenDataType(tokens, index),
    },
  };

  const assignementNode = {
    nodeType: "VariableAssignment",
    metaData: {
      name: tokens[i + 1],
      dataType: findTokenDataType(tokens, index),

      value: findTokenValue(tokens, index),
    },
  };

  return { declarationNode, assignementNode };
}

export { parseVariableDeclaration };
