import "./index.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import HamburgerMenu from "../../components/hamburgerMenu/HamburgerMenu";
import DraggableShape from "../../components/draggableShape/DraggableShape";
import DraggableText from "../../components/draggableText/DraggableText";
import ItemsList from "../../components/itemsList/ItemsList";
import ColorsList from "../../components/colorsList/ColorsList";
import DraggableImage from "../../components/draggableImage/DraggableImage";

const Editor = () => {
  //Navigazione
  const Navigate = useNavigate();

  const goToHome = () => Navigate(`/`);
  //

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

  //Setto progetto attuale

  const [projDetails, setProjDetails] = useState(
    JSON.parse(localStorage.getItem("existingProjects"))
  );

  //Prendo :id percorso pagina
  const { id } = useParams();

  //Prendo il nome del progetto
  const [project, setProject] = useState(id.substring(0, id.indexOf("-")));

  //Prendo id del progetto
  const [projectId, setProjectId] = useState(id.substring(id.indexOf("-") + 1));

  //Setto il progetto corrente per questo editor
  const [actualProj, setActualProj] = useState(
    projDetails.find((proj) => {
      if (proj.id === projectId) {
        return proj;
      }
    })
  );

  //Setto le variabili

  //Draggable Variables
  const [shapes, setShapes] = useState(
    actualProj.shapes ? actualProj.shapes : []
  );

  const [texts, setTexts] = useState(actualProj.texts ? actualProj.texts : []);

  //set Menu
  const [activeMenu, setActiveMenu] = useState(false);

  //set contents
  const [activeCont, setActiveCont] = useState(false);

  //Set colors chooser
  const [chooser, setActiveChooser] = useState(false);

  //active draggable Variables
  const [activeDraggable, setActiveDraggable] = useState(null);

  const [activeText, setActiveText] = useState(null);

  //sizes Variables
  const [size, setSize] = useState(actualProj.sizes ? actualProj.sizes : []);

  const [textSize, setTextSize] = useState(
    actualProj.textSize ? actualProj.textSize : []
  );

  //colors Variables
  const [colors, setColors] = useState(
    actualProj.colors ? actualProj.colors : []
  );

  const [textColors, setTextColors] = useState(
    actualProj.textColors ? actualProj.textColors : []
  );

  //isText
  const [isText, setIsText] = useState(false);

  //inputs variables
  const [inputs, setInputs] = useState(
    actualProj.inputs ? actualProj.inputs : []
  );

  //positions Variables
  const [positions, setPositions] = useState(
    actualProj.positions ? actualProj.positions : []
  );

  const [textPositions, setTextPositions] = useState(
    actualProj.textPositions ? actualProj.textPositions : []
  );

  //rotation Variables
  const [rotations, setRotations] = useState(
    actualProj.rotations ? actualProj.rotations : []
  );

  const [textRotations, setTextRotations] = useState(
    actualProj.textRotations ? actualProj.textRotations : []
  );

  const [actualColorIndex, setActualColorIndex] = useState(0);

  //imgsCard
  const [image, setImage] = useState(
    actualProj.image ? actualProj.image : "/public/Images/New-project.png"
  );

  //

  //Sizes

  const setNewSize = (action, actualIndex) => {
    if (action == "+") {
      setSize((prev) =>
        prev.map((size, index) => {
          if (index == actualIndex && size !== 250) {
            return size + 10;
          } else {
            return size;
          }
        })
      );
    } else if (action == "-") {
      setSize((prev) =>
        prev.map((size, index) => {
          if (index == actualIndex && size !== 20) {
            return size - 10;
          } else {
            return size;
          }
        })
      );
    }
  };

  const setNewTextSize = (action, actualIndex) => {
    if (action == "+") {
      setTextSize((prev) =>
        prev.map((size, index) => {
          if (index == actualIndex && size !== 120) {
            return size + 10;
          } else {
            return size;
          }
        })
      );
    } else if (action == "-") {
      setTextSize((prev) =>
        prev.map((size, index) => {
          if (index == actualIndex && size !== 20) {
            return size - 10;
          } else {
            return size;
          }
        })
      );
    }
  };

  //

  //Colori

  const setNewColor = (index) => {
    setActualColorIndex(() => index);
    setIsText(() => false);
    setActiveChooser(() => true);
  };

  const setNewTextColor = (index) => {
    setActualColorIndex(() => index);
    setIsText(() => true);
    setActiveChooser(() => true);
  };

  //

  //Eliminare shapes e texts

  const removeShape = (index) => {
    setShapes((prev) => prev.filter((_, i) => i !== index));
    setRotations((prev) => prev.filter((_, i) => i !== index));
    setSize((prev) => prev.filter((_, i) => i !== index));
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const removeText = (index) => {
    setTexts((prev) => prev.filter((_, i) => i !== index));
    setTextRotations((prev) => prev.filter((_, i) => i !== index));
    setTextSize((prev) => prev.filter((_, i) => i !== index));
    setTextColors((prev) => prev.filter((_, i) => i !== index));
  };

  //

  //Contenitori dei Draggable

  const setContenitor = (e, index) => {
    setActiveCont(() => true);
    setActiveDraggable(index);
  };

  const setTextCont = (e, index) => {
    setActiveCont(() => true);
    setActiveText(index);
  };

  const onOutsideClick = (e) => {
    if (
      activeDraggable !== null &&
      !e.target.closest(`.draggable-${activeDraggable}`)
    ) {
      setActiveCont(() => false);
      setActiveDraggable(null);
    }
    if (activeText !== null && !e.target.closest(`.text-${activeText}`)) {
      setActiveCont(() => false);
      setActiveText(null);
    }
    saveComponentImage();
    setActiveMenu(() => false);
  };

  //

  // Aggiungi nuovi Draggable
  const addShape = (shapeName) => {
    setShapes((prevShapes) => [
      {
        shapeName: shapeName,
      },
      ...prevShapes,
    ]);
    setRotations((prevRotations) => [0, ...prevRotations]);
    setSize(() => [100, ...size]);
    setPositions((prev) => [{ x: 0, y: 0 }, ...prev]);
    if (shapeName == "square" || shapeName == "circle") {
      setColors(() => [
        { border: "black", background: "transparent" },
        ...colors,
      ]);
    } else if (shapeName == "line" || shapeName == "arrow") {
      setColors(() => [{ border: "black", background: "black" }, ...colors]);
    }
    saveComponentImage();
  };

  const addText = (text) => {
    setTexts((prevText) => [text, ...prevText]);
    setTextSize((prevTextSize) => [20, ...prevTextSize]);
    setTextRotations((prevRotations) => [0, ...prevRotations]);
    setTextColors((prevColors) => ["black", ...prevColors]);
    setInputs((prev) => [true, ...prev]);
    setTextPositions((prev) => [{ x: 0, y: 0 }, ...prev]);
    saveComponentImage();
  };

  //

  //ref

  const inputRef = useRef(null);

  //Cambia testo
  const changeText = (inputIndex) => {
    setInputs((prev) =>
      prev.map((input, index) => {
        if (index == inputIndex) {
          return (input = true);
        } else {
          return input;
        }
      })
    );
  };

  const handleBlur = (e, inputIndex) => {
    if (e.target.value === "") {
      setTexts((prev) =>
        prev.map((title, index) => {
          if (inputIndex == index) {
            return "Nuovo testo";
          } else {
            return title;
          }
        })
      );
    } else {
      setTexts((prev) =>
        prev.map((title, index) => {
          if (inputIndex == index) {
            return inputRef.current.value;
          } else {
            return title;
          }
        })
      );
    }
    setInputs((prev) =>
      prev.map((input, index) => {
        if (index == inputIndex) {
          return (input = false);
        } else {
          return input;
        }
      })
    );
  };

  //

  //Rotations

  const rotate = (index) => {
    setRotations((prevRotations) => {
      const newRotations = [...prevRotations];
      newRotations[index] += 45;
      return newRotations;
    });
  };

  const rotateText = (index) => {
    setTextRotations((prevRotations) => {
      const newRotations = [...prevRotations];
      newRotations[index] += 45;
      return newRotations;
    });
  };

  useEffect(() => {
    setShapes((prevShapes) => [...prevShapes]);
  }, [rotations]);

  useEffect(() => {
    setTexts((prev) => [...prev]);
  }, [textRotations]);

  //

  //Nuove positions

  const setNewPosition = (e, ui, index) => {
    const { x, y } = ui;
    setPositions((prev) =>
      prev.map((position, posIndex) => {
        if (index === posIndex) {
          return { x, y };
        } else {
          return position;
        }
      })
    );
  };

  const setNewTextPosition = (e, ui, index) => {
    const { x, y } = ui;
    setTextPositions((prev) =>
      prev.map((position, posIndex) => {
        if (index === posIndex) {
          return { x, y };
        } else {
          return position;
        }
      })
    );
  };

  //

  //Salva png
  const exportComponentAsPNG = async () => {
    const componentRefs = document.getElementsByClassName("editor");
    for (let i = 0; i < componentRefs.length; i++) {
      const canvas = await html2canvas(componentRefs[i]);
      const imgData = canvas.toDataURL("image/png");
      let link = document.createElement("a");
      link.download = `${project}.png`;
      link.href = imgData;
      link.click();
    }
  };

  // Creare un'immagine del componente e salvarla nel localStorage
  const saveComponentImage = async () => {
    const componentRef = document.getElementsByClassName("editor")[0];
    const canvas = await html2canvas(componentRef);
    const imgData = canvas.toDataURL("image/png");
    setImage(imgData);
  };

  //Salva pdf
  const exportComponentAsPDF = async () => {
    const componentRefs = document.getElementsByClassName("editor");
    for (let i = 0; i < componentRefs.length; i++) {
      const canvas = await html2canvas(componentRefs[i]);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`${project}.pdf`);
    }
  };

  //Salva progetto

  //Imposto progetto attuale
  useEffect(() => {
    if (actualProj == null) {
      projDetails.find((proj) => {
        if (proj.id === projectId) {
          return setActualProj(() => proj);
        }
      });
    } else {
      setActualProj((prev) => ({
        id: projectId,
        title: prev.title,
        coverImg: image,
        shapes: shapes,
        sizes: size,
        rotations: rotations,
        colors: colors,
        texts: texts,
        textSize: textSize,
        textRotations: textRotations,
        textColors: textColors,
        inputs: inputs,
        positions: positions,
        textPositions: textPositions,
      }));
    }
  }, [
    shapes,
    size,
    image,
    rotations,
    colors,
    texts,
    textSize,
    textRotations,
    textColors,
    inputs,
    positions,
    textPositions,
  ]);

  //Inserisco nei progetti totali
  useEffect(() => {
    setProjDetails((prevDetails) =>
      prevDetails.map((proj) => {
        if (proj.id === projectId && actualProj !== null) {
          return actualProj;
        } else {
          return proj;
        }
      })
    );
  }, [actualProj]);

  // Salvo in localstorage
  useEffect(() => {
    localStorage.setItem("existingProjects", JSON.stringify(projDetails));
  }, [projDetails]);

  //

  return (
    <>
      <HamburgerMenu
        setActiveMenu={setActiveMenu}
        activeMenu={activeMenu}
        exportComponentAsPNG={exportComponentAsPNG}
        exportComponentAsPDF={exportComponentAsPDF}
        saveComponentImage={saveComponentImage}
        goToHome={goToHome}
      />
      <ColorsList
        chooser={chooser}
        setChooser={setActiveChooser}
        actualColorIndex={actualColorIndex}
        setColors={setColors}
        isText={isText}
        setTextColors={setTextColors}
      />
      <ItemsList addShape={addShape} addText={addText} />
      <div className="editor" onClick={onOutsideClick}>
        {shapes.map((shape, index) => {
          return (
            <DraggableShape
              index={index}
              shape={shape}
              setContenitor={setContenitor}
              setNewPosition={setNewPosition}
              saveComponentImage={saveComponentImage}
              positions={positions}
              rotations={rotations}
              size={size}
              colors={colors}
              activeCont={activeCont}
              activeDraggable={activeDraggable}
              removeShape={removeShape}
              setNewColor={setNewColor}
              setNewSize={setNewSize}
              rotate={rotate}
              key={index}
            />
          );
        })}
        {texts.map((text, index) => {
          return (
            <DraggableText
              textSize={textSize}
              textRotations={textRotations}
              textColors={textColors}
              textPositions={textPositions}
              setTextCont={setTextCont}
              setNewTextPosition={setNewTextPosition}
              handleBlur={handleBlur}
              saveComponentImage={saveComponentImage}
              activeCont={activeCont}
              activeText={activeText}
              removeText={removeText}
              setNewTextColor={setNewTextColor}
              setNewTextSize={setNewTextSize}
              rotateText={rotateText}
              changeText={changeText}
              inputs={inputs}
              inputRef={inputRef}
              text={text}
              index={index}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default Editor;
