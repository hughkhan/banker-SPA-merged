import Queue from "lib/queue";
import hpError from "lib/hpError";


class Node {
  constructor(key, data) {
    this.key = key;
    this.data = data;
    this.parent = null;
    this.children = [];
  }
}

export default class Tree {
  constructor(key, data) {
    var node = new Node(key, data);
    this._root = node;
  }
  traversePre(callback) {
    // Pre-order traversal
    (function recurse(currentNode) {
      callback(currentNode);

      for (var i = 0, length = currentNode.children.length; i < length; i++) {
        recurse(currentNode.children[i]);
      }
    })(this._root);
  }

  traversePost(callback) {
    // Post-order traversal
    (function recurse(currentNode) {
      for (var i = 0, length = currentNode.children.length; i < length; i++) {
        recurse(currentNode.children[i]);
      }
      callback(currentNode);
    })(this._root);
  }

  traverseBF(callback) {
    var queue = new Queue();
    queue.enqueue(this._root);
    var currentTree = queue.dequeue();

    while (currentTree) {
      for (var i = 0, length = currentTree.children.length; i < length; i++) {
        queue.enqueue(currentTree.children[i]);
      }
      callback(currentTree);
      currentTree = queue.dequeue();
    }
  }

  contains(callback, traversal) {
    traversal.call(this, callback);
  }

  add(key, data, toKey, traversal) {
    var child = new Node(key, data),
      parent = null,
      callback = function(node) {
        if (node.key === toKey) {
          parent = node;
        }
      };
    this.contains(callback, traversal);
    if (parent) {
      parent.children.push(child);
      child.parent = parent;
    } else {
      throw new hpError("tree", "Cannot add node to a non-existent parent.");
    }
  }

  remove(key, fromKey, traversal) {
    var parent = null,
      childToRemove = null,
      index;
    var callback = function(node) {
      if (node.key === fromKey) {
        parent = node;
      }
    };
    this.contains(callback, traversal);
    if (parent) {
      index = findIndex(parent.children, key);
      if (index === undefined) {
        throw new hpError("tree", "Node to remove does not exist.");
      } else {
        childToRemove = parent.children.splice(index, 1);
      }
    } else {
      throw new hpError("tree", "Parent does not exist.");
    }
    return childToRemove;
  }
}

function findIndex(arr, key) {
  var index;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].key === key) {
      index = i;
    }
  }

  return index;
}
