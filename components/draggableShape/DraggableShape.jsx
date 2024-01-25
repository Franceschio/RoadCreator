import "./index.scss";
import Draggable from "react-draggable";

const DraggableShape = ({
  positions,
  rotations,
  setContenitor,
  setNewPosition,
  saveComponentImage,
  size,
  colors,
  activeCont,
  activeDraggable,
  removeShape,
  setNewColor,
  setNewSize,
  rotate,
  shape,
  index,
}) => {
  return (
    <Draggable
      defaultPosition={positions[index]}
      onStop={(e, ui) => {
        setContenitor(e, index),
          setNewPosition(e, ui, index),
          saveComponentImage();
      }}
      cancel=".cancel"
    >
      <div
        className={`contenitor draggable-${index} ${
          activeCont && activeDraggable === index && "activeCont"
        }`}
      >
        <div className="cancel">
          <div className="miniToolsList">
            <div className="miniTool delete" onClick={() => removeShape(index)}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/user-interface-169/32/trash-512.png"
                alt="delete shape"
              />
            </div>
            <div className="miniTool color" onClick={() => setNewColor(index)}>
              <img
                src="https://cdn2.iconfinder.com/data/icons/css-vol-1/24/color-bucket-512.png"
                alt="set colors"
              />
            </div>
            <div
              className="miniTool size-"
              onClick={() => setNewSize("-", index)}
            >
              <img
                src="https://cdn2.iconfinder.com/data/icons/freee-vol-1/64/00I1-512.png"
                alt="set size-"
              />
            </div>
            <div
              className="miniTool size+"
              onClick={() => setNewSize("+", index)}
            >
              <img
                src="https://cdn3.iconfinder.com/data/icons/fluent-regular-24px-vol-6/24/ic_fluent_slide_size_24_regular-512.png"
                alt="set size+"
              />
            </div>
            {shape.shapeName !== "circle" && (
              <div className="miniTool rotate" onClick={() => rotate(index)}>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-7/32/rotate--clockwise-512.png"
                  alt="set rotation"
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={shape.shapeName}
          style={
            shape.shapeName == "square" || shape.shapeName == "circle"
              ? {
                  transform: `rotate(${rotations[index]}deg)`,
                  width: `${size[index]}px`,
                  height: `${size[index]}px`,
                  borderColor: `${colors[index].border}`,
                  backgroundColor: `${colors[index].background}`,
                }
              : {
                  transform: `rotate(${rotations[index]}deg)`,
                  width: `${size[index]}px`,
                  borderColor: `${colors[index].border}`,
                  backgroundColor: `${colors[index].background}`,
                }
          }
        ></div>
      </div>
    </Draggable>
  );
};

export default DraggableShape;
