import React, { useState } from "react";
import { motion } from "motion/react";
import "./styles.css";

/* Individual boxes */
const box = {
  width: 100,
  height: 100,
  borderRadius: 5,
  border: "solid black 1px",
  cursor: "pointer",
  boxShadow: "6px 6px 5px rgb(153 68 176 / 83%)",
  transition: "background-color 0.5s ease",
};

const GridBox = () => {
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [boxes, setBoxes] = useState(Array(9).fill(false)); // Defining initially empty array
  const [hoveredBox, setHoveredBox] = useState(null);

  const handleClick = (boxId) => {
    if (!boxes[boxId]) {
      const newBoxes = [...boxes];
      newBoxes[boxId] = true;
      setBoxes(newBoxes);
      setClickedBoxes([...clickedBoxes, boxId]);
    }
  };

  const handleResetButton = () => {
    let newBoxes = [...boxes];
    /** Animation for reset effect */
    clickedBoxes.forEach((index, i) => {
      setTimeout(() => {
        newBoxes[index] = false;
        setBoxes([...newBoxes]);
      }, i * 300);
    });
    /** Clear the order after reset */
    setClickedBoxes([]);
  };

  return (
    <div className="container">
      <div className="grid">
        {boxes.map((isBlack, boxIndex) => (
          <motion.div
            key={boxIndex}
            className="box"
            style={{
              ...box,
              backgroundColor: isBlack ? "#000000d1" : "white",
              transform:
                hoveredBox === boxIndex
                  ? "scale(1.1)"
                  : isBlack
                  ? "scale(1.15)"
                  : "scale(1)", // Apply hover & click zoom
              boxShadow:
                hoveredBox === boxIndex
                  ? "4px 4px 10px rgb(153 68 176 / 83%)"
                  : isBlack
                  ? "6px 6px 15px rgb(153 68 176 / 83%)"
                  : "6px 6px 6px rgb(153 68 176 / 83%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
            onMouseEnter={() => setHoveredBox(boxIndex)}
            onMouseLeave={() => setHoveredBox(null)}
            onClick={() => handleClick(boxIndex)}
          />
        ))}
      </div>
      <div className="buttonGrid">
        <button className="reset-button" onClick={handleResetButton}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default GridBox;
