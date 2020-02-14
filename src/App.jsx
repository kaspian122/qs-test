import React, {useState} from 'react';
import initialDBState from './constants/InitialDB'
import TreeUtils from "./utils/treeUtils";
import './App.css';
import {isEmpty} from "./utils/commonUtils";

function Node(props) {
  const {node: {value, childes, id}, level = 1} = props;
  const handleClick = (event) => {
    event.stopPropagation();
    console.log(props);
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
  const [cache, setCache] = useState({});

  const handleNodeClick = (node) => {
    if (isEmpty(cache)) return setCache({
      ...JSON.parse(JSON.stringify(node)),
      childes: []
    });

  };

  console.log(TreeUtils.treeLength(root));
  return (
    <div className="app">
      <div className="db-controller">
        <div className="left-side">
          <Node node={root} handleClick={handleNodeClick} />
        </div>
        <div className="right-side">
          {!isEmpty(cache) && <Node node={cache} handleClick={handleNodeClick} />}
        </div>
      </div>
    </div>
  );
}

export default App;
