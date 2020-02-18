import React, {useState} from 'react';
import initialDBState from './constants/InitialDB'
import TreeUtils from "./utils/treeUtils";
import './App.css';
import {isEmpty} from "./utils/commonUtils";

function Node(props) {
  const {node: {value, childes, id}, level = 1} = props;
  const handleClick = (event) => {
    event.stopPropagation();
    props.handleClick(props.node);
  };
  const handleChildClick = (node) => {
    props.handleClick(node);
  };

  return (
    <div key={id} style={{marginLeft: `${level*10}px`}} onClick={handleClick}>
      {value}
      {childes.map(child => <Node node={child} level={level + 1} handleClick={handleChildClick} />)}
    </div>
  )
}


function App() {
  const root = initialDBState;
  const [lastId, setLastId] = useState(TreeUtils.treeLength(root));
  const [cache, setCache] = useState([]);
  const [cachesPaths, setCachesPaths] = useState([]);

  const findParent = (path, allPaths) => {
    let foundParent = '';
    allPaths.forEach(nodePath => {
      if(nodePath.indexOf(path) !== -1 && path.length > foundParent)
        foundParent = nodePath;
    });
    return foundParent;
  };

  const findChides = (path, allPaths) => {
    const foundChildes = [];
    allPaths.forEach(nodePath => {
      if(path.indexOf(nodePath) !== -1 && path.length > findParent(nodePath, allPaths).length)
        foundChildes.push(nodePath);
    });
    return foundChildes;
  };

  const handleNodeClick = (node) => {
    console.log(node, cachesPaths);
    if (cachesPaths.some(path => path === node.path)) return;
    console.log('govno');

    const parentPath = findParent(node.path, cachesPaths);
    const childesPaths = findChides(node.path, cachesPaths);
    let newCache = JSON.parse(JSON.stringify(cache));
    const childes = [];

    if (childesPaths.length) {
      childesPaths.forEach(childPath => {
        childes.push(TreeUtils.findInTree({childes: cache}, cacheNode => cacheNode.path === childPath));
        newCache = newCache.filter(item => item.path !== childPath);
        newCache = newCache.map(cacheItem =>
          TreeUtils.mapTree(cacheItem, cacheNode => cacheNode.childes.filter(child => child.path !== childPath))
        )
      })
    }

    const selectedNode = { ...JSON.parse(JSON.stringify(node)), childes };

    if (parentPath) {
      newCache = newCache.map(item => {
        if (item.path.indexOf(parentPath) !== -1) {
          return TreeUtils.mapTree(cacheNode =>
            cacheNode.path === parentPath
              ? {...cacheNode, childes: [...cacheNode.childes, selectedNode]}
              : cacheNode
          )
        } else {
          return item;
        }
      });
      setCache(newCache);
    } else {
      setCache([...newCache, selectedNode])
    }

    setCachesPaths([...cachesPaths, node.path]);
  };

  return (
    <div className="app">
      <div className="db-controller">
        <div className="left-side">
          <Node node={root} handleClick={handleNodeClick} />
        </div>
        <div className="right-side">
          {!isEmpty(cache) && cache.map(item => <Node node={item} handleClick={()=>console.log('click')} />) }
        </div>
      </div>
    </div>
  );
}

export default App;
