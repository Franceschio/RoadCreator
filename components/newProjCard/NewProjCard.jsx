import "./index.scss";
import { v4 as uuidv4 } from "uuid";

const NewProjCard = ({ addCard, setId }) => {
  return (
    <div
      className="newProjCard"
      onClick={() => {
        addCard(), setId(uuidv4);
      }}
    >
      <div className="newProject">+</div>
      <p>Crea un nuovo progetto</p>
    </div>
  );
};

export default NewProjCard;
