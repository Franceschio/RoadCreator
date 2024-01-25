import "./index.scss";

//imports
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaTrash, FaEdit } from "react-icons/fa";

const ProjCard = ({
  title,
  id,
  setIds,
  img,
  setTitle,
  cards,
  setCards,
  index,
}) => {
  //Navigazione
  const Navigate = useNavigate();

  const goToEditor = () => Navigate(`/editor/${title}-${id}`);
  //

  const inputRef = useRef(null);

  const [cardImage, setCardImage] = useState(img);

  useEffect(() => {
    if (title === "") {
      inputRef.current.focus();
    }
  }, [title]);

  const onHandleRename = (e) => {
    e.preventDefault();
    inputRef.current.value !== "" ? setTitle(inputRef.current.value) : null;
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setTitle(`Progetto ${index + cards.length}`);
    } else {
      setTitle(inputRef.current.value);
    }
  };

  const [showDrop, setShowDrop] = useState(false);

  const changeDrop = () => setShowDrop((prev) => !prev);

  const deleteCard = () => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    setIds((prev) => prev.filter((idPrev) => idPrev !== id));
  };

  return (
    <div className="projCard">
      <div className="dropBtn" onClick={changeDrop}>
        ...
        {showDrop && (
          <div className="dropdownContent">
            <div
              className="cardOption renameOption"
              onClick={() => setTitle("")}
            >
              Rinomina <FaEdit />
            </div>
            <div className="cardOption deleteOption" onClick={deleteCard}>
              Elimina <FaTrash />
            </div>
          </div>
        )}
      </div>
      <div className="project" onClick={goToEditor}>
        <img className="projectImg" src={cardImage} alt="Progetto" />
      </div>
      {title === "" || !title ? (
        <form onSubmit={onHandleRename}>
          <input type="text" ref={inputRef} onBlur={handleBlur} />
        </form>
      ) : (
        <p onClick={goToEditor}>{title.slice(0, 25)}</p>
      )}
    </div>
  );
};

export default ProjCard;
