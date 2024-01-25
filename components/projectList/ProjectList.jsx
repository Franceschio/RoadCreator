import "./index.scss";
//State
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

//Components
import NewProjCard from "../newProjCard/NewProjCard";
import ProjCard from "../projCard/ProjCard";

const ProjectList = () => {
  //Localstorage

  //Creo il localstorage dei progetti, se non esiste
  if (!localStorage.getItem("existingProjects")) {
    localStorage.setItem("existingProjects", "[]");
  }

  //Memorizzo i progetti
  const [existingProjects, setExistingProjects] = useState(
    JSON.parse(localStorage.getItem("existingProjects"))
  );

  const [cards, setCards] = useState(existingProjects);

  if (!localStorage.getItem("ids")) {
    localStorage.setItem("ids", "[]");
  }

  const [ids, setIds] = useState(JSON.parse(localStorage.getItem("ids")));

  const [id, setId] = useState(uuidv4);

  const addCard = () => {
    setIds(() => [id, ...ids]);

    setCards([
      {
        id: id,
        title: "",
        coverImg: "/public/Images/NewProject.png",
        shapes: [],
        sizes: [],
        rotations: [],
        colors: [],
        texts: [],
        textSize: [],
        textRotations: [],
        textColors: [],
        inputs: [],
        positions: [],
        textPositions: [],
      },
      ...cards,
    ]);
    localStorage.setItem("existingProjects", JSON.stringify(cards));
  };

  useEffect(() => {
    setExistingProjects(cards);
    localStorage.setItem("existingProjects", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem("ids", JSON.stringify(ids));
  }, [ids]);

  return (
    <div className="projectList">
      <NewProjCard addCard={addCard} setId={setId} />
      {cards.map((card, index) => (
        <ProjCard
          key={ids[index]}
          title={card.title}
          id={ids[index]}
          ids={ids}
          setIds={setIds}
          img={card.coverImg}
          setTitle={(newTitle) => {
            const newCards = [...cards];
            newCards[index].title = newTitle;
            setCards(newCards);
          }}
          cards={cards}
          setCards={setCards}
          index={index}
        />
      ))}
    </div>
  );
};

export default ProjectList;
