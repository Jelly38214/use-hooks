import React, { useRef, useState } from "react";
import "./App.css";
import { useDrapDrop } from "./hooks/useDragDrop";

function App() {
  const { data, dragEnter, dragEnd, onDelete } = useDrapDrop([
    "One",
    "Two",
    "Three",
    "Four"
  ]);

  return (
    <div className="App">
      {data.map((item, index) => (
        <div
          data-index={index}
          key={index}
          className="block"
          draggable={true}
          onDragEnter={dragEnter}
          onDragEnd={dragEnd}
          onDoubleClick={onDelete.bind(null, index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default App;
