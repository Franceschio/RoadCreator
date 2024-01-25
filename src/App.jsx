//Imports
import "./App.scss";

//Components
import Header from "../components/header/Header";
import ProjectList from "../components/projectList/ProjectList";
import { useEffect, useState } from "react";

function App() {
  //In caso l'utente cambia pagina
  const [isTabActive, setIsTabActive] = useState(!document.hidden);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTabActive = !document.hidden;
      if (currentTabActive !== isTabActive) {
        setIsTabActive(currentTabActive);
        document.title = currentTabActive ? "RoadCreator" : "Ti attendiamo...";
      }
    });

    return () => {
      clearInterval(interval);
    };
  }, [isTabActive]);
  //

  return (
    <>
      <Header />
      <div className="main">
        <h1 className="listTitle">I tuoi progetti</h1>
        <ProjectList />
      </div>
    </>
  );
}

export default App;
