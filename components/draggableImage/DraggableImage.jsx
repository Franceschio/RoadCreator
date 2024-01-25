import "./index.scss";
import Draggable from "react-draggable";

const DraggableImage = ({
  imgPositions,
  imgRotations,
  setImgCont,
  setNewImgPosition,
  saveComponentImage,
  setNewImgSize,
  imgSize,
  activeCont,
  activeImg,
  removeImg,
  rotateImg,
  img,
  index,
}) => {
  return (
    <Draggable
      defaultPosition={imgPositions[index]}
      onStop={(e, ui) => {
        setImgCont(e, index), setNewImgPosition(e, ui, index);
      }}
      cancel=".cancel"
    >
      <div
        className={`contenitor draggable-${index} ${
          activeCont && activeImg === index && "activeCont"
        }`}
      >
        <div className="cancel">
          <div className="miniToolsList">
            <div className="miniTool delete" onClick={() => removeImg(index)}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/user-interface-169/32/trash-512.png"
                alt="delete shape"
              />
            </div>
            <div
              className="miniTool size-"
              onClick={() => setNewImgSize("-", index)}
            >
              <img
                src="https://cdn2.iconfinder.com/data/icons/freee-vol-1/64/00I1-512.png"
                alt="set size-"
              />
            </div>
            <div
              className="miniTool size+"
              onClick={() => setNewImgSize("+", index)}
            >
              <img
                src="https://cdn3.iconfinder.com/data/icons/fluent-regular-24px-vol-6/24/ic_fluent_slide_size_24_regular-512.png"
                alt="set size+"
              />
            </div>
            <div className="miniTool rotate" onClick={() => rotateImg(index)}>
              <img
                src="https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-7/32/rotate--clockwise-512.png"
                alt="set rotation"
              />
            </div>
          </div>
        </div>
        <img
          className="image"
          src={img}
          alt={`uploaded image ${index}`}
          style={{
            transform: `rotate(${imgRotations[index]}deg)`,
            width: `${imgSize[index]}px`,
            height: `${imgSize[index]}px`,
          }}
        />
      </div>
    </Draggable>
  );
};

export default DraggableImage;
