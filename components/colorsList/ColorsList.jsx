//Imports
import { useEffect } from "react";
import "./index.scss";

const ColorsList = ({
  chooser,
  setChooser,
  actualColorIndex,
  actualColorShape,
  setColors,
  isText,
  setTextColors,
}) => {
  const setNewColor = (newColor, type) => {
    if (!isText) {
      setColors((prevColors) => {
        return prevColors.map((color, index) => {
          if (index === actualColorIndex) {
            if (type === "border") {
              return { border: newColor, background: color.background };
            } else if (type === "background") {
              return { border: color.border, background: newColor };
            }
          } else {
            return color;
          }
        });
      });
    } else {
      setTextColors((prevColors) => {
        return prevColors.map((color, index) => {
          if (index == actualColorIndex) {
            return newColor;
          } else {
            return color;
          }
        });
      });
    }
    setChooser(() => false);
  };

  return (
    chooser && (
      <div className="colorChooser">
        <div className="closeChooser" onClick={() => setChooser(() => false)}>
          Close
        </div>
        {!isText && (
          <>
            {actualColorShape !== "line" && actualColorShape !== "arrow" && (
              <>
                <h3>Colore bordo</h3>
                <div className="colorsList">
                  <div
                    className="color black"
                    onClick={() => setNewColor("black", "border")}
                  ></div>
                  <div
                    className="color red"
                    onClick={() => setNewColor("red", "border")}
                  ></div>
                  <div
                    className="color blue"
                    onClick={() => setNewColor("blue", "border")}
                  ></div>
                  <div
                    className="color yellow"
                    onClick={() => setNewColor("yellow", "border")}
                  ></div>
                  <div
                    className="color green"
                    onClick={() => setNewColor("green", "border")}
                  ></div>
                  <div
                    className="color orange"
                    onClick={() => setNewColor("orange", "border")}
                  ></div>
                  <div
                    className="color violet"
                    onClick={() => setNewColor("#a259a0", "border")}
                  ></div>
                  <div
                    className="color pink"
                    onClick={() => setNewColor("pink", "border")}
                  ></div>
                </div>
              </>
            )}
            {actualColorShape !== "line" && actualColorShape !== "arrow" ? (
              <h3>Colore sfondo</h3>
            ) : (
              <h3>Colore</h3>
            )}
            <div className="colorsList">
              <div
                className="color transparent"
                onClick={() => setNewColor("transparent", "background")}
              ></div>
              <div
                className="color black"
                onClick={() => setNewColor("black", "background")}
              ></div>
              <div
                className="color white"
                onClick={() => setNewColor("white", "background")}
              ></div>
              <div
                className="color red"
                onClick={() => setNewColor("red", "background")}
              ></div>
              <div
                className="color blue"
                onClick={() => setNewColor("blue", "background")}
              ></div>
              <div
                className="color yellow"
                onClick={() => setNewColor("yellow", "background")}
              ></div>
              <div
                className="color green"
                onClick={() => setNewColor("green", "background")}
              ></div>
              <div
                className="color orange"
                onClick={() => setNewColor("orange", "background")}
              ></div>
              <div
                className="color violet"
                onClick={() => setNewColor("#a259a0", "background")}
              ></div>
              <div
                className="color pink"
                onClick={() => setNewColor("pink", "background")}
              ></div>
            </div>
          </>
        )}
        {isText && (
          <>
            <h3>Colore testo</h3>
            <div className="colorsList">
              <div
                className="color white"
                onClick={() => setNewColor("white")}
              ></div>
              <div
                className="color black"
                onClick={() => setNewColor("black")}
              ></div>
              <div
                className="color red"
                onClick={() => setNewColor("red")}
              ></div>
              <div
                className="color blue"
                onClick={() => setNewColor("blue")}
              ></div>
              <div
                className="color yellow"
                onClick={() => setNewColor("yellow")}
              ></div>
              <div
                className="color green"
                onClick={() => setNewColor("green")}
              ></div>
              <div
                className="color orange"
                onClick={() => setNewColor("orange")}
              ></div>
              <div
                className="color violet"
                onClick={() => setNewColor("#a259a0")}
              ></div>
              <div
                className="color pink"
                onClick={() => setNewColor("pink")}
              ></div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default ColorsList;
