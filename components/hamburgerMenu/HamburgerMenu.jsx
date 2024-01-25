import "./index.scss";
import { FaFilePdf, FaFileImage, FaDoorOpen } from "react-icons/fa";

const HamburgerMenu = ({
  setActiveMenu,
  activeMenu,
  exportComponentAsPNG,
  exportComponentAsPDF,
  saveComponentImage,
  goToHome,
}) => {
  return (
    <>
      <div
        className="hamburgerMenu"
        onClick={() => setActiveMenu((prev) => !prev)}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {activeMenu && (
        <div className="menu">
          <ul>
            <li
              className="option"
              onClick={() => {
                exportComponentAsPNG(), saveComponentImage();
              }}
            >
              Scarica png <FaFileImage />
            </li>
            <li
              className="option"
              onClick={() => {
                exportComponentAsPDF(), saveComponentImage();
              }}
            >
              Scarica pdf <FaFilePdf />
            </li>
            <li className="option" onClick={goToHome}>
              Esci <FaDoorOpen />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
