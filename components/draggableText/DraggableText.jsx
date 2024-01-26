import "./index.scss";
import { useRef } from "react";
import Draggable from "react-draggable";

const DraggableText = ({
  textSize,
  textRotations,
  textColors,
  textPositions,
  setTextCont,
  setNewTextPosition,
  saveComponentImage,
  activeCont,
  activeText,
  removeText,
  setNewTextColor,
  setNewTextSize,
  handleBlur,
  rotateText,
  changeText,
  inputs,
  inputRef,
  text,
  index,
}) => {
  return (
    <Draggable
      defaultPosition={textPositions[index]}
      onStop={(e, ui) => {
        setTextCont(e, index),
          setNewTextPosition(e, ui, index),
          saveComponentImage();
      }}
      cancel=".cancel"
    >
      <div
        className={`contenitor text-${index} ${
          activeCont && activeText === index && "activeCont"
        }`}
      >
        <div className="cancel">
          <div className="miniToolsList">
            <div className="miniTool delete" onClick={() => removeText(index)}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/user-interface-169/32/trash-512.png"
                alt="delete shape"
              />
            </div>
            <div
              className="miniTool color"
              onClick={() => setNewTextColor(index)}
            >
              <img
                src="https://cdn2.iconfinder.com/data/icons/css-vol-1/24/color-bucket-512.png"
                alt="set colors"
              />
            </div>
            <div
              className="miniTool size-"
              onClick={() => setNewTextSize("-", index)}
            >
              <img
                src="https://cdn2.iconfinder.com/data/icons/freee-vol-1/64/00I1-512.png"
                alt="set size-"
              />
            </div>
            <div
              className="miniTool size+"
              onClick={() => setNewTextSize("+", index)}
            >
              <img
                src="https://cdn3.iconfinder.com/data/icons/fluent-regular-24px-vol-6/24/ic_fluent_slide_size_24_regular-512.png"
                alt="set size+"
              />
            </div>
            <div className="miniTool rotate" onClick={() => rotateText(index)}>
              <img
                src="https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-7/32/rotate--clockwise-512.png"
                alt="set rotation"
              />
            </div>
            <div className="miniTool rename" onClick={() => changeText(index)}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/user-interface-2326/24/rename-512.png"
                alt="set text"
              />
            </div>
          </div>
        </div>
        {inputs[index] ? (
          <div className="cancel">
            <form onSubmit={(e) => handleBlur(e, index)}>
              <input
                type="text"
                ref={inputRef}
                onBlur={(e) => handleBlur(e, index)}
              />
            </form>
          </div>
        ) : (
          <p
            style={{
              transform: `rotate(${textRotations[index]}deg)`,
              fontSize: `${textSize[index]}px`,
              color: `${textColors[index]}`,
            }}
          >
            {text}
          </p>
        )}
      </div>
    </Draggable>
  );
};

export default DraggableText;
