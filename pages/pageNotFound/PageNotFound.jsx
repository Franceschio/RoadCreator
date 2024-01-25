//Imports
import "./index.scss";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <h2>La pagina che stai cercando non esiste!</h2>
      <p>Errore 404</p>
      <a href="/">Torna alla home</a>
    </div>
  );
};

export default PageNotFound;
