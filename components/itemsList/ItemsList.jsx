//Imports
import "./index.scss";

const ItemsList = ({ addShape, addText }) => {
  return (
    <div className={`itemsList`}>
      <div className="tool" onClick={() => addText("")}>
        <img
          src="https://cdn3.iconfinder.com/data/icons/remixicon-editor/24/font-size-512.png"
          alt="text"
        />
      </div>
      <div className="tool" onClick={() => addShape("line")}>
        <img
          src="https://cdn1.iconfinder.com/data/icons/iconoir-vol-3/24/linear-512.png"
          alt="line"
        />
      </div>
      <div className="tool" onClick={() => addShape("arrow")}>
        <img
          src="https://cdn3.iconfinder.com/data/icons/arrow-outline-8/32/right_2-512.png"
          alt="Freccia"
        />
      </div>
      <div className="tool" onClick={() => addShape("square")}>
        <img
          src="https://cdn2.iconfinder.com/data/icons/boxicons-regular-vol-3/24/bx-square-512.png"
          alt="square"
        />
      </div>
      <div className="tool" onClick={() => addShape("circle")}>
        <img
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-circle-outline-512.png"
          alt="circle"
        />
      </div>
    </div>
  );
};

export default ItemsList;
