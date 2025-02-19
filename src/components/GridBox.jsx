import React, { useState } from "react";
import { motion } from "motion/react";
import "./styles.css";

const box = {
  width: 100,
  height: 100,
  borderRadius: 5,
  border: "solid black 1px",
};

const GridBox = () => {
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [boxes, setBoxes] = useState(Array(9).fill(false)); // Defining initially empty array

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
            style={{ ...box, backgroundColor: isBlack ? "black" : "white" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
            key={boxIndex}
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
