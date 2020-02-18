/**
 *
 * @param {Object} node
 * @param {function} func
 * @returns {Object} new node
 */
const mapTree = (node, func = el => el) => {
  let newNode = JSON.parse(JSON.stringify(node));
  if (node.childes.length) {
    newNode.childes = [];
    node.childes.forEach(child => newNode.childes.push(mapTree(child, func)));
  }
  return func(newNode);
};
/**
 *
 * @param {Object} node
 * @param {function} func separator
 * @returns {Object|boolean} node|false
 */
const findInTree = (node, func) => {
  console.log('f', node);
  if (func(node)) return node;
  let finding = false;
  if (node.childes.length) {
    for (const child of node.childes) {
      finding = findInTree(child, func) || finding;
      if (finding) break;
    }
  }
  return finding;
};
/**
 *
 * @param node
 * @returns {number}
 */
const treeLength = (node) => {
  let length = 0;
  mapTree(node, (el) => {length += 1; return el});
  return length;
};

const TreeUtils = {mapTree, findInTree, treeLength};

export default TreeUtils;
